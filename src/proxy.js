const blockedScannerResponse = () =>
	new Response(null, {
		status: 404,
		headers: {
			"Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
			"X-Content-Type-Options": "nosniff",
			"X-Robots-Tag": "noindex, nofollow, noarchive",
		},
	});

export function proxy() {
	return blockedScannerResponse();
}

export const config = {
	matcher: [
		"/blog/:path*",
		"/api/blog/:path*",
		"/api/generate/:path*",
		"/api/demo/:path*",
	],
};
