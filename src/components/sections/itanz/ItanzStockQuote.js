"use client";

import { useEffect, useState } from "react";

const statRows = [
	["Open", "open"],
	["High", "high"],
	["Low", "low"],
	["Volume", "volume"],
	["Market Cap (000's)", "marketCap"],
	["Free Float", "freeFloat"],
];

const formatDateTime = value => {
	if (!value) return "";
	return new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Asia/Karachi",
	}).format(new Date(value));
};

const ItanzStockQuote = () => {
	const [state, setState] = useState({ status: "loading", quote: null, error: "" });

	useEffect(() => {
		let ignore = false;

		const loadQuote = async () => {
			try {
				const response = await fetch("/api/stock-quote", { cache: "no-store" });
				const payload = await response.json();

				if (!response.ok || !payload.ok) {
					throw new Error(payload.error || "Unable to load quote.");
				}

				if (!ignore) {
					setState({ status: "success", quote: payload.quote, error: "" });
				}
			} catch (error) {
				if (!ignore) {
					setState({
						status: "error",
						quote: null,
						error: error.message || "Unable to load quote.",
					});
				}
			}
		};

		loadQuote();

		return () => {
			ignore = true;
		};
	}, []);

	if (state.status === "loading") {
		return (
			<div className="itanz-stock-card is-loading" aria-live="polite">
				<span className="itanz-stock-label">PSX: ITANZ</span>
				<div className="itanz-stock-skeleton"></div>
				<div className="itanz-stock-skeleton short"></div>
				<p>Loading latest market data...</p>
			</div>
		);
	}

	if (state.status === "error") {
		return (
			<div className="itanz-stock-card is-error" aria-live="polite">
				<span className="itanz-stock-label">PSX: ITANZ</span>
				<h3>Market Data Unavailable</h3>
				<p>{state.error}</p>
				<a href="https://dps.psx.com.pk/company/ITANZ" target="_blank" rel="noreferrer">
					View on PSX <i className="tji-arrow-right"></i>
				</a>
			</div>
		);
	}

	const { quote } = state;
	const isDown = quote.direction === "down";

	return (
		<div className="itanz-stock-card" aria-live="polite">
			<div className="itanz-stock-card-top">
				<div>
					<span className="itanz-stock-label">PSX: {quote.symbol}</span>
					<strong>Itanz Technologies Limited</strong>
				</div>
				<span className={`itanz-stock-change ${isDown ? "is-down" : "is-up"}`}>
					{isDown ? "▼" : "▲"} {quote.change || "-"} ({quote.changePercent || "-"}%)
				</span>
			</div>

			<div className="itanz-stock-price">
				<span>{quote.currency}</span>
				{quote.price || "-"}
			</div>

			<div className="itanz-stock-stats">
				{statRows.map(([label, key]) => (
					<div key={key}>
						<span>{label}</span>
						<strong>{quote.stats?.[key] || "-"}</strong>
					</div>
				))}
			</div>

			<div className="itanz-stock-footer">
				<span>Last checked: {formatDateTime(quote.checkedAt)} PKT</span>
				<a href={quote.sourceUrl} target="_blank" rel="noreferrer">
					PSX source <i className="tji-arrow-right"></i>
				</a>
			</div>
			<p className="itanz-stock-note">
				Market data is sourced from the PSX Data Portal via Parse Bot and may be delayed.
			</p>
		</div>
	);
};

export default ItanzStockQuote;
