import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzCta from "./ItanzCta";
import ItanzGovernanceDirectory from "./ItanzGovernanceDirectory";
import ItanzInvestorNoticesSection from "./ItanzInvestorNoticesSection";
import ItanzInvestorProfileSection from "./ItanzInvestorProfileSection";
import ItanzInvestorSustainabilitySection from "./ItanzInvestorSustainabilitySection";
import ItanzStockQuote from "./ItanzStockQuote";

const ItanzInvestorRelationsPage = () => {
	return (
		<>
			<section className="itanz-investor-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-7">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Investor Relations
								</span>
								<h1 className="sec-title title-anim">
									Transparency That Builds Confidence
								</h1>
								<p>
									Access official disclosures, governance updates and investor information—or connect directly with iTANZ’s designated Investor Relations team.
								</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary text="View Governance" url="#governance-directory" />
									<ButtonPrimary text="General Enquiries" url="/contact" isTextBtn={true} />
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<ItanzStockQuote />
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section itanz-investor-routes section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center itanz-investor-purpose">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Our Purpose
								</span>
								<h2 className="sec-title title-anim">
									Built on technology. <br/>
									<span> Measured by lasting value.</span>
								</h2>
								<p>
									iTANZ combines enterprise technology expertise, disciplined
									growth and transparent governance to create enduring value for
									shareholders, customers, people and the markets we serve.
								</p>
								<div className="itanz-investor-value-line">
									<span>Enterprise Resilience</span>
									<span>Responsible Growth</span>
									<span>Transparent Governance</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzGovernanceDirectory />

			<ItanzInvestorProfileSection />

			<ItanzInvestorSustainabilitySection />

			<ItanzInvestorNoticesSection />

			<ItanzCta
				title="Have an investor or corporate enquiry for iTANZ?"
				desc="Send a concise message and the iTANZ team will route it through the appropriate approved contact pathway."
				buttonText="Send Investor Enquiry"
				buttonUrl="/contact/investor-enquiries?intent=investor&source=%2Finvestor-relations"
			/>
		</>
	);
};

export default ItanzInvestorRelationsPage;
