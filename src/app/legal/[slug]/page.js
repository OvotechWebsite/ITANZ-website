import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import HeroInner from "@/components/sections/hero/HeroInner";
import ItanzLegalDocumentPage from "@/components/sections/itanz/ItanzLegalDocumentPage";
import { investorDocumentMap, investorDocuments } from "@/components/sections/itanz/investorDocumentsData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const document = investorDocumentMap[slug];

	if (!document) {
		return {};
	}

	return buildMetadata({
		title: `${document.title} | iTANZ Investor Relations`,
		description: `View and download ${document.title} from iTANZ Investor Relations.`,
		path: `/legal/${slug}`,
		image: "/images/investor-relations/investor-relations-hero.webp",
	});
};

const LegalDocument = async ({ params }) => {
	const { slug } = await params;
	const document = investorDocumentMap[slug];

	if (!document) {
		notFound();
	}

	const currentIndex = investorDocuments.findIndex((item) => item.slug === slug);
	const previousDocument =
		currentIndex > 0 ? investorDocuments[currentIndex - 1] : null;
	const nextDocument =
		currentIndex < investorDocuments.length - 1
			? investorDocuments[currentIndex + 1]
			: null;

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Investor Relations", path: "/investor-relations" },
				{ name: document.title, path: `/legal/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title={document.title}
							text={document.title}
							breadcrums={[
								{ name: "Investor Relations", path: "/investor-relations" },
							]}
							backgroundImage="/images/investor-relations/investor-relations-hero.webp"
						/>
						<ItanzLegalDocumentPage
							document={document}
							previousDocument={previousDocument}
							nextDocument={nextDocument}
						/>
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
};

export default LegalDocument;

export const generateStaticParams = () => {
	return investorDocuments.map(({ slug }) => ({ slug }));
};

export const dynamicParams = false;
