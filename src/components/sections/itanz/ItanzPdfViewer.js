"use client";

import { useEffect, useState } from "react";

const LOAD_TIMEOUT_MS = 180000;

const ItanzPdfViewer = ({ fileUrl, title }) => {
	const [status, setStatus] = useState("downloading");
	const [attempt, setAttempt] = useState(0);
	const [progress, setProgress] = useState(null);
	const [viewerUrl, setViewerUrl] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		let isActive = true;

		const timeout = window.setTimeout(() => {
			controller.abort();
		}, LOAD_TIMEOUT_MS);

		const loadPdf = async () => {
			setStatus("downloading");
			setProgress(null);
			setViewerUrl("");

			try {
				const response = await fetch(fileUrl, {
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error(`PDF request failed with status ${response.status}`);
				}

				const totalBytes = Number(response.headers.get("content-length")) || 0;
				const reader = response.body?.getReader();

				if (reader) {
					let receivedBytes = 0;

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						receivedBytes += value.byteLength;

						if (totalBytes) {
							setProgress(Math.min(100, Math.round((receivedBytes / totalBytes) * 100)));
						}
					}

				} else {
					await response.blob();
				}

				if (!isActive) return;

				setProgress(100);
				setViewerUrl(`${fileUrl}#toolbar=1&navpanes=0`);
				setStatus("rendering");
			} catch (error) {
				if (isActive) {
					setStatus("error");
				}
			}
		};

		loadPdf();

		return () => {
			isActive = false;
			window.clearTimeout(timeout);
			controller.abort();
		};
	}, [attempt, fileUrl]);

	const isLoading = status === "downloading" || status === "rendering";
	const hasError = status === "error";
	const statusMessage =
		status === "rendering" ? "Preparing document preview" : "Loading document";

	return (
		<div
			className={`itanz-pdf-viewer-frame ${isLoading ? "is-loading" : ""}`}
			aria-busy={isLoading}
		>
			{viewerUrl && (
				<iframe
					key={`${viewerUrl}-${attempt}`}
					src={viewerUrl}
					title={title}
					onLoad={() => setStatus("loaded")}
					onError={() => setStatus("error")}
				></iframe>
			)}

			{isLoading && (
				<div className="itanz-pdf-viewer-status" role="status" aria-live="polite">
					<span className="itanz-pdf-viewer-spinner" aria-hidden="true"></span>
					<strong>{statusMessage}</strong>
					<p>
						{progress === null
							? "This large PDF may take a moment to appear."
							: `${progress}% downloaded`}
					</p>
					{progress !== null && (
						<span
							className="itanz-pdf-viewer-progress"
							aria-label={`${progress}% downloaded`}
						>
							<span style={{ width: `${progress}%` }}></span>
						</span>
					)}
				</div>
			)}

			{hasError && (
				<div className="itanz-pdf-viewer-status is-error" role="alert">
					<strong>The document preview is taking longer than expected.</strong>
					<p>You can retry the preview or open the PDF directly.</p>
					<div className="itanz-pdf-viewer-actions">
						<button type="button" onClick={() => setAttempt(current => current + 1)}>
							Try again
						</button>
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
