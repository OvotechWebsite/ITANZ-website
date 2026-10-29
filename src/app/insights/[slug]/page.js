import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzInsightsDetailPage from "@/components/sections/itanz/ItanzInsightsDetailPage";
import { insightPages } from "@/components/sections/itanz/insightsData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { getInsightListingOverrides } from "@/libs/getPublishedContent";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	Object.keys(insightPages).map(slug => ({ slug }));

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const detail = insightPages[slug];
	const canonicalPath = slug === "case-studies" ? "/case-studies" : `/insights/${slug}`;

	if (!detail) {
		return {};
	}

	return buildMetadata({
		title: detail.metaTitle,
		description: detail.metaDescription,
		path: canonicalPath,
		image: detail.img,
	});
};

export default async function InsightsDetail({ params }) {
	const { slug } = await params;
	const detail = insightPages[slug];
	const canonicalPath = slug === "case-studies" ? "/case-studies" : `/insights/${slug}`;
	const detailOverride = await getInsightListingOverrides(slug);

	if (!detail) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Insights", path: "/insights" },
				{ name: detail.title, path: canonicalPath },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzInsightsDetailPage page={slug} detailOverride={detailOverride} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
