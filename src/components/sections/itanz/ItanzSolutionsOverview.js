import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ServiceCard2 from "@/components/shared/cards/ServiceCard2";
import { solutionAreaCards } from "./data";

const ItanzSolutionsOverview = () => {
	return (
		<section className="tj-service-section service-2 section-gap section-gap-x slidebar-stickiy-container">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="content-wrap slidebar-stickiy">
							<div className="sec-heading style-2">
								<span className="sub-title wow fadeInUp">Our Solutions</span>
								<h2 className="sec-title text-white text-anim">
									Direct Routes to Business Value Across Platforms, Data and{" "}
									<span>Capability</span>
								</h2>
							</div>
							<div className="wow fadeInUp">
								<ButtonPrimary text="All Solutions" url="/solutions" />
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="service-wrapper-2">
							{solutionAreaCards.map((service, idx) => (
								<ServiceCard2 key={service.title} service={service} idx={idx} />
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
			<div className="bg-shape-3">
				<img src="/images/shape/shape-blur.svg" alt="" />
			</div>
		</section>
	);
};

export default ItanzSolutionsOverview;
