import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import TeamCard from "@/components/shared/cards/TeamCard";
import ItanzCta from "./ItanzCta";
import ItanzCertificationsCompliancePage from "./ItanzCertificationsCompliancePage";
import { leadershipMembers } from "./data";
import { companyOverview, companyPages } from "./companyData";

const ItanzCompanyDetailPage = ({ page }) => {
	const detail = companyPages[page];

	if (!detail) {
		return null;
	}

	if (page === "certifications-compliance") {
		return <ItanzCertificationsCompliancePage detail={detail} />;
	}

	const heroBg = detail.heroBg || companyOverview.heroBg || "/images/bg/map.svg";

	return (
		<>
			<section
				className="itanz-company-hero section-gap"
				style={{ "--itanz-company-hero-bg": `url(${heroBg})` }}
			>
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
									<ButtonPrimary
										text={detail.primaryCta}
										url="/contact/book-a-consultation"
									/>
									<ButtonPrimary
										text={detail.secondaryCta}
										url="/solutions"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>{detail.kicker}</span>
								<span>Enterprise Technology</span>
								<span>Client Outcome Focus</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			{page === "leadership" ? (
				<section className="tj-team-section itanz-leadership-section section-gap">
					<div className="container">
						<div className="row leftSwipeWrap">
							{leadershipMembers?.map(member => (
								<div key={member.id} className="col-lg-3 col-sm-6">
									<TeamCard
										teamMember={member}
										showDefaultSocials={false}
										showDefaultEmail={false}
										linkProfile={false}
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				""
			)}

			<section className="tj-choose-section section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h2 className="sec-title title-anim">
									{detail.sectionTitle || "Understanding Engineered for Impact."}
								</h2>
								{detail.sectionIntro ? <p className="mt-3">{detail.sectionIntro}</p> : ""}
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{detail.sections.map((section, idx) => (
							<div key={section.title} className="col-lg-4 col-md-6">
								<FeatureCard
									feature={{
										title: section.title,
										desc: section.desc,
										icon: idx % 2 ? "tji-service-2" : "tji-award",
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<ItanzCta
				title="Ready to continue the conversation with iTANZ?"
				desc="Connect with the team to discuss your organisation, operating priorities and next transformation move."
				buttonText={detail.primaryCta}
				buttonUrl="/contact/book-a-consultation"
			/>
		</>
	);
};

export default ItanzCompanyDetailPage;
