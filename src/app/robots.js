const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://itanzgroup.com").replace(/\/$/, "");

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api", "/demo-alt-home", "/downloads/"],
			},
			{
				userAgent: [
					"Bytespider",
					"CCBot",
					"GPTBot",
					"ClaudeBot",
					"anthropic-ai",
					"PetalBot",
					"MJ12bot",
					"AhrefsBot",
					"SemrushBot",
					"DotBot",
					"Amazonbot",
				],
				disallow: ["/"],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
