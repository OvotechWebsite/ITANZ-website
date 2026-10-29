import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzCaseStudyDetailPage from "@/components/sections/itanz/ItanzCaseStudyDetailPage";
import { caseStudies } from "@/components/sections/itanz/caseStudyData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/libs/getPublishedContent";
import JsonLd from "@/components/shared/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const { study } = await getCaseStudyBySlug(slug);

	if (!study) {
		return {};
	}

	return buildMetadata({
		title: `${study.title} | iTANZ Case Study`,
		description: study.subtitle || study.intro,
		path: `/case-studies/${slug}`,
		image: study.bannerImage || study.gridImage,
		type: "article",
		publishedTime: study.datePublished,
		modifiedTime: study.dateModified,
	});
}

export default async function CaseStudyDetail({ params }) {
	const { slug } = await params;
	const { study, studies } = await getCaseStudyBySlug(slug);

	if (!study) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={[
				breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: "Case Studies", path: "/case-studies" },
					{ name: study.title, path: `/case-studies/${slug}` },
				]),
				articleJsonLd({
					title: study.title,
					description: study.subtitle || study.intro,
					path: `/case-studies/${slug}`,
					image: study.bannerImage || study.gridImage,
					datePublished: study.datePublished,
					dateModified: study.dateModified,
				}),
			]} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzCaseStudyDetailPage study={study} studies={studies} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}

export async function generateStaticParams() {
	return caseStudies.map(({ slug }) => ({ slug }));
}
