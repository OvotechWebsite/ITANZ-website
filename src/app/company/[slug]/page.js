import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { companyPages } from "@/components/sections/itanz/companyData";
import ItanzCompanyDetailPage from "@/components/sections/itanz/ItanzCompanyDetailPage";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

const activeCompanySlugs = ["certifications-compliance"];

export const generateStaticParams = () =>
	activeCompanySlugs.map(slug => ({ slug }));

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const detail = companyPages[slug];

	if (!detail || !activeCompanySlugs.includes(slug)) {
		return {};
	}

	return buildMetadata({
		title: detail.metaTitle,
		description: detail.metaDescription,
		path: `/company/${slug}`,
		image: detail.heroBg,
	});
};

export default async function CompanyDetail({ params }) {
	const { slug } = await params;
	const detail = companyPages[slug];

	if (!detail || !activeCompanySlugs.includes(slug)) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Company", path: "/company" },
				{ name: detail.title, path: `/company/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzCompanyDetailPage page={slug} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
