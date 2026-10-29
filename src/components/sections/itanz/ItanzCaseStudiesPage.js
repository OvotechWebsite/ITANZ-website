import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzCta from "./ItanzCta";
import ItanzCaseStudyGrid from "./ItanzCaseStudyGrid";
import { caseStudyOverview } from "./caseStudyData";

const ItanzCaseStudiesPage = ({ studies }) => {
	return (
		<>
			<section className="itanz-case-studies-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading mb-0">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Case Studies
								</span>
								<h1 className="sec-title title-anim">{caseStudyOverview.title}</h1>
								<p>{caseStudyOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary text="Explore Case Studies" url="#case-study-grid" />
									<ButtonPrimary
										text="Bring Us Your Challenge"
										url="/contact/book-a-consultation?intent=consultation&source=%2Fcase-studies"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>12 Case Patterns</span>
								<span>Evidence Guardrails</span>
								<span>Solution-Mapped Stories</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<ItanzCaseStudyGrid studies={studies} />

			<ItanzCta
				title="Want to build your next proof point?"
				desc="Talk to iTANZ about the operating challenge, platform pathway and measurable outcome behind your transformation priority."
				buttonText="Speak to an Expert"
				buttonUrl="/contact/book-a-consultation?intent=consultation&source=%2Fcase-studies"
			/>
		</>
	);
};

export default ItanzCaseStudiesPage;
