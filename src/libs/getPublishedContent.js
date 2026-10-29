import {
	allNewsroomArticles,
	blogArticles,
	pressReleaseArticles,
} from "@/components/sections/itanz/insightsData";
import { caseStudies } from "@/components/sections/itanz/caseStudyData";
import { isSupabaseConfigured, supabaseFetch } from "./itanzSupabase";

const formatDate = value =>
	value
		? new Intl.DateTimeFormat("en", {
				day: "2-digit",
				month: "short",
				year: "numeric",
		  }).format(new Date(value))
		: "";

const contentToBody = content => {
	const lines = String(content || "")
		.split(/\n+/)
		.map(line => line.trim())
		.filter(Boolean);
	const sections = [];
	let current = { heading: "", content: [], list: [] };

	lines.forEach(line => {
		const headingMatch = line.match(/^#{2,3}\s+(.+)/);

		if (headingMatch) {
			if (current.heading || current.content.length || current.list.length) {
				sections.push(current);
			}

			current = { heading: headingMatch[1].trim(), content: [], list: [] };
			return;
		}

		if (/^[-*]\s+/.test(line)) {
			current.list.push(line.replace(/^[-*]\s+/, ""));
			return;
		}

		current.content.push(line);
	});

	if (current.heading || current.content.length || current.list.length) {
		sections.push(current);
	}

	return sections.map(section => ({
		heading: section.heading,
		content: section.content,
		list: section.list.length ? section.list : undefined,
	}));
};

export const mapCmsPostToArticle = post => {
	const typePath =
		post.type === "blog"
			? "/insights/blogs"
			: post.type === "case_study"
			? "/case-studies"
			: "/insights/newsroom";

	return {
		id: post.id,
		contentType: post.type,
		slug: post.slug,
		category:
			post.category ||
			(post.type === "press_release" ? "Press Release" : "Corporate News"),
		title: post.title,
		desc: post.excerpt || post.meta_description || "",
		date: formatDate(post.published_at || post.created_at),
		readTime: post.type === "press_release" ? "Press Release" : "iTANZ",
		author: "iTANZ",
		img: post.thumbnail_url || post.banner_url || "/images/blog/blog-1.webp",
		banner: post.banner_url || post.thumbnail_url || "/images/blog/blog-1.webp",
		gallery: [post.thumbnail_url, post.banner_url].filter(Boolean),
		url: `${typePath}/${post.slug}`,
		metaTitle: post.meta_title || post.title,
		metaDescription: post.meta_description || post.excerpt || "",
		datePublished: post.published_at || post.created_at || undefined,
		dateModified: post.updated_at || post.published_at || post.created_at || undefined,
		body: contentToBody(post.content || post.excerpt),
	};
};

export const getPublishedCmsPosts = async type => {
	if (!isSupabaseConfigured()) {
		return [];
	}

	try {
		const typeFilter = Array.isArray(type)
			? `type=in.(${type.join(",")})`
			: `type=eq.${type}`;
		const rows = await supabaseFetch(
			`rest/v1/itanz_content_posts?select=*&status=eq.published&${typeFilter}&order=published_at.desc.nullslast,created_at.desc`
		);

		return (rows || []).map(mapCmsPostToArticle);
	} catch (error) {
		console.error("Unable to load Supabase content:", error.message);
		return [];
	}
};

export const getInsightListingOverrides = async page => {
	if (page === "blogs") {
		const cmsBlogs = await getPublishedCmsPosts("blog");
		const cmsSlugs = new Set(cmsBlogs.map(article => article.slug));
		return {
			articles: [
				...cmsBlogs,
				...blogArticles.filter(article => !cmsSlugs.has(article.slug)),
			],
		};
	}

	if (page === "newsroom") {
		const cmsNews = await getPublishedCmsPosts(["news", "press_release"]);
		const news = cmsNews.filter(article => article.contentType !== "press_release");
		const press = cmsNews.filter(article => article.contentType === "press_release");
		const newsSlugs = new Set(news.map(article => article.slug));
		const pressSlugs = new Set(press.map(article => article.slug));

		return {
			articles: [
				...news,
				...allNewsroomArticles.filter(
					article => article.category !== "Press Release" && !newsSlugs.has(article.slug)
				),
			],
			pressReleases: [
				...press,
				...pressReleaseArticles.filter(article => !pressSlugs.has(article.slug)),
			],
		};
	}

	return {};
};

export const getInsightArticleBySlug = async ({ slug, type, fallbackArticles }) => {
	const cmsArticles = await getPublishedCmsPosts(type);
	return cmsArticles.find(article => article.slug === slug) ||
		fallbackArticles.find(article => article.slug === slug);
};

const findSection = (body, label) =>
	body.find(section =>
		String(section.heading || "").toLowerCase().includes(label.toLowerCase())
	);

export const mapCmsPostToCaseStudy = (post, index = 0) => {
	const article = mapCmsPostToArticle(post);
	const problem = findSection(article.body, "problem");
	const solution = findSection(article.body, "solution");
	const conclusion = findSection(article.body, "conclusion");
	const impact = findSection(article.body, "impact") || findSection(article.body, "outcome");

	return {
		id: post.id,
		slug: post.slug,
		filter: post.category?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "enterprise",
		category: post.category || "Case Study",
		evidence: "CMS Case Study",
		sector: post.category || "Enterprise",
		title: post.title,
		subtitle: post.excerpt || post.meta_description || "",
		primaryCategory: post.category || "Enterprise",
		platforms: post.category || "iTANZ",
		alsoMapsTo: "Transformation, Delivery",
		intro: post.excerpt || "",
		problemLead: problem?.content?.[0] || "The Problem",
		problem: problem?.list?.length ? problem.list : problem?.content?.slice(1) || [],
		solutionLead: solution?.content?.[0] || "The Solution",
		solution: solution?.list?.length ? solution.list : solution?.content?.slice(1) || [],
		technologies: post.category || "iTANZ delivery capability",
		impactLabel: impact?.heading || "Impact We Created",
		impacts: (impact?.list?.length ? impact.list : impact?.content || []).map((item, itemIndex) => [
			`Outcome ${itemIndex + 1}`,
			item,
		]),
		conclusion: conclusion?.content?.join(" ") || article.body.at(-1)?.content?.join(" ") || "",
		source: "Source basis: iTANZ CMS content.",
		gridImage: post.thumbnail_url || post.banner_url || `/images/case-studies/case-${(index % 17) + 1}/${(index % 17) + 1}b.webp`,
		bannerImage: post.banner_url || post.thumbnail_url || `/images/case-studies/case-${(index % 17) + 1}/${(index % 17) + 1}a.webp`,
		datePublished: post.published_at || post.created_at || undefined,
		dateModified: post.updated_at || post.published_at || post.created_at || undefined,
	};
};

export const getPublishedCaseStudies = async () => {
	if (!isSupabaseConfigured()) {
		return caseStudies;
	}

	try {
		const rows = await supabaseFetch(
			"rest/v1/itanz_content_posts?select=*&status=eq.published&type=eq.case_study&order=published_at.desc.nullslast,created_at.desc"
		);
		const cmsStudies = rows?.length ? rows.map(mapCmsPostToCaseStudy) : [];
		const cmsSlugs = new Set(cmsStudies.map(study => study.slug));

		return [
			...cmsStudies,
			...caseStudies.filter(study => !cmsSlugs.has(study.slug)),
		];
	} catch (error) {
		console.error("Unable to load Supabase case studies:", error.message);
		return caseStudies;
	}
};

export const getCaseStudyBySlug = async slug => {
	const studies = await getPublishedCaseStudies();
	return {
		study: studies.find(item => item.slug === slug),
		studies,
	};
};
