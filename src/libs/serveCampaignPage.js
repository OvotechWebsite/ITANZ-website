import { readFile } from "node:fs/promises";
import path from "node:path";
import { absoluteUrl } from "./seo";

const campaignMetadata = {
	cloudflare: {
		title: "iTANZ and Cloudflare | Secure Every Digital Interaction",
		description: "Explore iTANZ and Cloudflare services for application security, Zero Trust, network performance and resilient digital operations.",
		image: "/campaigns/cloudflare/uploads/logo.png",
	},
	companyprofile: {
		title: "Meet the iTANZ Leadership Team at LEAP 2026",
		description: "Meet the iTANZ leadership team at LEAP 2026 and discuss enterprise platforms, data, AI, cloud and digital transformation.",
		image: "/images/hero/hero-img.webp",
	},
	couchbase: {
		title: "iTANZ and Couchbase | Modern Data, Real Business Impact",
		description: "Build responsive, scalable applications and modern data platforms with iTANZ and Couchbase expertise.",
		image: "/campaigns/couchbase/assets/hero.png",
	},
	netsuite: {
		title: "NetSuite Integration Platform Services | iTANZ",
		description: "Connect NetSuite to the rest of your business, automate workflows and improve data visibility with iTANZ.",
		image: "/campaigns/netsuite/assets/hero.png",
	},
	leap5: {
		title: "iTANZ at LEAP 2026 | Modernise Faster, Scale Smarter",
		description: "Meet iTANZ at LEAP 2026 to explore Oracle, NetSuite, Salesforce, AI, Resource as a Service and Couchbase solutions.",
		image: "/campaigns/leap5/assets/hero-ai.jpg",
	},
};

const escapeAttribute = value =>
	String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const addCampaignMetadata = (html, campaign) => {
	const metadata = campaignMetadata[campaign];
	if (!metadata) return html;

	const canonical = absoluteUrl(`/campaigns/${campaign}`);
	const image = absoluteUrl(metadata.image);
	const titleTag = /<title[\s>]/i.test(html)
		? ""
		: `<title>${escapeAttribute(metadata.title)}</title>`;
	const descriptionTag = /<meta[^>]+name=["']description["']/i.test(html)
		? ""
		: `<meta name="description" content="${escapeAttribute(metadata.description)}">`;
	const tags = `${titleTag}
${descriptionTag}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="iTANZ">
<meta property="og:title" content="${escapeAttribute(metadata.title)}">
<meta property="og:description" content="${escapeAttribute(metadata.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttribute(metadata.title)}">
<meta name="twitter:description" content="${escapeAttribute(metadata.description)}">
<meta name="twitter:image" content="${image}">`;

	return html.replace(/<\/head>/i, `${tags}\n</head>`);
};

export const serveCampaignPage = async campaign => {
	const filePath = path.join(process.cwd(), "public", "campaigns", campaign, "index.html");
	const html = await readFile(filePath, "utf8");

	return new Response(addCampaignMetadata(html, campaign), {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "public, max-age=300",
		},
	});
};
