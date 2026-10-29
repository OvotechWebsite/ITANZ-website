import BrandSlider1 from "@/components/shared/brands/BrandSlider1";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import ServiceCard5 from "@/components/shared/cards/ServiceCard5";
import {
	platformSpotlight,
	solutionsCards,
	solutionsOverview,
} from "./solutionData";

const ItanzSolutionsPage = () => {
	const lastItemIdx = solutionsCards.length - 1;

	return (
		<>
			<section className="itanz-solutions-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Solutions
								</span>
								<h1 className="sec-title title-anim">{solutionsOverview.title}</h1>
								<p>{solutionsOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={solutionsOverview.primaryCta}
										url="/contact/book-a-consultation"
									/>
									<ButtonPrimary
										text={solutionsOverview.secondaryCta}
										url="#platforms"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>Platform Expertise</span>
								<span>Integration Capability</span>
								<span>Managed Delivery</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section
				id="platforms"
				className="tj-service-section-5 itanz-solutions-stack section-gap"
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="sec-heading style-4 text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Our Solutions
								</span>
								<h2 className="sec-title title-anim">
									Platform-Led Services Built for Enterprise Value
								</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="service-wrapper">
								{solutionsCards.map((service, idx) => (
									<ServiceCard5
										key={service.title}
										service={{ ...service, buttonText: "Explore Platform" }}
										idx={idx}
										lastItemIdx={lastItemIdx}
									/>
								))}
							</div>
							<div className="service-bottom-text">
								<p className="desc">
									<span>
										<i className="tji-box"></i>Need the right starting point?{" "}
										<a href="/contact/book-a-consultation">
											Book a solution consultation
										</a>
									</span>
								</p>
							</div>
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
									<i className="tji-box"></i>Platform Spotlight
								</span>
								<h2 className="sec-title title-anim">
									Connected Pathways Across Platforms, Data and Delivery
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{platformSpotlight.map((feature, idx) => (
							<div key={feature.title} className="col-lg-4">
								<FeatureCard feature={feature} idx={idx} />
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="tj-client-section client-section-gap itanz-template-brands wow fadeInUp">
				<div className="container-fluid client-container">
					<div className="row">
						<div className="col-12">
							<div className="client-content">
								<h5 className="sec-title">
									Recognised platform pathways connected through{" "}
									<span className="client-text">iTANZ</span> expertise.
								</h5>
							</div>
							<BrandSlider1 />
						</div>
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
										Ready to map the right solution pathway?
									</h2>
									<div className="cta-btn wow fadeInUp">
										<ButtonPrimary
											text="Book a Solution Consultation"
											url="/contact/book-a-consultation"
											className="btn-dark"
										/>
									</div>
								</div>
								<div className="cta-img">
									<img src="/images/hero/slider-2.webp" alt="Enterprise solution consultation visual" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzSolutionsPage;
