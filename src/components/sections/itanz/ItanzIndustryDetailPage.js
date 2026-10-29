import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import ItanzCta from "./ItanzCta";
import { industryCards, industryPages } from "./industryData";

const ItanzIndustryDetailPage = ({ page }) => {
	const detail = industryPages[page];

	if (!detail) {
		return null;
	}

	const source = `/industries/${page}`;
	const contactUrl = `/contact/book-a-consultation?industry=${detail.industry}&intent=consultation&source=${encodeURIComponent(source)}`;
	const relatedIndustries = industryCards
		.filter(industry => !industry.url.endsWith(`/${page}`))
		.slice(0, 3);

	return (
		<>
			<section
				className="itanz-industries-hero section-gap"
				style={{ "--itanz-industries-hero-bg": `url(${detail.heroBg})` }}
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
									<ButtonPrimary text="Explore Industry Solutions" url="/industries" />
									<ButtonPrimary
										text="Speak to a Sector Specialist"
										url={contactUrl}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>{detail.kicker}</span>
								<span>Relevant Platforms</span>
								<span>Practical Use Cases</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.kicker}
								</span>
								<h2 className="sec-title title-anim">
									Challenges, Solutions and Use Cases
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{detail.sections.map(([title, desc], idx) => (
							<div key={title} className="col-lg-4">
								<FeatureCard
									feature={{
										title,
										desc,
										icon: idx % 2 ? "tji-service-2" : "tji-award",
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-industry-focus section-gap pt-0">
				<div className="container">
					<div className="row row-gap-4">
						<div className="col-lg-6">
							<div className="itanz-industry-panel">
								<h3>Relevant Solutions</h3>
								<ul>
									{detail.solutions.map(solution => (
										<li key={solution}>{solution}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="itanz-industry-panel">
								<h3>Practical Use Cases</h3>
								<ul>
									{detail.useCases.map(useCase => (
										<li key={useCase}>{useCase}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Related Industries
								</span>
								<h2 className="sec-title title-anim">
									Explore More Critical Sector Pathways
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{relatedIndustries.map((industry, idx) => (
							<div key={industry.title} className="col-lg-4">
								<FeatureCard feature={industry} idx={idx} />
							</div>
						))}
					</div>
				</div>
			</section>

			<ItanzCta
				title="Ready to modernise critical sector operations?"
				desc="Talk to iTANZ about the systems, data and service continuity priorities shaping your industry."
				buttonText="Speak to a Sector Specialist"
				buttonUrl={contactUrl}
			/>
		</>
	);
};

export default ItanzIndustryDetailPage;
