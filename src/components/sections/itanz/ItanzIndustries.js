import FeatureCard from "@/components/shared/cards/FeatureCard";
import { industries } from "./data";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const ItanzIndustries = () => {
	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Industries We Serve
							</span>
							<h2 className="sec-title title-anim">
								Sector-Focused Solutions for Mission-Critical{" "}
								<span>Environments</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{industries.map((industry, idx) => (
						<div key={industry.title} className="col-lg-4 col-md-6">
							<FeatureCard feature={industry} idx={idx} />
						</div>
					))}
				</div>
				<div className="text-center mt-5">

					<ButtonPrimary url="/industries" text="View All Industries" />
				</div>
			</div>
		</section>
	);
};

export default ItanzIndustries;
