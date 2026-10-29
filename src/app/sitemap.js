import { caseStudies } from "@/components/sections/itanz/caseStudyData";
import { contactDetailPages } from "@/components/sections/itanz/contactData";
import { industryPages } from "@/components/sections/itanz/industryData";
import {
	allNewsroomArticles,
	blogArticles,
	insightPages,
	pressReleaseArticles,
} from "@/components/sections/itanz/insightsData";
import { investorDocuments } from "@/components/sections/itanz/investorDocumentsData";
import { partnerPages } from "@/components/sections/itanz/partnersData";
import { solutionPages } from "@/components/sections/itanz/solutionData";
import getPublishedCareers from "@/libs/getPublishedCareers";
import {
	getPublishedCaseStudies,
	getPublishedCmsPosts,
} from "@/libs/getPublishedContent";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://itanzgroup.com").replace(/\/$/, "");

const makeUrl = (path, options = {}) => ({
	url: `${SITE_URL}${path === "/" ? "" : path}`,
	...(options.lastModified ? { lastModified: options.lastModified } : {}),
	changeFrequency: options.changeFrequency || "monthly",
	priority: options.priority ?? 0.7,
});

const uniqueByUrl = entries => {
	const seen = new Set();
	return entries.filter(entry => {
		if (seen.has(entry.url)) {
			return false;
		}

		seen.add(entry.url);
		return true;
	});
};

export default async function sitemap() {
	const [publishedCareers, publishedCaseStudies, cmsBlogs, cmsNewsroom] =
		await Promise.all([
			getPublishedCareers(),
			getPublishedCaseStudies(),
			getPublishedCmsPosts("blog"),
			getPublishedCmsPosts(["news", "press_release"]),
		]);

	const cmsBlogSlugs = new Set(cmsBlogs.map(article => article.slug));
	const cmsNewsroomSlugs = new Set(cmsNewsroom.map(article => article.slug));
	const cmsCaseStudySlugs = new Set(
		publishedCaseStudies
			.filter(study => !caseStudies.some(staticStudy => staticStudy.slug === study.slug))
			.map(study => study.slug)
	);

	return uniqueByUrl([
		makeUrl("/", { changeFrequency: "weekly", priority: 1 }),
		makeUrl("/solutions", { changeFrequency: "monthly", priority: 0.9 }),
		makeUrl("/industries", { changeFrequency: "monthly", priority: 0.9 }),
		makeUrl("/success-stories", { changeFrequency: "monthly", priority: 0.9 }),
		makeUrl("/case-studies", { changeFrequency: "weekly", priority: 0.9 }),
		makeUrl("/insights", { changeFrequency: "weekly", priority: 0.85 }),
		makeUrl("/partners", { changeFrequency: "monthly", priority: 0.85 }),
		makeUrl("/careers", { changeFrequency: "weekly", priority: 0.85 }),
		makeUrl("/company", { changeFrequency: "monthly", priority: 0.85 }),
		makeUrl("/contact", { changeFrequency: "monthly", priority: 0.8 }),
		makeUrl("/investor-relations", { changeFrequency: "weekly", priority: 0.85 }),
		makeUrl("/campaigns/cloudflare", { changeFrequency: "monthly", priority: 0.72 }),
		makeUrl("/campaigns/companyprofile", { changeFrequency: "monthly", priority: 0.72 }),
		makeUrl("/campaigns/couchbase", { changeFrequency: "monthly", priority: 0.72 }),
		makeUrl("/campaigns/netsuite", { changeFrequency: "monthly", priority: 0.72 }),
		makeUrl("/campaigns/leap5", { changeFrequency: "monthly", priority: 0.72 }),

		...Object.keys(solutionPages).map(slug =>
			makeUrl(`/solutions/${slug}`, { priority: 0.78 })
		),
		...Object.keys(industryPages).map(slug =>
			makeUrl(`/industries/${slug}`, { priority: 0.76 })
		),
		makeUrl("/company/certifications-compliance", { priority: 0.72 }),
		...Object.keys(contactDetailPages).map(slug =>
			makeUrl(`/contact/${slug}`, { priority: 0.65 })
		),
		...Object.keys(partnerPages).map(slug =>
			makeUrl(`/partners/${slug}`, { priority: 0.72 })
		),
		...Object.keys(insightPages).map(slug =>
			makeUrl(slug === "case-studies" ? "/case-studies" : `/insights/${slug}`, {
				changeFrequency: "weekly",
				priority: 0.74,
			})
		),
		...[
			...cmsBlogs,
			...blogArticles.filter(article => !cmsBlogSlugs.has(article.slug)),
		].map(article =>
			makeUrl(`/insights/blogs/${article.slug}`, {
				lastModified: article.dateModified || article.datePublished,
				changeFrequency: "monthly",
				priority: 0.7,
			})
		),
		...[
			...cmsNewsroom,
			...allNewsroomArticles.filter(article => !cmsNewsroomSlugs.has(article.slug)),
			...pressReleaseArticles.filter(article => !cmsNewsroomSlugs.has(article.slug)),
		].map(article =>
			makeUrl(`/insights/newsroom/${article.slug}`, {
				lastModified: article.dateModified || article.datePublished,
				changeFrequency: "monthly",
				priority: 0.7,
			})
		),
		...[
			...publishedCaseStudies.filter(study => cmsCaseStudySlugs.has(study.slug)),
			...caseStudies,
		].map(study =>
			makeUrl(`/case-studies/${study.slug}`, {
				lastModified: study.dateModified || study.datePublished,
				changeFrequency: "monthly",
				priority: 0.74,
			})
		),
		...publishedCareers.map(role =>
			makeUrl(`/careers/${role.slug || role.id}`, {
				lastModified: role.datePosted,
				changeFrequency: "weekly",
				priority: 0.68,
			})
		),
		...investorDocuments.map(document =>
			makeUrl(`/legal/${document.slug}`, {
				changeFrequency: "monthly",
				priority: 0.62,
			})
		),
	]);
}
