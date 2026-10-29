import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzIndustriesPage from "@/components/sections/itanz/ItanzIndustriesPage";
import { industriesOverview } from "@/components/sections/itanz/industryData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: industriesOverview.metaTitle,
	description: industriesOverview.metaDescription,
	path: "/industries",
	image: "/images/industries/industries-main.webp",
});

export default function Industries() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzIndustriesPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
