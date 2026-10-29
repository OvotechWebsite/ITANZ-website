import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import { coInnovationSteps, partnerLogos, partnerPages } from "./partnersData";

const ItanzPartnerDetailPage = ({ page }) => {
	const detail = partnerPages[page];

	if (!detail) {
		return null;
	}

	return (
		<>
			<section
				className="itanz-partners-hero section-gap"
				style={{
					...(detail.heroBg ? { "--itanz-partners-hero-bg": `url(${detail.heroBg})` } : {}),
					...(detail.heroBgMobile ? { "--itanz-partners-hero-bg-mobile": `url(${detail.heroBgMobile})` } : {}),
				}}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h1 className="sec-title title-anim">{detail.title}</h1>
								<p>{detail.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={detail.primaryCta}
										url={`/contact?type=partner&source=%2Fpartners%2F${detail.slug}`}
									/>
									<ButtonPrimary
										text={detail.secondaryCta}
										url={
											detail.secondaryCtaUrl
												? detail.secondaryCtaUrl
												: detail.logo
													? "/partners/technology-partners"
													: "/partners/partner-program"
										}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{detail.logo ? (
								<div className={`itanz-partner-detail-logo-card ${detail.cardImg ? "has-card-image" : ""}`}>
									{detail.cardImg ? (
										<div className="itanz-partner-detail-card-img">
											<img src={detail.cardImg} alt={`${detail.kicker} cloud capability visual`} />
										</div>
									) : (
										""
									)}
									<img src={detail.logo} alt={detail.kicker} />
									{/* <span>{detail.category}</span>
									<strong>{detail.kicker}</strong> */}
								</div>
							) : (
								<div>
									{/* <div className="itanz-company-proof">
										<span>{detail.kicker}</span>
										<span>Platform Ecosystem</span>
										<span>Partner Enquiry Route</span>
									</div> */}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{detail.introTitle ? (
				<section className="itanz-partner-intro section-gap">
					<div className="container">
						<div className="itanz-partner-intro-grid">
							<div className="sec-heading mb-0">
								<span className="sub-title">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h2>{detail.introTitle}</h2>
								<p>{detail.introDesc}</p>
							</div>
							<div className="itanz-partner-principle">
								<span>Positioning Principle</span>
								<strong>{detail.positioningPrinciple}</strong>
							</div>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.valueAttributes?.length ? (
				<section className="tj-choose-section section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.kicker}
									</span>
									<h2 className="sec-title title-anim">
										Three Value Attributes of {detail.kicker}
									</h2>
									{detail.deliveryDesc ? <p>{detail.deliveryDesc}</p> : ""}
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{detail.valueAttributes.map((section, idx) => (
								<div key={section.title} className="col-lg-4 col-md-6">
									<FeatureCard
										feature={{
											...section,
											icon: section.icon || ["tji-service-1", "tji-chart", "tji-support"][idx % 3],
										}}
										idx={idx}
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				<section className="tj-choose-section section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.kicker}
									</span>
									<h2 className="sec-title title-anim">{detail.deliveryModel || "How This Partnership Pathway Creates Value."}</h2>
									{detail.deliveryDesc ? <p>{detail.deliveryDesc}</p> : ""}
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{detail.sections.map((section, idx) => (
								<div key={section.title} className="col-lg-4 col-md-6">
									<FeatureCard feature={section} idx={idx} />
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{detail.offerings?.length ? (
				<section className="itanz-partner-offerings section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.kicker} Offerings
									</span>
									<h2 className="sec-title title-anim">
										What It Means for the Customer
									</h2>
								</div>
							</div>
						</div>
						<div className="itanz-partner-offerings-grid">
							{detail.offerings.map(offering => (
								<div key={offering.title} className="itanz-partner-offering-card">
									<strong>{offering.title}</strong>
									<p>{offering.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			) : detail.capabilities?.length ? (
				<section className="itanz-partner-capabilities section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>Key Services and Capabilities
									</span>
									<h2 className="sec-title title-anim">
										What It Means for the Customer.
									</h2>
								</div>
							</div>
						</div>
						<div className="itanz-partner-capability-grid">
							{detail.capabilities.map(capability => (
								<div key={capability.title} className="itanz-partner-capability-card">
									<strong>{capability.title}</strong>
									<p>{capability.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.industries?.length ? (
				<section className="itanz-partner-industries section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.kicker} Industries Supported
									</span>
									<h2 className="sec-title title-anim">
										Where This Capability Fits
									</h2>
								</div>
							</div>
						</div>
						<div className="itanz-partner-industry-grid">
							{detail.industries.map(industry => (
								<div
									key={typeof industry === "string" ? industry : industry.title}
									className="itanz-partner-industry-card"
								>
									<strong>{typeof industry === "string" ? industry : industry.title}</strong>
									{typeof industry === "string" ? "" : <p>{industry.desc}</p>}
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.useCases?.length && detail.useCases.some(useCase => useCase.problem) ? (
				<section className="itanz-partner-use-cases section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.kicker} Use Cases
									</span>
									<h2 className="sec-title title-anim">
										Proof and Practical Starting Points
									</h2>
								</div>
							</div>
						</div>
						<div className="itanz-partner-use-case-rich-grid">
							{detail.useCases.map(useCase => (
								<article key={useCase.title} className="itanz-partner-use-case-rich">
									{useCase.image ? (
										<figure className="itanz-partner-use-case-img">
											<img src={useCase.image} alt={useCase.imageAlt || useCase.title} />
										</figure>
									) : (
										""
									)}
									<span>{useCase.evidence}</span>
									<h3>{useCase.title}</h3>
									<div>
										<strong>The Problem</strong>
										<p>{useCase.problem}</p>
									</div>
									<div>
										<strong>The Solution</strong>
										<p>{useCase.solution}</p>
									</div>
									<div>
										<strong>Impact</strong>
										<p>{useCase.impact}</p>
									</div>
									<div>
										<strong>The Conclusion</strong>
										<p>{useCase.conclusion}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>
			) : detail.useCases?.length ? (
				<section className="itanz-partner-fit section-gap">
					<div className="container">
						<div className="itanz-partner-fit-grid">
							{detail.useCases?.length ? (
								<div className="itanz-partner-fit-panel">
									<span className="sub-title">
										<i className="tji-box"></i>Strongest Use Cases
									</span>
									<h2>High-Value Starting Points</h2>
									<div className="itanz-partner-use-case-list">
										{detail.useCases.map(useCase => (
											<div key={useCase.title}>
												<strong>{useCase.title}</strong>
												<p>{useCase.desc}</p>
											</div>
										))}
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.whyItanz ? (
				<section className="itanz-partner-why section-gap">
					<div className="container">
						<div className="row align-items-center row-gap-4">
							<div className="col-lg-5">
								<div className="sec-heading mb-0">
									<span className="sub-title">
										<i className="tji-box"></i>Why iTANZ for {detail.kicker}
									</span>
									<h2 className="sec-title">{detail.whyItanz.title}</h2>
									<p>{detail.whyItanz.desc}</p>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="itanz-partner-why-grid">
									{detail.whyItanz.items.map(item => (
										<div key={item.title}>
											<strong>{item.title}</strong>
											<p>{item.desc}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.conversionOffer ? (
				<section className="itanz-partner-conversion section-gap">
					<div className="container">
						<div className="itanz-partner-conversion-inner">
							<div className="sec-heading mb-0">
								<span className="sub-title">
									<i className="tji-box"></i>Primary Conversion Offer
								</span>
								<h2 className="sec-title">{detail.conversionOffer.title}</h2>
								<p>{detail.conversionOffer.desc}</p>
							</div>
							<div className="itanz-partner-conversion-list">
								{detail.conversionOffer.items.map(item => (
									<span key={item}>{item}</span>
								))}
							</div>
							<div className="itanz-contact-actions justify-content-center">
								<ButtonPrimary
									text={detail.conversionOffer.button}
									url={detail.secondaryCtaUrl || `/contact?type=partner&source=%2Fpartners%2F${detail.slug}`}
								/>
							</div>
							<p className="itanz-partner-conversion-note">
								{detail.conversionOffer.supportingLine}
							</p>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{page === "technology-partners" || page === "partner-categories" ? (
				<section className="itanz-partner-logos section-gap pt-0">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>Platform Ecosystem
									</span>
									<h2 className="sec-title title-anim">
										Approved Partner Logos and Capability Mapping.
									</h2>
								</div>
							</div>
						</div>
						<div className="itanz-partner-logo-grid">
							{partnerLogos.map(partner => (
								<div key={partner.name} className="itanz-partner-logo-card">
									<img src={partner.img} alt={partner.name} />
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{page === "partner-program" || page === "strategic-alliances" ? (
				<section className="itanz-partner-process section-gap pt-0">
					<div className="container">
						<div className="itanz-partner-process-grid">
							{coInnovationSteps.map((step, idx) => (
								<div key={step.title} className="itanz-partner-process-card">
									<span>{idx + 1}</span>
									<i className={step.icon}></i>
									<strong>{step.title}</strong>
									<p>{step.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			<section className="tj-cta-section">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="cta-area">
								<div className="cta-content">
									<h2 className="title title-anim">
										{detail.finalCta?.title || "Explore partner opportunities with iTANZ."}
									</h2>
									{detail.finalCta?.desc ? <p className="text-white">{detail.finalCta.desc}</p> : ""}
									<div className="cta-btn wow fadeInUp">
										<ButtonPrimary
											text={detail.finalCta?.button || detail.primaryCta}
											url={`/contact?type=partner&source=%2Fpartners%2F${detail.slug}`}
											className="btn-dark"
										/>
									</div>
								</div>
								<div className="cta-img">
									<picture>
										{detail.ctaImgMobile ? (
											<source media="(max-width: 575px)" srcSet={detail.ctaImgMobile} />
										) : (
											""
										)}
										<img
											src={detail.ctaImg || "/images/hero/slider-2.webp"}
											alt={`${detail.kicker} enterprise technology consultation`}
										/>
									</picture>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzPartnerDetailPage;
