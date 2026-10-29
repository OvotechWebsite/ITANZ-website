import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import { reasons } from "./data";

const ItanzWhy = () => {
	return (
		<section className="tj-choose-section section-gap itanz-why-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading-wrap">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Why iTANZ
							</span>
							<div className="heading-wrap-content">
								<div className="sec-heading">
									<h2 className="sec-title title-anim">
										Transformation-First Thinking, Delivered with{" "}
										<span>Discipline</span>
									</h2>
								</div>
								<div className="btn-wrap wow fadeInUp">
									<ButtonPrimary
										text="Meet iTANZ"
										url="/company#about"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{reasons.map((reason, idx) => (
						<div key={reason.title} className="col-lg-4 col-md-6">
							<FeatureCard feature={reason} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ItanzWhy;
