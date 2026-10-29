"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { caseStudies, caseStudyFilters } from "./caseStudyData";

const ItanzCaseStudyGrid = ({ studies = caseStudies }) => {
	const [activeFilter, setActiveFilter] = useState("all");
	const filteredCases = useMemo(
		() =>
			activeFilter === "all"
				? studies
				: studies.filter(item => item.filter === activeFilter),
		[activeFilter, studies]
	);

	return (
		<section id="case-study-grid" className="tj-blog-section itanz-case-study-grid-section section-gap">
			<div className="container">
				<div className="itanz-case-study-filter-bar">
					{caseStudyFilters.map(filter => (
						<button
							key={filter.value}
							type="button"
							className={activeFilter === filter.value ? "is-active" : ""}
							onClick={() => setActiveFilter(filter.value)}
						>
							{filter.label}
						</button>
					))}
				</div>

				<div className="row row-gap-4">
					{filteredCases.map((study, idx) => (
						<div key={study.slug} className="col-xl-4 col-md-6">
							<article className="blog-item itanz-case-study-card wow fadeInUp" data-wow-delay={`0.${idx + 1}s`}>
								<div className="blog-thumb">
									<Link href={`/case-studies/${study.slug}`}>
										{String(study.gridImage || "").startsWith("/") ? (
											<Image
												src={study.gridImage}
												alt={`${study.title} case study`}
												width={870}
												height={450}
											/>
										) : (
											<img src={study.gridImage} alt={`${study.title} case study`} />
										)}
									</Link>
									<div className="blog-date">
										<span className="date">{Number.isInteger(study.id) ? String(study.id).padStart(2, "0") : "CMS"}</span>
										<span className="month">Case</span>
									</div>
								</div>
								<div className="blog-content">
									<div className="blog-meta">
										<span className="categories">
											<a
												href="#case-study-grid"
												onClick={event => {
													event.preventDefault();
													setActiveFilter(study.filter);
												}}
											>
												{study.category}
											</a>
										</span>
										<span>{study.evidence}</span>
									</div>
									<h4 className="title">
										<Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
									</h4>
									<ButtonPrimary
										text="Read Case Study"
										url={`/case-studies/${study.slug}`}
										isTextBtn={true}
									/>
								</div>
							</article>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ItanzCaseStudyGrid;
