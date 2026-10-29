const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://itanzgroup.com").replace(/\/$/, "");

export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin", "/api", "/demo-alt-home"],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
