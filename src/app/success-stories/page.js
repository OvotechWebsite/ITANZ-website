import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzClientSuccessPage from "@/components/sections/itanz/ItanzClientSuccessPage";
import { clientSuccessOverview } from "@/components/sections/itanz/clientSuccessData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: clientSuccessOverview.metaTitle,
	description: clientSuccessOverview.metaDescription,
	path: "/success-stories",
	image: "/images/success-stories/hero-banner.webp",
});

export default function SuccessStories() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzClientSuccessPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
