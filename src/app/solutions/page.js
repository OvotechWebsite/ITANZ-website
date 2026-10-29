import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzSolutionsPage from "@/components/sections/itanz/ItanzSolutionsPage";
import { solutionsOverview } from "@/components/sections/itanz/solutionData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: solutionsOverview.metaTitle,
	description: solutionsOverview.metaDescription,
	path: "/solutions",
	image: "/images/solutions/hero/oracle.webp",
});

export default function Solutions() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzSolutionsPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
