import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzInsightArticlePage from "@/components/sections/itanz/ItanzInsightArticlePage";
import { allNewsroomArticles } from "@/components/sections/itanz/insightsData";
import { getInsightArticleBySlug } from "@/libs/getPublishedContent";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	allNewsroomArticles.map(article => ({ slug: article.slug }));

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const article = await getInsightArticleBySlug({
		slug,
		type: ["news", "press_release"],
		fallbackArticles: allNewsroomArticles,
	});

	if (!article) {
		return {};
	}

	return buildMetadata({
		title: article.metaTitle,
		description: article.metaDescription,
		path: `/insights/newsroom/${slug}`,
		image: article.banner || article.img,
		type: "article",
		publishedTime: article.datePublished,
		modifiedTime: article.dateModified,
		authors: [article.author || "iTANZ"],
	});
};

export default async function InsightNewsroomArticle({ params }) {
	const { slug } = await params;
	const article = await getInsightArticleBySlug({
		slug,
		type: ["news", "press_release"],
		fallbackArticles: allNewsroomArticles,
	});

	if (!article) {
		notFound();
	}

	return (
		<div>
			<JsonLd data={[
				breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: "Insights", path: "/insights" },
					{ name: "Newsroom", path: "/insights/newsroom" },
					{ name: article.title, path: `/insights/newsroom/${slug}` },
				]),
				articleJsonLd({
					title: article.title,
					description: article.metaDescription || article.desc,
					path: `/insights/newsroom/${slug}`,
					image: article.banner || article.img,
					author: article.author,
					datePublished: article.datePublished,
					dateModified: article.dateModified,
				}),
			]} />
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzInsightArticlePage
							article={article}
							parentPath="/insights/newsroom"
							parentLabel="Back to Newsroom"
						/>
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
