import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzInsightArticlePage from "@/components/sections/itanz/ItanzInsightArticlePage";
import { blogArticles } from "@/components/sections/itanz/insightsData";
import { getInsightArticleBySlug } from "@/libs/getPublishedContent";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/libs/seo";

export const generateStaticParams = () =>
	blogArticles.map(article => ({ slug: article.slug }));

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
	const { slug } = await params;
	const article = await getInsightArticleBySlug({
		slug,
		type: "blog",
		fallbackArticles: blogArticles,
	});

	if (!article) {
		return {};
	}

	return buildMetadata({
		title: article.metaTitle,
		description: article.metaDescription,
		path: `/insights/blogs/${slug}`,
		image: article.banner || article.img,
		type: "article",
		publishedTime: article.datePublished,
		modifiedTime: article.dateModified,
		authors: [article.author || "iTANZ"],
	});
};

export default async function InsightBlogArticle({ params }) {
	const { slug } = await params;
	const article = await getInsightArticleBySlug({
		slug,
		type: "blog",
		fallbackArticles: blogArticles,
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
					{ name: "Blogs", path: "/insights/blogs" },
					{ name: article.title, path: `/insights/blogs/${slug}` },
				]),
				articleJsonLd({
					title: article.title,
					description: article.metaDescription || article.desc,
					path: `/insights/blogs/${slug}`,
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
							parentPath="/insights/blogs"
							parentLabel="Back to Blogs"
						/>
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
