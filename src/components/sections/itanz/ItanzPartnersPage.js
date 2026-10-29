import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import Link from "next/link";
import {
	coInnovationSteps,
	partnerCategories,
	partnerLogos,
	partnerProofStats,
	partnersOverview,
} from "./partnersData";

const ItanzPartnersPage = () => {
	return (
		<>
			<section className="itanz-partners-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-7">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Partners
								</span>
								<h1 className="sec-title title-anim">{partnersOverview.title}</h1>
								<p>{partnersOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={partnersOverview.primaryCta}
										url="/contact?type=partner&source=%2Fpartners"
									/>
									<ButtonPrimary
										text={partnersOverview.secondaryCta}
										url="/partners/partner-program"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="itanz-partner-orbit">
								<div className="itanz-partner-orbit-core">
									<img src="/images/logos/logo.webp" alt="iTANZ" />
									{/* <span>Alliance Ecosystem</span> */}
								</div>
								{partnerLogos.slice(0, 8).map((partner, idx) => (
									<span key={partner.name} className={`itanz-partner-node node-${idx + 1}`}>
										<img src={partner.img} alt={partner.name} />
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="itanz-partner-proof section-gap">
				<div className="container">
					<div className="itanz-partner-proof-grid">
						{partnerProofStats.map(stat => (
							<div key={stat.text}>
								<strong>
									{stat.value}
									{stat.symbol}
								</strong>
								<span>{stat.text}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-partner-logos section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Technology Partners
								</span>
								<h2 className="sec-title title-anim">
									Approved Logos Can Sit Inside a Clear Enterprise Ecosystem
								</h2>
							</div>
						</div>
					</div>
					<div className="itanz-partner-logo-grid">
						{partnerLogos.map(partner => (
							<div key={partner.name} className="itanz-partner-logo-card">
								<img src={partner.img} alt={partner.name} />
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="tj-choose-section itanz-partner-categories section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Partner Categories
								</span>
								<h2 className="sec-title title-anim">
									Capability Pathways Across Platforms, Data, Cloud and IP
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{partnerCategories.map((category, idx) => (
							<div key={category.slug} className="col-xl-3 col-md-6">
								<FeatureCard
									feature={{
										title: category.title,
										desc: category.desc,
										icon: category.icon,
										url: `/partners/partner-categories`,
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-partner-process section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Co-Innovation
								</span>
								<h2 className="sec-title title-anim">Co-Innovation. Co-Create. Co-Succeed</h2>
								<p>
									Our partner engagement model is built to deliver joint value at every stage.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-partner-process-grid">
						{coInnovationSteps.map((step, idx) => (
							<div key={step.title} className="itanz-partner-process-card">
								<span>{idx + 1}</span>
								<i className={step.icon}></i>
								<strong>{step.title}</strong>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-partner-program section-gap pt-0">
				<div className="container">
					<div className="itanz-partner-program-grid">
						<div className="itanz-partner-program-copy">
							<span className="sub-title">
								<i className="tji-box"></i>Partner with iTANZ
							</span>
							<h2>Multiple Ways to Collaborate. One Goal: Shared Success</h2>
							<p>
								Technology vendors, solution specialists, referral partners, implementation teams
								and strategic alliances can start a qualified partnership conversation with iTANZ.
							</p>
							<ul>
								<li>Technology partnerships and approved platform pathways</li>
								<li>Joint solution development and go-to-market opportunities</li>
								<li>Reusable accelerators, templates and delivery assets</li>
							</ul>
							<ButtonPrimary text="Become a Partner" url="/partners/partner-program" />
						</div>
						<div className="itanz-partner-program-links">
							{[
								["Technology Partners", "/partners/technology-partners"],
								["Solution Partners", "/partners/solution-partners"],
								["Referral Partners", "/partners/referral-partners"],
								["Implementation Partners", "/partners/implementation-partners"],
								["Strategic Alliances", "/partners/strategic-alliances"],
								["Partner Resources", "/partners/resources"],
							].map(([title, url]) => (
								<Link key={title} href={url}>
									{title}
									<i className="tji-arrow-right-long"></i>
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-cta-section">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="cta-area">
								<div className="cta-content">
									<h2 className="title title-anim">
										Let&apos;s build what&apos;s next, together
									</h2>
									<div className="cta-btn wow fadeInUp">
										<ButtonPrimary
											text="Talk to Alliances"
											url="/contact?type=partner&source=%2Fpartners"
											className="btn-dark"
										/>
									</div>
								</div>
								<div className="cta-img">
									<img src="/images/hero/slider-2.webp" alt="Connected enterprise technology ecosystem" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzPartnersPage;
