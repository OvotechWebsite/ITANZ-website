/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/legal/annual-general-meeting-draft-2026",
				destination: "/legal/annual-report-2026",
				permanent: true,
			},
			{
				source: "/investor-relations/presentation/2026",
				destination: "/investor-relations",
				permanent: false,
			},
			{
				source: "/legal",
				destination: "/investor-relations",
				permanent: true,
			},
			{
				source: "/legal/governance",
				destination: "/investor-relations",
				permanent: true,
			},
			{
				source: "/privacy-policy",
				destination: "/docs/iTANZ_Privacy_Policy.pdf",
				permanent: true,
			},
			{
				source: "/cloudflare",
				destination: "/campaigns/cloudflare",
				permanent: true,
			},
			{
				source: "/companyprofile",
				destination: "/campaigns/companyprofile",
				permanent: true,
			},
			{
				source: "/couchbase",
				destination: "/campaigns/couchbase",
				permanent: true,
			},
			{
				source: "/netsuite",
				destination: "/campaigns/netsuite",
				permanent: true,
			},
			{
				source: "/leap5",
				destination: "/campaigns/leap5",
				permanent: true,
			},
			{
				source: "/solutions/ubr",
				destination: "/solutions/utility-billing-revenue-management",
				permanent: true,
			},
			{
				source: "/solutions/icp",
				destination: "/solutions/intelligent-city-platform",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
