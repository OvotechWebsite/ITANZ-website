import { serveCampaignPage } from "@/libs/serveCampaignPage";

const campaignSlugs = new Set([
	"cloudflare",
	"companyprofile",
	"couchbase",
	"leap5",
	"netsuite",
]);

export const GET = async (_request, { params }) => {
	const { slug } = await params;

	if (!campaignSlugs.has(slug)) {
		return new Response("Campaign not found", { status: 404 });
	}

	return serveCampaignPage(slug);
};
