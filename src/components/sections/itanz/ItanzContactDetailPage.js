import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import { contactDetailPages } from "./contactData";
import ItanzCta from "./ItanzCta";
import ItanzContactForm from "./ItanzContactForm";

const ItanzContactDetailPage = ({ page }) => {
	const detail = contactDetailPages[page];

	if (!detail) {
		return null;
	}

	return (
		<>
			<section className="itanz-contact-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h1 className="sec-title title-anim">{detail.title}</h1>
								<p>{detail.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary text={detail.cta} url="#itanz-contact-form" />
									<ButtonPrimary
										text="Back to Contact"
										url="/contact"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-contact-summary">
								<h3>Helpful Context</h3>
								<ul>
									{detail.prompts.map(prompt => (
										<li key={prompt}>{prompt}</li>
									))}
								</ul>
							</div> */}
						</div>
					</div>
				</div>
			</section>
			<section className="tj-contact-section-2 section-bottom-gap">
				<div className="container">
					<ItanzContactForm
						title={detail.kicker}
						buttonText={detail.cta}
						selectedIntent={detail.intent}
					/>
				</div>
			</section>

			<ItanzCta
				title="Need help choosing the right route?"
				desc="Use the main contact page if your enquiry needs a different team, region or response pathway."
				buttonText="View Contact Routes"
				buttonUrl="/contact"
			/>
		</>
	);
};

export default ItanzContactDetailPage;
