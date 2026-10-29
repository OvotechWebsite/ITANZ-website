import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CareerDetails1 from "@/components/sections/careers/CareerDetails1";
import HeroInner from "@/components/sections/hero/HeroInner";
import ItanzCareersCta from "@/components/sections/itanz/ItanzCareersCta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getCareers from "@/libs/getCareers";
import getPublishedCareers from "@/libs/getPublishedCareers";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, jobPostingJsonLd } from "@/libs/seo";
const items = getCareers();

export const dynamic = "force-dynamic";

export default async function CareerDetails({ params }) {
	const { slug } = await params;
	const publishedItems = await getPublishedCareers();

	const isLegacyId = /^\d+$/.test(slug);
	const isExistItem = isLegacyId
		? publishedItems?.find(({ id }) => id === parseInt(slug))
		: publishedItems?.find(item => item.slug === slug);

	if (!isExistItem) {
		notFound();
	}

	if (isLegacyId && isExistItem.slug) {
		redirect(`/careers/${isExistItem.slug}`);
	}

	return (
		<div>
			<JsonLd data={[
				breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: "Careers", path: "/careers" },
					{ name: isExistItem.title, path: `/careers/${isExistItem.slug || slug}` },
				]),
				jobPostingJsonLd({
					job: isExistItem,
					path: `/careers/${isExistItem.slug || slug}`,
				}),
			]} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title={isExistItem.title}
							text={"Careers"}
							className="itanz-career-detail-hero"
							backgroundImage={null}
						/>
						<CareerDetails1 currentItem={isExistItem} />
						<ItanzCareersCta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
export async function generateStaticParams() {
	return items?.map(({ slug, id }) => ({ slug: slug || id.toString() }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const publishedItems = await getPublishedCareers();
	const item = publishedItems?.find(({ id, slug: itemSlug }) =>
		/^\d+$/.test(slug) ? id === parseInt(slug) : itemSlug === slug
	);

	if (!item) {
		return {};
	}

	return buildMetadata({
		title: `${item.title} Careers | iTANZ`,
		description: item.summary,
		path: `/careers/${item.slug || slug}`,
		image: "/images/careers/hero-image.webp",
	});
}
