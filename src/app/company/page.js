import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { companyOverview } from "@/components/sections/itanz/companyData";
import ItanzCompanyPage from "@/components/sections/itanz/ItanzCompanyPage";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: companyOverview.metaTitle,
	description: companyOverview.metaDescription,
	path: "/company",
	image: "/images/company/company-hero.webp",
});

export default function Company() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzCompanyPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
