import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import { ipAcceleratorCards } from "./data";

const ItanzIPAccelerators = () => {
	return (
		<section className="tj-choose-section itanz-ip-accelerators section-gap">
			<div className="container">
				<div className="row align-items-end row-gap-4">
					<div className="col-lg-8">
						<div className="sec-heading mb-0">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>IP & Accelerators
							</span>
							<h2 className="sec-title title-anim">
								iTANZ IP and Delivery Models Built to Move Faster
							</h2>
						</div>
					</div>
					<div className="col-lg-4 text-lg-end">
						<div className="wow fadeInUp" data-wow-delay=".3s">
							<ButtonPrimary text="Explore IP & Accelerators" url="/solutions" />
						</div>
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{ipAcceleratorCards.map((card, idx) => (
						<div key={card.title} className="col-xl-3 col-md-6">
							<FeatureCard feature={card} type={2} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ItanzIPAccelerators;
