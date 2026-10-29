import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzContactDetailPage from "@/components/sections/itanz/ItanzContactDetailPage";
import { contactDetailPages } from "@/components/sections/itanz/contactData";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	Object.keys(contactDetailPages).map(slug => ({ slug }));

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const detail = contactDetailPages[slug];

	if (!detail) {
		return {};
	}

	return buildMetadata({
		title: detail.metaTitle,
		description: detail.metaDescription,
		path: `/contact/${slug}`,
	});
};

export default async function ContactDetail({ params }) {
	const { slug } = await params;
	const detail = contactDetailPages[slug];

	if (!detail) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={breadcrumbJsonLd([
				{ name: "Home", path: "/" },
				{ name: "Contact", path: "/contact" },
				{ name: detail.title, path: `/contact/${slug}` },
			])} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzContactDetailPage page={slug} />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
