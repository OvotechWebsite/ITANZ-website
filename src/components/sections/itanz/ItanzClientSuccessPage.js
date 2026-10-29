import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzGlobalPresenceShowcase from "./ItanzGlobalPresenceShowcase";
import ItanzLeadership from "./ItanzLeadership";
import ItanzLifeAtItanzVideos from "./ItanzLifeAtItanzVideos";
import ItanzSuccessProofExplorer from "./ItanzSuccessProofExplorer";
import ItanzSuccessTestimonials from "./ItanzSuccessTestimonials";
import {
	behindSuccess,
	clientSuccessOverview,
	clientSuccessPhilosophy,
	customerLogos,
	finalSuccessCta,
	globalPresence,
	peopleCulture,
	productConnections,
	successProofPoints,
	successTestimonials,
	successValues,
	sustainabilitySection,
} from "./clientSuccessData";

const ItanzClientSuccessPage = () => {
	return (
		<>
			<section
				className="itanz-client-success-hero section-gap"
				style={{ "--itanz-client-success-hero-bg": `url(${clientSuccessOverview.heroBg})` }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Success Stories
								</span>
								<h1 className="sec-title title-anim">
									{clientSuccessOverview.title}
								</h1>
								<p>{clientSuccessOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={clientSuccessOverview.primaryCta}
										url="#success-proof"
									/>
									<ButtonPrimary
										text={clientSuccessOverview.secondaryCta}
										url="/contact/book-a-consultation?intent=consultation&source=%2Fsuccess-stories"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>Domain-Led Delivery</span>
								<span>Operational Continuity</span>
								<span>Accountable Outcomes</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="itanz-success-philosophy section-gap">
				<div className="container">
					<div className="itanz-success-philosophy-card sec-heading">
						<span className="sub-title mb-0">
							<i className="tji-box"></i>{clientSuccessPhilosophy.title}
						</span>
						<p>{clientSuccessPhilosophy.desc}</p>
					</div>
				</div>
			</section>

			<section className="itanz-success-values section-gap pt-0--">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Our Values
								</span>
								<h2 className="sec-title title-anim">
									Principles Behind Every Outcome
								</h2>
								<p>
									How we think shapes how we engineer. Our principles guide the way
									we understand complex environments, make decisions, work with
									clients and remain accountable beyond delivery.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-values-grid">
						{successValues.map(value => (
							<div key={value.title} className="itanz-value-card">
								<span>{value.number}</span>
								<h3>{value.title}</h3>
								<strong>{value.tagline}</strong>
								<p>{value.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				className="itanz-behind-success section-gap"
				style={{ "--itanz-behind-success-bg": `url(${behindSuccess.bg})` }}
			>
				<div className="container">
					<div className="row align-items-end row-gap-4">
						<div className="col-lg-7">
							<div className="sec-heading mb-0">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Behind Every Success Story
								</span>
								<h2 className="sec-title title-anim">{behindSuccess.title}</h2>
							</div>
						</div>
						<div className="col-lg-5">
							<p className="itanz-behind-success-desc">{behindSuccess.desc}</p>
						</div>
					</div>
					<div className="itanz-behind-success-steps">
						{behindSuccess.steps.map(step => (
							<div key={step.label}>
								<span>{step.label}</span>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="success-proof" className="tj-choose-section itanz-success-proof-strip section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>From Understanding to Operation
								</span>
								<h2 className="sec-title title-anim">
									Where Understanding Became Execution
								</h2>
							</div>
						</div>
					</div>
					<ItanzSuccessProofExplorer proofPoints={successProofPoints} />
				</div>
			</section>

			<section className="itanz-sustainability-section section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-6">
							<div className="sec-heading mb-0">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Sustainability
								</span>
								<h2 className="sec-title title-anim">{sustainabilitySection.title}</h2>
								<p>{sustainabilitySection.desc}</p>
								<div className="itanz-sustainability-note">
									{sustainabilitySection.closing}
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="itanz-sustainability-img">
								<img
									src={sustainabilitySection.img}
									alt="iTANZ ESG sustainability and responsible progress visual"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzLeadership />

			<section className="itanz-customer-credibility-section-gap">
				<div className="container-fluid px-0">
					<div className="itanz-customer-credibility-full">
						<div className="container">
							<div className="row">
								<div className="col-lg-8">
									<div className="sec-heading mb-0">
										<span className="sub-title">
											<i className="tji-box"></i>Customer Credibility
										</span>
										<h2 className="sec-title title-anim">
											Trusted Where Operations Matter
										</h2>
										<p>
											iTANZ has worked across public services, utilities, healthcare,
											financial services and enterprise environments. Customer logos
											are used as approved references without attaching unverified
											solution claims or performance results.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="itanz-client-logo-marquee">
							{customerLogos.map(logo => (
								<div key={logo.name} className="itanz-client-logo-card">
									<img src={logo.img} alt={`${logo.name} logo`} />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section itanz-product-connection section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Product Connection
								</span>
								<h2 className="sec-title title-anim">
									Products Built from the Industries We Understand
								</h2>
								<p className="itanz-product-connection-lead">
									Our success is not separated from our product strategy. It informs it.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-product-connection-wrap mt-0">
						{productConnections.map(product => (
							<div key={product.title} className="itanz-product-tile">
								<div className="d-flex flex-column justify-content-between h-100">
									<div>
										<div className="itanz-product-tile-icon">
											<i className={product.icon}></i>
										</div>
										<h3>{product.title}</h3>
										<p>{product.desc}</p>
									</div>
									<div>
										<ButtonPrimary text="Read More" url={product.url} isTextBtn={false} />
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="text-center mt-5">
						<ButtonPrimary text="Explore Products & Solutions" url="/solutions" />
					</div>
				</div>
			</section>

			<ItanzSuccessTestimonials testimonials={successTestimonials} />

			<section className="itanz-people-culture-section section-gap">
				<div className="container-fluid px-0">
					<div className="itanz-people-culture-img">
						<img src={peopleCulture.img} alt="iTANZ - Real Progress is Best Reflected by the People Who Make it Happen" />
						<div className="itanz-people-culture-heading sec-heading text-center">
							{/* <span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>People & Culture
							</span> */}
							<h2 className="">{peopleCulture.title}</h2>
						</div>
					</div>
				</div>
			</section>

			<ItanzLifeAtItanzVideos />

			<ItanzGlobalPresenceShowcase presence={globalPresence} />

			<section
				className="itanz-final-success-cta section-gap"
				style={{ "--itanz-final-cta-bg": `url(${finalSuccessCta.bg})` }}
			>
				<div className="container">
					<div className="itanz-final-success-cta-inner">
						<h2>{finalSuccessCta.title}</h2>
						<p>{finalSuccessCta.desc}</p>
						<div className="itanz-contact-actions justify-content-center">
							<ButtonPrimary
								text={finalSuccessCta.primaryCta}
								url="/contact/book-a-consultation?intent=consultation&source=%2Fsuccess-stories"
								className="btn-dark"
							/>
							<ButtonPrimary
								text={finalSuccessCta.secondaryCta}
								url="/solutions"
								className="btn-dark"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzClientSuccessPage;
