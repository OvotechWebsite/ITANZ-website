import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzPartnerDetailPage from "@/components/sections/itanz/ItanzPartnerDetailPage";
import { partnerPages } from "@/components/sections/itanz/partnersData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	Object.keys(partnerPages).map(slug => ({
		slug,
	}));

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const page = partnerPages[slug];

	if (!page) {
		return {};
	}

	return buildMetadata({
		title: page.metaTitle,
		description: page.metaDescription,
		path: `/partners/${slug}`,
		image: page.heroBg,
	});
};

export default async function PartnerDetail({ params }) {
	const { slug } = await params;
	const page = partnerPages[slug];

	if (!page) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Partners", path: "/partners" },
				{ name: page.title, path: `/partners/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzPartnerDetailPage page={slug} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
