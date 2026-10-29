import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzPartnersPage from "@/components/sections/itanz/ItanzPartnersPage";
import { partnersOverview } from "@/components/sections/itanz/partnersData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: partnersOverview.metaTitle,
	description: partnersOverview.metaDescription,
	path: "/partners",
	image: "/images/partners/oracle/oracle-hero.webp",
});

export default function Partners() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzPartnersPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
