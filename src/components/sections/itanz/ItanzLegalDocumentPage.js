import ItanzPdfViewer from "./ItanzPdfViewer";

const ItanzLegalDocumentPage = ({
	document,
	previousDocument,
	nextDocument,
}) => {
	const isPdf = document.assetType === "pdf";

	return (
		<section className="itanz-legal-document-section section-gap">
			<div className="container">
				<div className="itanz-legal-document-shell">
					<div className="itanz-legal-document-head">
						<div>
							<span className="sub-title">
								<i className="tji-box"></i>{document.category}
							</span>
							<h2>{document.title}</h2>
							<div className="itanz-investor-document-meta">
								<span>{document.year}</span>
								<span>{document.fileType}</span>
								<span>{document.fileSize}</span>
							</div>
						</div>
						<a
							className="tj-primary-btn itanz-legal-download-btn"
							href={document.fileUrl}
							download
						>
							<span className="btn-text">
								<span>Download {document.fileType}</span>
							</span>
							<span className="btn-icon">
								<i className="tji-arrow-down"></i>
							</span>
						</a>
					</div>
					<div className="itanz-legal-document-viewer">
						{isPdf ? (
							<ItanzPdfViewer
								fileUrl={document.fileUrl}
								title={document.title}
							/>
						) : (
							<img src={document.fileUrl} alt={document.title} />
						)}
					</div>
					{(previousDocument || nextDocument) && (
						<div className="itanz-legal-document-nav">
							{previousDocument ? (
								<a href={previousDocument.viewUrl} className="is-prev">
									<i className="tji-arrow-left"></i>
									<span>
										<em>Previous Document</em>
										<strong>{previousDocument.title}</strong>
									</span>
								</a>
							) : (
								<span></span>
							)}
							{nextDocument ? (
								<a href={nextDocument.viewUrl} className="is-next">
									<span>
										<em>Next Document</em>
										<strong>{nextDocument.title}</strong>
									</span>
									<i className="tji-arrow-right"></i>
								</a>
							) : (
								<span></span>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ItanzLegalDocumentPage;
