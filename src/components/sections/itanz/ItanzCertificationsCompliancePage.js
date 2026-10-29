"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzCta from "./ItanzCta";
import { companyOverview } from "./companyData";

const certificateBase = "/images/company/certificates";
const issuerLogo = "/images/brands/oracle.png";

const credentials = [
	{
		entity: "ITANZ Group Pty Ltd",
		region: "Australia",
		validThrough: "04 March 2025",
		image: `${certificateBase}/ITANZ Group Pty Ltd valid until 04 March 2025.webp`,
	},
	{
		entity: "ITANZ COUNTINUUM-FZCO",
		region: "United Arab Emirates",
		validThrough: "04 March 2025",
		image: `${certificateBase}/ITANZ COUNTINUUM-FZCO valid until 04 March 2025.webp`,
	},
	{
		entity: "ITANZ Group Pty Ltd",
		region: "Australia",
		validThrough: "04 March 2024",
		image: `${certificateBase}/ITANZ Group Pty Ltd valid until 04 March 2024.webp`,
	},
	{
		entity: "Itanz Technology (Private) Limited",
		region: "Pakistan",
		validThrough: "04 March 2024",
		image: `${certificateBase}/Itanz technology (Private) Limited valid until 04 March 2024.webp`,
	},
];

const trustCards = [
	{
		title: "Verified",
		desc: "Credentials are presented with entity names, dates and supporting evidence so clients can validate what matters.",
		icon: "tji-award",
	},
	{
		title: "Governed",
		desc: "Delivery practices consider security, access, documentation, continuity and accountability throughout the lifecycle.",
		icon: "tji-complete",
	},
	{
		title: "Transparent",
		desc: "Platform-level assurance and iTANZ-held credentials are kept distinct so due-diligence teams can assess claims clearly.",
		icon: "tji-check",
	},
];

const practiceItems = [
	["Security by Design", "Security considerations are incorporated into architecture, access and operational practices from the outset."],
	["Data Responsibility", "Solutions are shaped around data residency, access and governance needs relevant to the operating environment."],
	["Auditability", "Documentation, controlled workflows and traceability help organisations maintain visibility over critical processes."],
	["Operational Resilience", "Technology decisions consider continuity, supportability and keeping critical operations moving."],
];

const platformItems = [
	["Oracle", "Security and compliance capabilities of the Oracle ecosystem."],
	["NetSuite", "Enterprise ERP controls and platform assurance."],
	["Salesforce", "Enterprise cloud security and governance."],
	["Approved Cloud Platforms", "Relevant platform-level security and assurance."],
];

const corporateCompliance = {
	title: "Shariah Compliance Certificate",
	entity: "iTANZ Technologies Limited",
	issuer: "Issued by Al-Hilal Shariah Advisors",
	date: "22 December 2025",
	url: "/legal/shariah-compliance-certificate/",
};

