import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import {
	industriesOverview,
	industryCards,
	industryMomentum,
} from "./industryData";

const ItanzIndustriesPage = () => {
	return (
		<>
			<section
				className="itanz-industries-hero section-gap"
				style={{ "--itanz-industries-hero-bg": `url(${industriesOverview.heroBg})` }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Industries
								</span>
								<h1 className="sec-title title-anim">{industriesOverview.title}</h1>
								<p>{industriesOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={industriesOverview.primaryCta}
										url="#industry-solutions"
									/>
									<ButtonPrimary
										text={industriesOverview.secondaryCta}
										url="/contact/book-a-consultation?intent=consultation&source=%2Findustries"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>Critical Sectors</span>
								<span>Connected Platforms</span>
								<span>Managed Capability</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Sector Momentum Hub
								</span>
								<h2 className="sec-title title-anim">
									The Intelligent Layer Connecting Platforms, Data and Operations
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{industryMomentum.map((feature, idx) => (
							<div key={feature.title} className="col-lg-4">
								<FeatureCard feature={feature} idx={idx} />
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="industry-solutions" className="tj-choose-section section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Industry Solutions
								</span>
								<h2 className="sec-title title-anim">
									Sector-Focused Technology for Critical Operating Environments
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{industryCards.map((industry, idx) => (
							<div key={industry.title} className="col-xl-4 col-md-6">
								<FeatureCard feature={industry} idx={idx} />
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="tj-cta-section">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="cta-area">
								<div className="cta-content">
									<h2 className="title title-anim">
										Speak with iTANZ about your sector priorities
									</h2>
									<div className="cta-btn wow fadeInUp">
										<ButtonPrimary
											text="Speak to a Sector Specialist"
											url="/contact/book-a-consultation?intent=consultation&source=%2Findustries"
											className="btn-dark"
										/>
									</div>
								</div>
								<div className="cta-img">
									<img src="/images/hero/slider-3.webp" alt="Industry technology consultation visual" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzIndustriesPage;
