import { sustainabilitySection } from "./clientSuccessData";

const ItanzInvestorSustainabilitySection = () => {
	return (
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
	);
};

export default ItanzInvestorSustainabilitySection;
