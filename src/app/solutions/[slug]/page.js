import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzSolutionDetailPage from "@/components/sections/itanz/ItanzSolutionDetailPage";
import { solutionPages } from "@/components/sections/itanz/solutionData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	Object.keys(solutionPages).map(slug => ({ slug }));

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const detail = solutionPages[slug];

	if (!detail) {
		return {};
	}

	return buildMetadata({
		title: detail.metaTitle,
		description: detail.metaDescription,
		path: `/solutions/${slug}`,
		image: detail.heroBg,
	});
};

export default async function SolutionDetail({ params }) {
	const { slug } = await params;
	const detail = solutionPages[slug];

	if (!detail) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Solutions", path: "/solutions" },
				{ name: detail.title, path: `/solutions/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzSolutionDetailPage page={slug} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
