import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzInvestorRelationsPage from "@/components/sections/itanz/ItanzInvestorRelationsPage";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: "iTANZ Investor Enquiries | Corporate and Investor Contact",
	description: "Send investor or corporate enquiries to the appropriate iTANZ team.",
	path: "/investor-relations",
	image: "/images/investor-relations/investor-relations-hero.webp",
});

export default function InvestorRelations() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzInvestorRelationsPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
