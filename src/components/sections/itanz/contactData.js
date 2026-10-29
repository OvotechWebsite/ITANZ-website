export const contactRoutes = [
	{
		title: "Book a Consultation",
		desc: "Start a business transformation or solution consultation.",
		icon: "tji-user",
		url: "/contact/book-a-consultation?intent=consultation",
	},
	{
		title: "Product Demo",
		desc: "Request a demo for a platform, accelerator or solution.",
		icon: "tji-service-2",
		url: "/contact/product-demo?intent=demo",
	},
	{
		title: "Platform Specialist",
		desc: "Discuss Oracle, NetSuite, Salesforce, integration, analytics, AI or RaaS.",
		icon: "tji-service-4",
		url: "/contact/book-a-consultation?intent=consultation",
	},
	{
		title: "Partner / Investor",
		desc: "Route partnership and investor enquiries to the right team.",
		icon: "tji-award",
		url: "/contact/investor-enquiries?intent=investor",
	},
];

export const regionalPresence = [
	{
		region: "Pakistan",
		city: "LAHORE",
		desc: "Lahore Corporate Office — PCSIR <br/>623-B, PCSIR Phase II, Lahore, Pakistan",
	},
	{
		region: "Pakistan",
		city: "KARACHI",
		desc: "ICCBS Technology Park <br/>Room 104, Building 1, Industrial Linkage & Technology Park, ICCBS, University of Karachi, Karachi, Pakistan",
	},
	{
		region: "Pakistan",
		city: "ISLAMABAD",
		desc: "Dafterkhwan <br/>Dafterkhwan, Plot 94, Street 7, Sector I-10/3, Islamabad, Pakistan",
	},
];

export const internationalContactCards = [
	{
		country: "Australia",
		city: "Melbourne",
		title: "Australia Headquarters — Melbourne",
		address: "Level 30, 276 Flinders Street, Melbourne, Victoria 3000, Australia",
		img: "/images/contact/cards/australia-card.webp",
		icon: "/images/contact/cards/australia-flag.webp",
	},
	{
		country: "New Zealand",
		city: "Wellington",
		title: "New Zealand Office — Wellington",
		address: "Level 1, 6 Johnsonville Road, Johnsonville, Wellington 6037, New Zealand",
		img: "/images/contact/cards/new-zealand-card.webp",
		icon: "/images/contact/cards/new-zealand-flag.webp",
	},
	{
		country: "Saudi Arabia",
		city: "Jeddah",
		title: "Saudi Arabia Office — Jeddah",
		address: "Office 202, Platini Tower, Al Faisaliyyah, Jeddah, Saudi Arabia",
		img: "/images/contact/cards/saudi-arabia-card.webp",
		icon: "/images/contact/cards/saudi-arabia-flag.webp",
	},
];

export const contactFlagStrip = [
	{ label: "United Kingdom", img: "/images/contact/flags/sh.svg" },
	{ label: "Pakistan", img: "/images/contact/flags/pk.svg" },
	{ label: "Saudi Arabia", img: "/images/contact/flags/sa.svg" },
	{ label: "United Arab Emirates", img: "/images/contact/flags/ae.svg" },
	{ label: "Australia", img: "/images/contact/flags/au.svg" },
	{ label: "United States", img: "/images/contact/flags/us.svg" },
	{ label: "New Zealand", img: "/images/contact/flags/nz.svg" },
];

