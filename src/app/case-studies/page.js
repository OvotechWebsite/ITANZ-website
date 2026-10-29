import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzCaseStudiesPage from "@/components/sections/itanz/ItanzCaseStudiesPage";
import { caseStudyOverview } from "@/components/sections/itanz/caseStudyData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { getPublishedCaseStudies } from "@/libs/getPublishedContent";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: caseStudyOverview.metaTitle,
	description: caseStudyOverview.metaDescription,
	path: "/case-studies",
	image: "/images/case-studies/case-studies-hero.webp",
});

export const dynamic = "force-dynamic";

export default async function CaseStudies() {
	const studies = await getPublishedCaseStudies();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzCaseStudiesPage studies={studies} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
