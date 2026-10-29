const PSX_URL = "https://dps.psx.com.pk/company/ITANZ";
const PARSE_BOT_API_URL =
	"https://api.parse.bot/scraper/0f3edd12-1750-4749-9b05-539f1e94db49/get_stock_quote";
const SYMBOL = "ITANZ";
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedQuote = null;
let cachedAt = 0;

const parsePrice = value => {
	const match = String(value || "").match(/Rs\.?\s*([\d,.]+)/i);
	return match ? match[1] : "";
};

const parseChange = value => {
	const match = String(value || "").match(/([+-]?\d[\d,.]*)\s*\(?([+-]?\d[\d,.]*)%\)?/);
	return {
		change: match?.[1] || "",
		changePercent: match?.[2] || "",
	};
};

const parseStat = (html, labelPattern) => {
	const regex = new RegExp(
		`<div class="stats_label">\\s*${labelPattern}[\\s\\S]*?<\\/div>\\s*<div class="stats_value"[^>]*>([\\s\\S]*?)<\\/div>`,
		"i"
	);
	const match = html.match(regex);
	return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
};

const fetchDirectFromPsx = async () => {
	const response = await fetch(PSX_URL, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`DPS PSX responded with HTTP ${response.status}`);
	}

	const html = await response.text();

	const priceMatch = html.match(/<div class="quote__close">Rs\.?\s*([\d,.]+)<\/div>/i);
	const price = priceMatch ? priceMatch[1] : "";

	const changeValueMatch = html.match(
		/<div class="change__value">\s*([+-]?[\d,.]+)\s*<\/div>/i
	);
	const change = changeValueMatch ? changeValueMatch[1] : "";

	const changePercentMatch = html.match(
		/<div class="change__percent">\s*\(?([+-]?[\d,.]+)%?\)?\s*<\/div>/i
	);
	const changePercent = changePercentMatch ? changePercentMatch[1] : "";

	const isDown =
		html.includes("change__text--neg") ||
		html.includes("icon-down-dir") ||
		Number(change) < 0;

	return {
		symbol: SYMBOL,
		exchange: "PSX",
		currency: "PKR",
		price,
		change,
		changePercent,
		direction: isDown ? "down" : "up",
		stats: {
			open: parseStat(html, "Open"),
			high: parseStat(html, "High"),
			low: parseStat(html, "Low"),
			volume: parseStat(html, "Volume"),
			dayRange: parseStat(html, "DAY RANGE"),
			yearRange: parseStat(html, "52-WEEK RANGE"),
			ldcp: parseStat(html, "LDCP"),
			peRatio: parseStat(html, "P/E Ratio"),
			marketCap: parseStat(html, "Market Cap"),
			shares: parseStat(html, "Shares"),
			freeFloat: parseStat(html, "Free Float"),
		},
		sourceName: "Pakistan Stock Exchange (PSX DPS)",
		sourceUrl: PSX_URL,
		checkedAt: new Date().toISOString(),
	};
};

const normalizeQuote = payload => {
	const data = payload?.data || {};
	const stats = data.stats || {};
	const { change, changePercent } = parseChange(data.change);
	const numericChange = Number(change.replace(/,/g, ""));

	return {
		symbol: data.symbol || SYMBOL,
		exchange: "PSX",
		currency: "PKR",
		price: parsePrice(data.price),
		change,
		changePercent,
		direction: Number.isFinite(numericChange) && numericChange < 0 ? "down" : "up",
		stats: {
			open: stats.Open || "",
			high: stats.High || "",
			low: stats.Low || "",
			volume: stats.Volume || "",
			dayRange: stats["DAY RANGE"] || "",
			yearRange: stats["52-WEEK RANGE ^"] || "",
			ldcp: stats.LDCP || "",
			peRatio: stats["P/E Ratio (TTM) **"] || "",
			marketCap: stats["Market Cap (000's)"] || "",
			shares: stats.Shares || "",
			freeFloat: stats["Free Float"] || "",
		},
		sourceName: "PSX Data Portal via Parse Bot",
		sourceUrl: PSX_URL,
		checkedAt: new Date().toISOString(),
	};
};

export async function GET() {
	if (cachedQuote && Date.now() - cachedAt < CACHE_TTL_MS) {
		return Response.json(
			{ ok: true, quote: cachedQuote, cached: true },
			{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
		);
	}

	// 1. If Parse Bot API key is configured, try it first
	if (process.env.PARSE_BOT_API_KEY) {
		try {
			const url = new URL(PARSE_BOT_API_URL);
			url.searchParams.set("symbol", SYMBOL);

			const response = await fetch(url, {
				headers: {
					"X-API-Key": process.env.PARSE_BOT_API_KEY,
				},
				cache: "no-store",
			});

			const payload = await response.json().catch(() => null);

			if (response.ok && payload?.status === "success") {
				cachedQuote = normalizeQuote(payload);
				cachedAt = Date.now();
				return Response.json(
					{ ok: true, quote: cachedQuote, cached: false },
					{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
				);
			}
		} catch (error) {
			console.warn("Parse Bot stock quote fetch failed, falling back to direct PSX:", error.message);
		}
	}

	// 2. Fetch directly from official Pakistan Stock Exchange (DPS PSX)
	try {
		const quote = await fetchDirectFromPsx();
		if (quote.price) {
			cachedQuote = quote;
			cachedAt = Date.now();
			return Response.json(
				{ ok: true, quote: cachedQuote, cached: false },
				{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
			);
		}
	} catch (error) {
		console.error("Direct PSX quote fetch failed:", error.message);
	}

	// 3. Fallback to cached or verified snapshot if DPS is temporarily unreachable
	if (cachedQuote) {
		return Response.json(
			{ ok: true, quote: cachedQuote, cached: true },
			{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
		);
	}

	const fallbackQuote = {
		symbol: SYMBOL,
		exchange: "PSX",
		currency: "PKR",
		price: "34.97",
		change: "-0.39",
		changePercent: "-1.10",
		direction: "down",
		stats: {
			open: "35.40",
			high: "37.13",
			low: "34.82",
			volume: "2,333,751",
			dayRange: "34.82 — 37.13",
			yearRange: "3.78 — 53.96",
			ldcp: "35.36",
			peRatio: "1.94",
			marketCap: "4,147,569.64",
			shares: "118,603,650",
			freeFloat: "53,371,643",
		},
		sourceName: "Pakistan Stock Exchange (PSX DPS)",
		sourceUrl: PSX_URL,
		checkedAt: new Date().toISOString(),
	};

	return Response.json(
		{ ok: true, quote: fallbackQuote, fallback: true },
		{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
	);
}