export const contactDetailPages = {
	"book-a-consultation": {
		title: "Book a Consultation with an iTANZ Expert",
		kicker: "Book a Consultation",
		desc: "Use this route for organisations that want to discuss transformation priorities, platform modernisation, integration, analytics, AI or capability needs.",
		metaTitle: "Book a Consultation with iTANZ | Enterprise Technology Advisory",
		metaDescription:
			"Book a consultation with iTANZ to discuss digital transformation, platforms, integration, analytics, AI or managed capability.",
		prompts: [
			"What challenge are you trying to solve?",
			"Which platforms are involved?",
			"What timeline are you considering?",
		],
		cta: "Speak to an Expert",
		intent: "consultation",
	},
	"product-demo": {
		title: "Request a Demo Built Around Your Business Need",
		kicker: "Product Demo",
		desc: "Request a relevant demonstration without confusion. Tell us what you want to see, your platform interest and preferred timeline.",
		metaTitle:
			"Request an iTANZ Product Demo | Platforms, Accelerators and Solutions",
		metaDescription:
			"Request a product or solution demo for iTANZ accelerators, Oracle, NetSuite, Salesforce, analytics, integration or AI offerings.",
		prompts: [
			"Oracle, NetSuite or Salesforce",
			"Integration, Analytics or Agentic AI",
			"ProSuite/Core, RaaS or iTANZ Accelerators",
		],
		cta: "Request a Demo",
		intent: "demo",
	},
	"regional-offices": {
		title: "Find the Right Regional iTANZ Contact",
		kicker: "Regional Offices",
		desc: "Find validated regional coverage and local enquiry pathways without relying on unverified addresses or outdated contact details.",
		metaTitle: "iTANZ Regional Offices | Global Locations and Local Contacts",
		metaDescription:
			"Find iTANZ regional office information, local contacts and market enquiry routes.",
		prompts: [
			"Select your region",
			"Share your market or city",
			"Tell us the best response pathway",
		],
		cta: "Find Regional Contact",
		intent: "regional",
	},
	"investor-enquiries": {
		title: "Investor and Corporate Enquiries",
		kicker: "Investor Enquiries",
		desc: "Use this route for investor or corporate enquiries that should be directed to an approved iTANZ contact.",
		metaTitle: "iTANZ Investor Enquiries | Corporate and Investor Contact",
		metaDescription:
			"Send investor or corporate enquiries to the appropriate iTANZ team.",
		prompts: [
			"Name and organisation",
			"Enquiry type and region",
			"Message and contact details",
		],
		cta: "Send Investor Enquiry",
		intent: "investor",
	},
};

export const formOptions = {
	regions: [
		"Select Region",
		"Lahore",
		"Karachi",
		"Islamabad",
		"Australia",
		"New Zealand",
		"Saudi Arabia",
		"Global / Other",
	],
	solutions: [
		"Select Solution",
		"Oracle",
		"NetSuite",
		"Salesforce",
		"Informatica",
		"Integration",
		"MuleSoft",
		"Analytics",
		"Agentic AI",
		"Robotics & Automation",
		"Couchbase",
		"AWS",
		"Huawei",
		"Cloudflare",
		"Cisco",
		"Fortinet",
		"Resource as a Service",
		"UBR",
		"ICP",
		"Other",
	],
	industries: [
		"Select Industry",
		"Government",
		"Utilities & Energy",
		"Financial Services",
		"Healthcare",
		"Manufacturing",
		"Defence",
		"Agriculture",
		"Enterprise",
	],
};

export const solutionSelectMap = {
	"oracle-fusion": "Oracle",
	"oracle-epm-cloud": "Oracle",
	"oracle-cloud-oci-database-multicloud": "Oracle",
	"netsuite-erp": "NetSuite",
	"netsuite-epm": "NetSuite",
	salesforce: "Salesforce",
	"slack-whatsapp": "Salesforce",
	informatica: "Informatica",
	couchbase: "Couchbase",
	mulesoft: "MuleSoft",
	"integration-oic-nsip-mulesoft": "Integration",
	"analytics-reporting-oacs-tableau": "Analytics",
	"agentic-ai-digital-transformation": "Agentic AI",
	"robotics-automation": "Robotics & Automation",
	"resource-as-a-service": "Resource as a Service",
	"itanz-accelerators-prosuite-core": "Agentic AI",
	"network-security": "Integration",
	cloudflare: "Cloudflare",
	huawei: "Huawei",
	cisco: "Cisco",
	fortinet: "Fortinet",
	"oem-implementation-services": "Integration",
	"managed-services": "Resource as a Service",
	"platform-support": "Resource as a Service",
	"post-go-live-optimisation": "Resource as a Service",
	"utility-billing-revenue-management": "UBR",
	ubr: "UBR",
	"intelligent-city-platform": "ICP",
	icp: "ICP",
};

export const industrySelectMap = {
	"government-public-sector": "Government",
	government: "Government",
	"local-government": "Government",
	"utilities-energy": "Utilities & Energy",
	"energy-utilities": "Utilities & Energy",
	"banking-financial-services": "Financial Services",
	"financial-services": "Financial Services",
	healthcare: "Healthcare",
	manufacturing: "Manufacturing",
	defence: "Defence",
	agriculture: "Agriculture",
	enterprise: "Enterprise",
	technology: "Enterprise",
	"retail-consumer": "Enterprise",
};

export const intentMessageMap = {
	consultation:
		"Tell us what you want to discuss, the platforms involved and your ideal timeline*",
	demo: "Tell us which solution you want to see and what business scenario the demo should cover*",
	regional:
		"Tell us your region, market or city and the best way for the right team to respond*",
	investor: "Share your investor or corporate enquiry and the best contact details*",
};