const ItanzCertificationsCompliancePage = ({ detail }) => {
	const [activeCredential, setActiveCredential] = useState(null);
	const [isMounted, setIsMounted] = useState(false);
	const heroBg = detail.heroBg || companyOverview.heroBg || "/images/bg/map.svg";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		document.body.classList.toggle("itanz-modal-open", Boolean(activeCredential));
		return () => document.body.classList.remove("itanz-modal-open");
	}, [activeCredential]);

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === "Escape") {
				setActiveCredential(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const modalContent = activeCredential ? (
		<div className="itanz-cert-modal" role="dialog" aria-modal="true" aria-label="Credential preview">
			<button
				type="button"
				className="itanz-cert-modal-backdrop"
				aria-label="Close credential preview"
				onClick={() => setActiveCredential(null)}
			></button>
			<div className="itanz-cert-modal-panel">
				<div className="itanz-cert-modal-header">
					<div>
						<span>Credential Preview</span>
						<h3>{activeCredential.entity}</h3>
					</div>
					<button
						type="button"
						className="itanz-cert-modal-close"
						aria-label="Close credential preview"
						onClick={() => setActiveCredential(null)}
					>
						<i className="tji-plus"></i>
					</button>
				</div>
				<div className="itanz-cert-modal-image">
					<Image
						src={activeCredential.image}
						alt={`${activeCredential.entity} certificate valid until ${activeCredential.validThrough}`}
						width={1200}
						height={850}
					/>
				</div>
			</div>
		</div>
	) : null;

	return (
		<>
			<section
				className="itanz-company-hero itanz-certifications-hero section-gap"
				style={{ "--itanz-company-hero-bg": `url(${heroBg})` }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h1 className="sec-title title-anim">Trust should be visible.</h1>
								<p>
									Enterprise technology operates inside environments where security,
									governance, quality and accountability matter. iTANZ works within
									recognised technology ecosystems and disciplined delivery practices
									to help organisations make decisions with greater confidence.
								</p>
								<div className="itanz-contact-actions">
									<a href="#credentials" className="tj-primary-btn">
										<span className="btn-text">
											<span>View Credentials</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</a>
									<ButtonPrimary
										text="Speak to iTANZ"
										url="/contact/book-a-consultation"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-cert-hero-panel">
								<span>Trust</span>
								<span>Evidence</span>
								<span>Assurance</span>
								<span>Action</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section itanz-cert-trust section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Trust Foundation
								</span>
								<h2 className="sec-title">Built for environments where trust matters.</h2>
								<p>
									Government, utilities, healthcare, financial services and enterprise
									organisations operate with different regulatory and operational
									requirements. Our approach combines enterprise platforms, disciplined
									engineering and verifiable credentials.
								</p>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{trustCards.map(card => (
							<div key={card.title} className="col-lg-4 col-md-6">
								<div className="itanz-cert-trust-card">
									<div className="itanz-cert-icon">
										<i className={card.icon}></i>
									</div>
									<h3>{card.title}</h3>
									<p>{card.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="credentials" className="itanz-cert-credentials section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Credentials
								</span>
								<h2 className="sec-title">Proof, not decoration.</h2>
								<p>
									Use these credential cards to review the certificate evidence held
									for each iTANZ legal entity. Each card opens the certificate image
									for review.
								</p>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{credentials.map(credential => (
							<div key={`${credential.entity}-${credential.validThrough}`} className="col-xl-6 col-md-6">
								<div className="itanz-credential-card">
									<div className="itanz-credential-thumb">
										<Image
											src={issuerLogo}
											alt="Oracle issuer logo"
											width={420}
											height={300}
										/>
									</div>
									<div className="itanz-credential-content">
										<span className="itanz-credential-status">Credential evidence</span>
										<h3>{credential.entity}</h3>
										<ul>
											<li>
												<span>Region</span>
												<strong>{credential.region}</strong>
											</li>
											<li>
												<span>Valid through</span>
												<strong>{credential.validThrough}</strong>
											</li>
										</ul>
										<button
											type="button"
											className="text-btn"
											onClick={() => setActiveCredential(credential)}
										>
											<span className="btn-text">
												<span>View Credential</span>
											</span>
											<span className="btn-icon">
												<i className="tji-arrow-right-long"></i>
											</span>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-corporate-compliance-section">
				<div className="container">
					<div className="itanz-corporate-compliance-card">
						<div className="sec-heading">
							<span className="sub-title">
								<i className="tji-box"></i>Corporate Compliance
							</span>
							<h2>{corporateCompliance.title}</h2>
							<p>{corporateCompliance.entity}</p>
						</div>
						<div className="itanz-corporate-compliance-meta">
							<span>{corporateCompliance.issuer}</span>
							<strong>{corporateCompliance.date}</strong>
						</div>
						<a href={corporateCompliance.url} className="tj-primary-btn">
							<span className="btn-text">
								<span>View Certificate</span>
							</span>
							<span className="btn-icon">
								<i className="tji-arrow-right-long"></i>
							</span>
						</a>
					</div>
				</div>
			</section>

			<section className="itanz-cert-practice section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Compliance in Practice
								</span>
								<h2 className="sec-title">Compliance matters most when it shapes delivery.</h2>
								<p>
									A certificate is one trust signal. What matters equally is how
									technology is designed, implemented and operated.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-cert-practice-grid">
						{practiceItems.map(([title, desc]) => (
							<div key={title} className="itanz-cert-practice-card">
								<h3>{title}</h3>
								<p>{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-cert-platform section-gap">
				<div className="container">
					<div className="itanz-cert-platform-inner">
						<div className="sec-heading text-center">
							<span className="sub-title">
								<i className="tji-box"></i>Platform Assurance
							</span>
							<h2 className="sec-title">Enterprise platforms bring their own assurance frameworks.</h2>
							<p>
								Many iTANZ solutions are delivered through established enterprise
								technology platforms. Their compliance programmes can strengthen
								customer assurance, but they are distinct from certifications held
								directly by iTANZ.
							</p>
						</div>
						<div className="row row-gap-4">
							{platformItems.map(([title, desc]) => (
								<div key={title} className="col-lg-3 col-sm-6">
									<div className="itanz-cert-platform-card">
										<h3>{title}</h3>
										<p>{desc}</p>
									</div>
								</div>
							))}
						</div>
						<div className="itanz-cert-platform-action">
							<ButtonPrimary
								text="Explore Our Technology Partners"
								url="/partners"
								isTextBtn={true}
							/>
						</div>
					</div>
				</div>
			</section>

			<ItanzCta
				title="Need to validate a credential?"
				desc="If your procurement, security or governance team needs to validate an iTANZ credential, partner status or supporting documentation, speak with us directly."
				buttonText="Request Credential Verification"
				buttonUrl="/contact/book-a-consultation"
			/>

			{isMounted && modalContent ? createPortal(modalContent, document.body) : ""}
		</>
	);
};

export default ItanzCertificationsCompliancePage;
