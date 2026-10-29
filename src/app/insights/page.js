import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzInsightsPage from "@/components/sections/itanz/ItanzInsightsPage";
import { insightsOverview } from "@/components/sections/itanz/insightsData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: insightsOverview.metaTitle,
	description: insightsOverview.metaDescription,
	path: "/insights",
	image: "/images/blog/blog-banner.webp",
});

export default function Insights() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzInsightsPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
