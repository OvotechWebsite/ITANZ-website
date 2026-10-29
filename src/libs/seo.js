export const SITE_NAME = "iTANZ";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://itanzgroup.com").replace(/\/$/, "");
export const DEFAULT_SOCIAL_IMAGE = "/images/hero/hero-img.webp";

export const absoluteUrl = path => {
	if (!path) return SITE_URL;
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildMetadata = ({
	title,
	description,
	path = "/",
	image = DEFAULT_SOCIAL_IMAGE,
	type = "website",
	publishedTime,
	modifiedTime,
	authors,
}) => {
	const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
	const socialImage = absoluteUrl(image);

	return {
		title,
		description,
		alternates: { canonical: canonicalPath },
		openGraph: {
			type,
			url: canonicalPath,
			title,
			description,
			siteName: SITE_NAME,
			locale: "en_US",
			images: [{ url: socialImage, alt: title }],
			...(publishedTime ? { publishedTime } : {}),
			...(modifiedTime ? { modifiedTime } : {}),
			...(authors?.length ? { authors } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [socialImage],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
	};
};

export const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${SITE_URL}/#organization`,
	name: SITE_NAME,
	url: SITE_URL,
	logo: absoluteUrl("/images/logos/logo-large.webp"),
};

export const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	url: SITE_URL,
	name: SITE_NAME,
	publisher: { "@id": `${SITE_URL}/#organization` },
	inLanguage: "en",
};

export const breadcrumbJsonLd = items => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.name,
		item: absoluteUrl(item.path),
	})),
});

export const articleJsonLd = ({
	title,
	description,
	path,
	image,
	author = SITE_NAME,
	datePublished,
	dateModified,
}) => ({
	"@context": "https://schema.org",
	"@type": "Article",
	headline: title,
	description,
	url: absoluteUrl(path),
	mainEntityOfPage: absoluteUrl(path),
	image: [absoluteUrl(image || DEFAULT_SOCIAL_IMAGE)],
	author: { "@type": "Organization", name: author },
	publisher: { "@id": `${SITE_URL}/#organization` },
	...(datePublished ? { datePublished } : {}),
	...(dateModified ? { dateModified } : {}),
});

export const jobPostingJsonLd = ({ job, path }) => {
	if (!job.datePosted || /talent pool/i.test(job.need || "")) return null;

	const workModel = String(job.workModel || "").toLowerCase();
	const employmentType = workModel.includes("full")
		? "FULL_TIME"
		: workModel.includes("part")
		? "PART_TIME"
		: workModel.includes("contract")
		? "CONTRACTOR"
		: undefined;
	const isRemote = /^remote/i.test(`${job.workModel || ""} ${job.location || ""}`);

	return {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.summary,
		url: absoluteUrl(path),
		hiringOrganization: {
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: SITE_NAME,
		},
		...(employmentType ? { employmentType } : {}),
		...(isRemote ? { jobLocationType: "TELECOMMUTE" } : {}),
		...(!isRemote && job.location
			? {
					jobLocation: {
						"@type": "Place",
						address: {
							"@type": "PostalAddress",
							addressLocality: job.location,
						},
					},
			  }
			: {}),
		...(job.datePosted ? { datePosted: job.datePosted } : {}),
	};
};
