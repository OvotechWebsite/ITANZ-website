import { investorDocuments } from "./investorDocumentsData";

const latestDocuments = investorDocuments.slice(0, 5);

const getDocumentGroup = document => {
	const title = document.title.toLowerCase();
	const category = document.category.toLowerCase();

	if (
		category.includes("annual report") ||
		title.includes("annual report") ||
		title.includes("audited accounts") ||
		title.includes("audit report")
	) {
		return ["Financial Statements", "Annual Financial Statements"];
	}

	if (
		category.includes("financial") ||
		title.includes("quarter") ||
		title.includes("half year") ||
		title.includes("half-year") ||
		title.includes("financial statements") ||
		title.includes("financial results") ||
		title.includes("booklet")
	) {
		return ["Financial Statements", "Quarterly Financial Statements"];
	}

	if (title.includes("material") || category.includes("regulatory disclosure")) {
		return ["Material Information", ""];
	}

	if (
		title.includes("shariah") ||
		category.includes("compliance certificate") ||
		category.includes("certification")
	) {
		return ["Compliance & Certifications", ""];
	}

	if (
		title.includes("agm") ||
		title.includes("eogm") ||
		title.includes("general meeting") ||
		title.includes("scrutinizer") ||
		title.includes("ballot") ||
		title.includes("proxy") ||
		title.includes("section 134") ||
		title.includes("scheme of arrangement")
	) {
		if (title.includes("agm")) {
			return ["General Meetings", "Notice of Annual General Meeting (AGM)"];
		}

		if (title.includes("eogm") || title.includes("extra ordinary") || title.includes("extraordinary")) {
			return ["General Meetings", "Notice of Extraordinary General Meeting (EGM)"];
		}

		return ["General Meetings", "Extracts of General Meetings and Related Documents"];
	}

	if (
		title.includes("public announcement") ||
		title.includes("bonus shares") ||
		title.includes("board meeting") ||
		title.includes("certificate of incorporation") ||
		category.includes("corporate")
	) {
		return ["Corporate Announcements", ""];
	}

	return ["Others", ""];
};

const documentCategoryOrder = [
	"Financial Statements",
	"Material Information",
	"General Meetings",
	"Corporate Announcements",
	"Compliance & Certifications",
	"Others",
];

const documentGroups = documentCategoryOrder.map(title => {
	const documents = investorDocuments.filter(document => getDocumentGroup(document)[0] === title);
	const subcategories = [...new Set(documents.map(document => getDocumentGroup(document)[1]).filter(Boolean))];

	return {
		title,
		documents,
		subcategories: subcategories.map(subcategory => ({
			title: subcategory,
			documents: documents.filter(document => getDocumentGroup(document)[1] === subcategory),
		})),
		directDocuments: documents.filter(document => !getDocumentGroup(document)[1]),
	};
});

const DocumentRow = ({ document }) => (
	<div className="itanz-investor-document-row">
		<div>
			<h3>{document.title}</h3>
			<div className="itanz-investor-document-meta">
				<span>{document.category}</span>
				<span>{document.year}</span>
				<span>{document.fileType}</span>
				<span>{document.fileSize}</span>
			</div>
		</div>
		<div className="itanz-investor-document-actions">
			<a href={document.fileUrl} download>
				Download <i className="tji-arrow-down"></i>
			</a>
			<a href={document.viewUrl}>
				View Document <i className="tji-arrow-right-long"></i>
			</a>
		</div>
	</div>
);

const ItanzInvestorNoticesSection = () => {
	return (
		<section className="itanz-investor-notices-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Notices & Quick Links
							</span>
							<h2 className="sec-title title-anim">
								Everything investors need. One clear place.
							</h2>
							<p>
								Access relevant reports, regulatory disclosures, meeting notices
								and shareholder documents through one clear, up-to-date resource
								library.
							</p>
						</div>
					</div>
				</div>
				<div className="itanz-investor-document-library">
					<div className="itanz-investor-library-head">
						<div>
							<span>Downloads & Investor Notices</span>
							<h3>{investorDocuments.length} documents available</h3>
						</div>
						<p>
							Latest notices are shown first. The full document library is grouped
							by investor category for quicker shareholder access.
						</p>
					</div>
					<div className="itanz-investor-latest-documents">
						{latestDocuments.map((document) => (
							<DocumentRow document={document} key={document.slug} />
						))}
					</div>
					<div className="itanz-investor-archive">
						<h3>Categorized Document Library</h3>
						{documentGroups.map((group, index) => (
							<details key={group.title} open={index === 0}>
								<summary>
									<span>{group.title}</span>
									<em>{group.documents.length} documents</em>
								</summary>
								<div className="itanz-investor-archive-list">
									{group.subcategories.map(subcategory => (
										<div className="itanz-investor-document-subgroup" key={subcategory.title}>
											<h4>{subcategory.title}</h4>
											{subcategory.documents.map((document) => (
												<DocumentRow document={document} key={document.slug} />
											))}
										</div>
									))}
									{group.directDocuments.map((document) => (
										<DocumentRow document={document} key={document.slug} />
									))}
								</div>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzInvestorNoticesSection;
