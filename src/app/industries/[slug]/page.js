import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzIndustryDetailPage from "@/components/sections/itanz/ItanzIndustryDetailPage";
import { industryPages } from "@/components/sections/itanz/industryData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	Object.keys(industryPages).map(slug => ({ slug }));

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const detail = industryPages[slug];

	if (!detail) {
		return {};
	}

	return buildMetadata({
		title: detail.metaTitle,
		description: detail.metaDescription,
		path: `/industries/${slug}`,
	});
};

export default async function IndustryDetail({ params }) {
	const { slug } = await params;
	const detail = industryPages[slug];

	if (!detail) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Industries", path: "/industries" },
				{ name: detail.title, path: `/industries/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzIndustryDetailPage page={slug} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
