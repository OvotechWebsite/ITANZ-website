"use client";

import { useState } from "react";

const ItanzPdfViewer = ({ fileUrl, title }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	return (
		<div className={`itanz-pdf-viewer-frame ${!isLoaded ? "is-loading" : ""}`}>
			<iframe
				src={`${fileUrl}#toolbar=1&navpanes=0`}
				title={title}
				loading="lazy"
				onLoad={() => setIsLoaded(true)}
				onError={() => setHasError(true)}
				className="itanz-pdf-iframe"
			></iframe>

			{!isLoaded && !hasError && (
				<div className="itanz-pdf-viewer-status" role="status" aria-live="polite">
					<span className="itanz-pdf-viewer-spinner" aria-hidden="true"></span>
					<strong>Loading document preview...</strong>
					<p>Rendering document preview.</p>
				</div>
			)}

			{hasError && (
				<div className="itanz-pdf-viewer-status is-error" role="alert">
					<strong>The document preview is taking longer than expected.</strong>
					<p>You can open or download the PDF directly.</p>
					<div className="itanz-pdf-viewer-actions">
						<a href={fileUrl} target="_blank" rel="noreferrer">
							Open PDF
						</a>
						<a href={fileUrl} download>
							Download PDF
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default ItanzPdfViewer;
