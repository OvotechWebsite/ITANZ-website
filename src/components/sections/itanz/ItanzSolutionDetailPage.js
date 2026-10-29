import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import ProcessCard from "@/components/shared/cards/ProcessCard";
import ItanzCta from "./ItanzCta";
import { getRelatedSolutions, solutionPages, solutionsOverview } from "./solutionData";

const ItanzSolutionDetailPage = ({ page }) => {
	const detail = solutionPages[page];
	const source = `/solutions/${page}`;
	const contactUrl = `/contact/book-a-consultation?solution=${page}&intent=consultation&source=${encodeURIComponent(source)}`;
	const demoUrl = `/contact/product-demo?solution=${page}&intent=demo&source=${encodeURIComponent(source)}`;

	if (!detail) {
		return null;
	}

	const relatedSolutions = getRelatedSolutions(page);
	const heroBg = detail.heroBg || solutionsOverview.heroBg;
	const applicationIcons = [
		"tji-service-1",
		"tji-user",
		"tji-chart",
		"tji-service-2",
		"tji-award",
		"tji-service-3",
	];
	const proofItems = detail.proofItems || [
		detail.kicker,
		"Enterprise Integration",
		"Managed Support",
	];

	return (
		<>
			<section
				className="itanz-solutions-hero section-gap"
				style={{ "--itanz-solutions-hero-bg": `url(${heroBg})` }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h1 className="sec-title title-anim">{detail.title}</h1>
								{detail.desc ? <p>{detail.desc}</p> : ""}
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={detail.primaryCta || "Book a Solution Consultation"}
										url={contactUrl}
									/>
									<ButtonPrimary
										text={detail.secondaryCta || "Request a Demo"}
										url={demoUrl}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								{proofItems.map(item => (
									<span key={item}>{item}</span>
								))}
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section itanz-solution-outcomes-section section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h2 className="sec-title title-anim">
									{detail.outcomeHeading || "How iTANZ Turns Capability into Outcomes"}
								</h2>
								{detail.outcomeDesc ? <p>{detail.outcomeDesc}</p> : ""}
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{detail.sections.map(([title, desc], idx) => (
							<div
								key={title}
								className={`${detail.sections.length === 3 ? "col-lg-4" : "col-lg-3 col-md-6"}`}
							>
								<FeatureCard
									feature={{
										title,
										desc,
										icon: idx % 2 ? "tji-service-2" : "tji-award",
									}}
									type={2}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{detail.visualSections?.length ? (
				<section className="itanz-solution-visuals section-gap pt-0">
					<div className="container">
						{detail.visualSections.map(section => (
							<div
								key={section.title}
								className={`itanz-solution-visual-panel ${section.reverse ? "is-reverse" : ""}`}
							>
								<div className="row row-gap-4 align-items-center">
									<div className={`col-lg-6 ${section.reverse ? "order-lg-2" : ""}`}>
										<div className="itanz-solution-visual-img">
											<img src={section.img} alt={section.alt || section.title} />
										</div>
									</div>
									<div className={`col-lg-6 ${section.reverse ? "order-lg-1" : ""}`}>
										<div className="sec-heading mb-0">
											<span className="sub-title wow fadeInUp">
												<i className="tji-box"></i>{section.kicker || detail.kicker}
											</span>
											<h2 className="sec-title title-anim">{section.title}</h2>
											<p>{section.desc}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			) : (
				""
			)}

			{detail.benefits?.length ? (
				<section className="itanz-solution-benefits section-gap pt-0">
					<div className="container">
						<div className="row row-gap-4 align-items-center">
							<div className="col-lg-5">
								<div className="sec-heading mb-0">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.benefitsKicker}
									</span>
									<h2 className="sec-title title-anim">
										{detail.benefitsHeading}
									</h2>
									{detail.benefitsIntro ? <p>{detail.benefitsIntro}</p> : ""}
								</div>
							</div>
							<div className="col-lg-7">
								<div className="itanz-tag-cloud">
									{detail.benefits.map(benefit => (
										<span key={benefit}>{benefit}</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.capabilities?.length ? (
				<section className="itanz-solution-capabilities tj-choose-section section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.capabilitiesKicker}
									</span>
									<h2 className="sec-title title-anim">
										{detail.capabilitiesHeading}
									</h2>
									{detail.capabilitiesIntro ? <p>{detail.capabilitiesIntro}</p> : ""}
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{detail.capabilities.map((capability, idx) => (
								<div
									key={capability.title}
									className={capability.items ? "col-lg-4" : "col-xl-3 col-md-6"}
								>
									{capability.items ? (
										<div className="choose-box h6-choose-box itanz-capability-card right-swipe">
											<div className="choose-content">
												<div className="choose-icon">
													<i className={capability.icon || "tji-award"}></i>
												</div>
												<h3>{capability.title}</h3>
												<p>{capability.desc}</p>
												<span>Core Functions</span>
												<ul>
													{capability.items.map(item => (
														<li key={item}>{item}</li>
													))}
												</ul>
											</div>
										</div>
									) : (
										<FeatureCard
											feature={{
												title: capability.title,
												desc: capability.desc,
												icon: capability.icon || (idx % 2 ? "tji-service-2" : "tji-award"),
											}}
											idx={idx}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.applications?.length ? (
				<section className="itanz-municipal-operations section-gap pt-0">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.applicationsKicker}
									</span>
									<h2 className="sec-title title-anim">
										{detail.applicationsHeading}
									</h2>
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{detail.applications.map((application, idx) => (
								<div key={application.title} className="col-xl-4 col-md-6">
									<div className="choose-box h6-choose-box h7-choose-box itanz-municipal-card right-swipe">
										<div className="choose-content">
											<span className="itanz-card-eyebrow">Use Case {idx + 1}</span>
											<div className="itanz-municipal-card-icon">
												<i className={applicationIcons[idx % applicationIcons.length]}></i>
											</div>
											<h3>{application.title}</h3>
											<p>{application.desc}</p>
											<ul>
												{application.items.map(item => (
													<li key={item}>{item}</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.outcomes?.length ? (
				<section className="itanz-outcomes-section section-gap pt-0">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{detail.outcomesKicker}
									</span>
									<h2 className="sec-title title-anim">
										{detail.outcomesHeading}
									</h2>
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{detail.outcomes.map((outcome, idx) => (
								<div key={outcome.title} className="col-xl-3 col-md-6">
									<div className="choose-box h6-choose-box itanz-outcome-card right-swipe">
										<div className="choose-content">
											<span>Outcome {idx + 1}</span>
											<h3>{outcome.title}</h3>
											<p>{outcome.desc}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.integrationAreas?.length ? (
				<section className="itanz-integration-section section-gap pt-0">
					<div className="container">
						<div className="itanz-integration-panel">
							<div className="row row-gap-4 align-items-center">
								<div className="col-lg-5">
									<div className="sec-heading mb-0">
										<span className="sub-title wow fadeInUp">
											<i className="tji-box"></i>Connected by Design
										</span>
										<h2 className="sec-title title-anim">
											{detail.integrationHeading}
										</h2>
										<p>{detail.integrationIntro}</p>
										<div className="itanz-contact-actions">
											<ButtonPrimary
												text="Discuss Your Integration Environment"
												url={contactUrl}
												isTextBtn={true}
											/>
										</div>
									</div>
								</div>
								<div className="col-lg-7">
									<div className="itanz-integration-grid">
										{detail.integrationAreas.map(item => (
											<span key={item}>{item}</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			{detail.methodology?.length ? (
				<section className="tj-working-process itanz-methodology-section section-gap section-gap-x">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading-wrap">
									<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
										Delivered with Municipal Discipline
									</span>
									<div className="heading-wrap-content">
										<div className="sec-heading style-2">
											<h2 className="sec-title text-anim">
												{detail.methodologyHeading}
											</h2>
										</div>
										<p className="desc wow fadeInUp" data-wow-delay=".5s">
											A practical path from fragmentation to integration, shaped around council workflows, data, governance and adoption.
										</p>
										<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
											<ButtonPrimary text="Book an ICP Consultation" url={contactUrl} />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="working-process-area">
									{detail.methodology.map((item, idx) => (
										<ProcessCard
											key={item.title}
											processSingle={{
												id: idx + 1,
												title: item.title,
												desc: item.desc,
											}}
											idx={idx}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="bg-shape-1">
						<img src="/images/shape/pattern-2.svg" alt="" />
					</div>
					<div className="bg-shape-2">
						<img src="/images/shape/pattern-3.svg" alt="" />
					</div>
				</section>
			) : (
				""
			)}

			{detail.supportAreas?.length ? (
				<section className="itanz-support-section section-gap pt-0">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="itanz-support-panel">
									<div className="sec-heading mb-0">
										<span className="sub-title wow fadeInUp">
											<i className="tji-box"></i>Beyond Implementation
										</span>
										<h2 className="sec-title title-anim">
											{detail.supportHeading}
										</h2>
										<p>{detail.supportIntro}</p>
										<ButtonPrimary
											text="Explore Managed ICP Support"
											url={contactUrl}
											className="btn-dark"
										/>
									</div>
									<div className="itanz-support-list">
										{detail.supportAreas.map(item => (
											<span key={item}>{item}</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				""
			)}

			<section className="tj-choose-section itanz-related-solutions-section section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Related Solutions
								</span>
								<h2 className="sec-title title-anim">
									Explore Connected Solution Pathways
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{relatedSolutions.map((solution, idx) => (
							<div key={solution.title} className="col-lg-4">
								<FeatureCard
									feature={{
										title: solution.title,
										desc: solution.desc,
										icon: solution.icon,
										url: solution.url,
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<ItanzCta
				title="Ready to turn this solution into a delivery pathway?"
				desc="Speak with iTANZ about the platforms, integrations and managed capability needed for your operating environment."
				buttonText={detail.primaryCta || "Book a Solution Consultation"}
				buttonUrl={contactUrl}
			/>
		</>
	);
};

export default ItanzSolutionDetailPage;
