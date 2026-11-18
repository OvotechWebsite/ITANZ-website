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

const YOUTUBE_URL = "https://www.youtube.com/watch?v=AjUMC36m76k";
const YOUTUBE_VIDEO_ID = "AjUMC36m76k";

const ItanzCorporateBriefingSection = () => {
	const [isPlaying, setIsPlaying] = useState(false);

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
								href={YOUTUBE_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="itanz-cbs-stream-btn"
							>
								<span>Watch on YouTube</span>
								<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg>
							</a>
						</div>

						<div className="itanz-cbs-player-frame">
							{isPlaying ? (
								<iframe
									src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
									title="iTANZ Corporate Briefing Session (CBS) 2026 Recording"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									className="itanz-cbs-iframe"
								></iframe>
							) : (
								<div className="itanz-cbs-poster" onClick={() => setIsPlaying(true)}>
									<div className="itanz-cbs-poster-overlay">
										<button
											type="button"
											className="itanz-cbs-play-btn"
											aria-label="Play Corporate Briefing Session Recording"
											onClick={(e) => {
												e.stopPropagation();
												setIsPlaying(true);
											}}
										>
											<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
												<path d="M8 5v14l11-7z" />
											</svg>
										</button>
										<div className="itanz-cbs-poster-text">
											<span className="itanz-cbs-poster-tag">Corporate Briefing Session Video</span>
											<h5>Click to Play Recording Here</h5>
											<p>Full HD Playback &bull; Speed Controls (0.25x–2x) &bull; Quality Selection</p>
											<div className="itanz-cbs-badge-pill">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
													<polygon points="5 3 19 12 5 21 5 3"></polygon>
												</svg>
												Instant Inline Stream (No Sign-in Required)
											</div>
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
									<strong>Adaptive Chunk Streaming:</strong> Streamed directly via YouTube&apos;s global CDN with zero sign-in required and zero bandwidth load on website servers.
								</span>
							</div>
							<a
								href={YOUTUBE_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="itanz-cbs-alt-link"
							>
								Watch on YouTube ↗
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzCorporateBriefingSection;
