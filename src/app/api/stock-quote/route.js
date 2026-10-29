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
		sourceUrl: "https://dps.psx.com.pk/company/ITANZ",
		checkedAt: new Date().toISOString(),
	};
};

export async function GET() {
	if (!process.env.PARSE_BOT_API_KEY) {
		return Response.json(
			{ ok: false, error: "Stock quote service is not configured." },
			{ status: 500 }
		);
	}

	if (cachedQuote && Date.now() - cachedAt < CACHE_TTL_MS) {
		return Response.json(
			{ ok: true, quote: cachedQuote, cached: true },
			{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
		);
	}

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

		if (!response.ok || payload?.status !== "success") {
			return Response.json(
				{ ok: false, error: "Unable to load PSX quote right now." },
				{ status: 502 }
			);
		}

		cachedQuote = normalizeQuote(payload);
		cachedAt = Date.now();

		return Response.json(
			{ ok: true, quote: cachedQuote, cached: false },
			{ headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
		);
	} catch (error) {
		console.error("Stock quote fetch failed:", error);
		return Response.json(
			{ ok: false, error: "Unable to load PSX quote right now." },
			{ status: 502 }
		);
	}
}
