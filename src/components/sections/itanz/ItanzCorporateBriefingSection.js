"use client";

import Link from "next/link";
import { useState } from "react";

const cbsDocuments = [
	{
		title: "Corporate Briefing Session (CBS) Presentation - November 16, 2026",
		category: "Corporate Announcement",
		year: "2026",
		fileType: "PDF",
		fileSize: "7.0 MB",
		fileUrl: "/downloads/investor-relations/Corporate-Briefing-Session-Presentation-November-16-2026.pdf",
		viewUrl: "/legal/corporate-briefing-session-presentation-november-16-2026/",
	},
	{
		title: "Notice of Corporate Briefing Session - November 16, 2026",
		category: "Corporate Announcement",
		year: "2026",
		fileType: "PDF",
		fileSize: "86 KB",
		fileUrl: "/downloads/investor-relations/Notice-of-Corporate-Briefing-Session-November-16-2026.pdf",
		viewUrl: "/legal/notice-of-corporate-briefing-session-november-16-2026/",
	},
];

const SHAREPOINT_DIRECT_URL =
	"https://infotechanz-my.sharepoint.com/:v:/g/personal/maqsood_munshi_itanzgroup_com/IQAxcvETzSTeSId0hH80-1ROAUdhhNrxTuHrmQaOsxv1Hmo?e=ampJFU";

const SHAREPOINT_EMBED_URL =
	"https://infotechanz-my.sharepoint.com/personal/maqsood_munshi_itanzgroup_com/_layouts/15/embed.aspx?id=%2Fpersonal%2Fmaqsood%5Fmunshi%5Fitanzgroup%5Fcom%2FDocuments%2FAttachments%2FiTANZ%5FCBS%5F2026%5FFull%5FSession%5FRecording%2Emp4&ga=1&referrer=StreamWebApp";

const ItanzCorporateBriefingSection = () => {
	const [isPlayingInline, setIsPlayingInline] = useState(false);

	return (
		<section id="corporate-briefing" className="itanz-cbs-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Corporate Briefing Session (CBS)
							</span>
							<h2 className="sec-title title-anim">
								Corporate Briefing Session — FY2026 & Future Outlook
							</h2>
							<p>
								Official briefing session held on Monday, November 16, 2026 for shareholders, 
								institutional investors, and research analysts covering iTANZ&apos;s corporate 
								performance, operational milestones, and strategic technology roadmap.
							</p>
						</div>
					</div>
				</div>

				<div className="itanz-cbs-container">
					{/* Header Banner */}
					<div className="itanz-cbs-header">
						<div className="itanz-cbs-badge-wrap">
							<span className="itanz-cbs-tag">Official Briefing Materials</span>
							<span className="itanz-cbs-date">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
									<line x1="16" y1="2" x2="16" y2="6"></line>
									<line x1="8" y1="2" x2="8" y2="6"></line>
									<line x1="3" y1="10" x2="21" y2="10"></line>
								</svg>
								November 16, 2026
							</span>
						</div>
						<h3 className="itanz-cbs-headline">Session Documentation & Video Recording</h3>
						<p className="itanz-cbs-subtext">
							Download the official briefing presentation and notice, or stream the full session video recording below.
						</p>
					</div>

					{/* Documents List */}
					<div className="itanz-cbs-documents">
						{cbsDocuments.map((doc, idx) => (
							<div className="itanz-investor-document-row itanz-cbs-doc-row" key={idx}>
								<div>
									<h3>{doc.title}</h3>
									<div className="itanz-investor-document-meta">
										<span>{doc.category}</span>
										<span>{doc.year}</span>
										<span>{doc.fileType}</span>
										<span>{doc.fileSize}</span>
									</div>
								</div>
								<div className="itanz-investor-document-actions">
									<a href={doc.fileUrl} download>
										Download <i className="tji-arrow-down"></i>
									</a>
									<Link href={doc.viewUrl}>
										View Document <i className="tji-arrow-right-long"></i>
									</Link>
								</div>
							</div>
						))}
					</div>

					{/* Video Player Area */}
					<div className="itanz-cbs-video-block">
						<div className="itanz-cbs-video-topbar">
							<div className="itanz-cbs-video-title-group">
								<div className="itanz-cbs-live-indicator">
									<span className="itanz-pulse-dot"></span>
									<span>Session Recording</span>
								</div>
								<h4>iTANZ Corporate Briefing Session (CBS) 2026 — Full Recording</h4>
							</div>
							<a
								href={SHAREPOINT_DIRECT_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="itanz-cbs-stream-btn"
							>
								<span>Open in Microsoft Stream</span>
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
									<polyline points="15 3 21 3 21 9"></polyline>
									<line x1="10" y1="14" x2="21" y2="3"></line>
								</svg>
							</a>
						</div>

						<div className="itanz-cbs-player-frame">
							{isPlayingInline ? (
								<iframe
									src={SHAREPOINT_EMBED_URL}
									title="iTANZ Corporate Briefing Session (CBS) 2026 Recording"
									allow="autoplay; fullscreen; picture-in-picture"
									allowFullScreen
									className="itanz-cbs-iframe"
								></iframe>
							) : (
								<div className="itanz-cbs-poster" onClick={() => setIsPlayingInline(true)}>
									<div className="itanz-cbs-poster-overlay">
										<button
											type="button"
											className="itanz-cbs-play-btn"
											aria-label="Play Corporate Briefing Session Recording"
											onClick={(e) => {
												e.stopPropagation();
												setIsPlayingInline(true);
											}}
										>
											<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
												<path d="M8 5v14l11-7z" />
											</svg>
										</button>
										<div className="itanz-cbs-poster-text">
											<span className="itanz-cbs-poster-tag">Corporate Briefing Session Video</span>
											<h5>Click to Stream Recording</h5>
											<p>Adaptive Chunk-by-Chunk HD Playback powered by Microsoft Cloud</p>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className="itanz-cbs-video-footer">
							<div className="itanz-cbs-footer-info">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "#00c288" }}>
									<circle cx="12" cy="12" r="10"></circle>
									<polyline points="12 6 12 12 14 14"></polyline>
								</svg>
								<span>
									<strong>Cloud Adaptive Streaming:</strong> Video is delivered chunk-by-chunk via Microsoft Stream &amp; SharePoint global CDN infrastructure with zero bandwidth impact on website servers.
								</span>
							</div>
							<a
								href={SHAREPOINT_DIRECT_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="itanz-cbs-alt-link"
							>
								Having trouble playing inline? Watch on SharePoint ↗
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzCorporateBriefingSection;
