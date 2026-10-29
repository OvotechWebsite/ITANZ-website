import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";
import ItanzCta from "./ItanzCta";
import { caseStudies } from "./caseStudyData";

const ItanzCaseStudyDetailPage = ({ study, studies = caseStudies }) => {
	const currentIndex = studies.findIndex(item => item.slug === study.slug);
	const prevStudy = currentIndex > 0 ? studies[currentIndex - 1] : null;
	const nextStudy =
		currentIndex > -1 && currentIndex < studies.length - 1
			? studies[currentIndex + 1]
			: null;

	return (
		<>
			<section
				className="itanz-case-study-detail-hero section-gap"
				style={{ "--itanz-case-study-hero-bg": `url(${study.bannerImage})` }}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							{/* <Link className="itanz-article-back" href="/case-studies">
								<i className="tji-arrow-left"></i> Back to Case Studies
							</Link>
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Case {String(study.id).padStart(2, "0")} - {study.category}
							</span> */}
							<nav className="itanz-case-study-breadcrumb" aria-label="Breadcrumb">
								<Link href="/">Home</Link>
								<i className="tji-arrow-right"></i>
								<Link href="/case-studies">Case Studies</Link>
								<i className="tji-arrow-right"></i>
								<span>Case {String(study.id).padStart(2, "0")}</span>
							</nav>
							<h1 className="sec-title title-anim">{study.title}</h1>
							<p>{study.subtitle}</p>
							{/* <div className="itanz-article-meta">
								<span>{study.evidence}</span>
								<span>{study.sector}</span>
								<span>{study.primaryCategory}</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-blog-section itanz-case-study-detail section-gap">
				<div className="container">
					<div className="row row-gap-5">
						<div className="col-lg-8">
							<div className="post-details-wrapper itanz-case-study-wrapper">
								<div className="blog-text">
									<div className="itanz-case-study-section">
										<h3>The Problem</h3>
										<p>{study.problemLead}</p>
										<ul>
											{study.problem.map(item => (
												<li key={item}>
													<span><i className="tji-check"></i></span>
													{item}
												</li>
											))}
										</ul>
									</div>

									<div className="itanz-case-study-section">
										<h3>The Solution</h3>
										<p>{study.solutionLead}</p>
										<ul>
											{study.solution.map(item => (
												<li key={item}>
													<span><i className="tji-check"></i></span>
													{item}
												</li>
											))}
										</ul>
									</div>

									<div className="itanz-case-study-tech sec-heading max-w-100">
										<span className="sub-title">
											<i className="tji-box"></i>Technologies Used
										</span>
										<p>{study.technologies}</p>
									</div>

									<div className="itanz-case-study-section">
										<h3>{study.impactLabel}</h3>
										<div className="itanz-case-impact-grid">
											{study.impacts.map(([title, desc]) => (
												<div key={title}>
													<strong>{title}</strong>
													<p>{desc}</p>
												</div>
											))}
										</div>
									</div>

									<div className="itanz-case-study-section">
										<h3>The Conclusion</h3>
										<p>{study.conclusion}</p>
										<p className="itanz-case-study-source">{study.source}</p>
									</div>
								</div>

								<div className="tj-tags-post wow fadeInUp" data-wow-delay=".3s">
									<div className="tagcloud">
										<span>Maps to:</span>
										{study.alsoMapsTo.split(",").map(tag => (
											<Link key={tag.trim()} href="/case-studies">
												{tag.trim()}
											</Link>
										))}
									</div>
								</div>

								<div className="tj-post__navigation wow fadeInUp" data-wow-delay="0.3s">
									<div className="tj-nav__post previous" style={{ visibility: prevStudy ? "visible" : "hidden" }}>
										<div className="tj-nav-post__nav prev_post">
											<Link href={prevStudy ? `/case-studies/${prevStudy.slug}` : "#"}>
												<span><i className="tji-arrow-left"></i></span>
												Previous
											</Link>
										</div>
									</div>
									<Link href="/case-studies" className="tj-nav-post__grid">
										<i className="tji-window"></i>
									</Link>
									<div className="tj-nav__post next" style={{ visibility: nextStudy ? "visible" : "hidden" }}>
										<div className="tj-nav-post__nav next_post">
											<Link href={nextStudy ? `/case-studies/${nextStudy.slug}` : "#"}>
												Next
												<span><i className="tji-arrow-right"></i></span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<aside className="itanz-case-study-sidebar">
								<div className="itanz-case-study-sidebar-summary">
									<span>Case Overview</span>
									<p>{study.intro}</p>
								</div>
								<div>
									<span>Evidence Type</span>
									<strong>{study.evidence}</strong>
								</div>
								<div>
									<span>Sector</span>
									<strong>{study.sector}</strong>
								</div>
								<div>
									<span>Products / Platforms</span>
									<strong>{study.platforms}</strong>
								</div>
								
								{/* <ButtonPrimary
									text="Discuss similar work"
									url={`/contact/book-a-consultation?intent=consultation&solution=${encodeURIComponent(study.primaryCategory)}&source=%2Fcase-studies%2F${study.slug}`}
								/> */}
								
							</aside>
						</div>
					</div>
				</div>
			</section>

			<ItanzCta
				title="Need a similar outcome?"
				desc="Start with the operating reality. iTANZ can help map the friction, choose the right platform path and engineer the next step."
				buttonText="Talk to iTANZ"
				buttonUrl={`/contact/book-a-consultation?intent=consultation&solution=${encodeURIComponent(study.primaryCategory)}&source=%2Fcase-studies%2F${study.slug}`}
			/>
		</>
	);
};

export default ItanzCaseStudyDetailPage;
