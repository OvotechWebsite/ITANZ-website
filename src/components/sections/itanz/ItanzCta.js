import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzHashButton from "./ItanzHashButton";

const ItanzCta = ({
	title = "Ready to accelerate your digital future?",
	desc = "",
	buttonText = "Speak to an Expert",
	buttonUrl = "/contact/book-a-consultation",
	img = "/images/hero/slider-2.webp",
	imgAlt = "Enterprise technology transformation visual",
}) => {
	const hashTarget = buttonUrl?.startsWith("#") ? buttonUrl.slice(1) : "";

	return (
		<section className="tj-cta-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="cta-area">
							<div className="cta-content">
								<h2 className="title title-anim">
									{title}
								</h2>
								{desc ? <p className="itanz-cta-desc">{desc}</p> : ""}
								<div className="cta-btn wow fadeInUp">
									{hashTarget ? (
										<ItanzHashButton
											text={buttonText}
											targetId={hashTarget}
											className="btn-dark"
										/>
									) : (
										<ButtonPrimary
											text={buttonText}
											url={buttonUrl}
											className="btn-dark"
										/>
									)}
								</div>
							</div>
								<div className="cta-img">
									<img src={img} alt={imgAlt} />
								</div>
							</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzCta;
