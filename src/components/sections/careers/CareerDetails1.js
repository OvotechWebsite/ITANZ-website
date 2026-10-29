import getCareers from "@/libs/getCareers";
import Link from "next/link";
import ItanzTalentNetworkModal from "../itanz/ItanzTalentNetworkModal";

const CareerDetails1 = ({ currentItem }) => {
	const items = getCareers();
	const currentIndex = items.findIndex(item => item.id === currentItem?.id);
	const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
	const nextItem =
		currentIndex > -1 && currentIndex < items.length - 1
			? items[currentIndex + 1]
			: null;
	const {
		title,
		iconName,
		category,
		need,
		location,
		workModel,
		level,
		summary,
		responsibilities = [],
		requirements = [],
		tags = [],
	} = currentItem || {};

	return (
		<section className="tj-careers-details section-gap">
			<div className="container">
				<div className="row rg-50">
					<div className="col-lg-8">
						<div className="tj-post-wrapper">
							<div className="tj-post-single-post bg-white">
								{/* <!-- top content --> */}
								<div className="tj-careers-top mb-30 ">
									<div className="tj-careers-top-icon">
										<i className={iconName ? iconName : "tji-manage"}></i>
									</div>
									<div className="tj-careers-top-content">
										<div className="tj-careers-tag">
											<span>{category}</span> <span>{need}</span>
										</div>
										<h3 className="tj-careers-top-title text-anim">{title}</h3>
										<span className="location">
											<i className="tji-location"></i>
											{location}
										</span>
									</div>
								</div>
								{/* <!-- content --> */}
								<div className="tj-entry-content">
									<h4>Role Overview</h4>
									<p>
										{summary}
									</p>
									<div className="tj-check-list">
										<h4>What You&apos;ll Help Deliver</h4>
										<p>
											You&apos;ll contribute to practical enterprise transformation
											work where platforms, integrations, data and support
											capability need to perform reliably.
										</p>
										<ul>
											{responsibilities.map(item => (
												<li key={item}>
													<span>
														<i className="tji-check"></i>
													</span>{" "}
													{item}
												</li>
											))}
										</ul>
									</div>
									<div className="tj-check-list">
										<h4 className="mt-4">What You&apos;ll Bring</h4>
										<p>
											We look for people who combine technical or functional
											capability with ownership, communication and a delivery
											mindset.
										</p>
									</div>
									<div className="team-details__experience__list service-check-list mt-4 mb-4">
										<ul>
											{requirements.map(item => (
												<li key={item}>
													<i className="tji-check"></i>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
									<div className="itanz-career-detail-note">
										<h4>Good Fit If</h4>
										<p>
											You enjoy solving real business problems, working with
											cross-functional teams and improving systems that organisations
											depend on every day.
										</p>
									</div>
								</div>
								{/* <!-- post tag and share --> */}
								<div className="tj-tags-post tj-post-details_tags_share">
									<div className="tagcloud">
										<span>Tags:</span>
										{tags.map(tag => (
											<Link key={tag} href="/careers">
												{tag}
											</Link>
										))}
									</div>
								</div>
							</div>

							{/* <!-- post navigation --> */}
							<div
								className="tj-post__navigation mb-0"
							>
								{/* <!-- previous post --> */}
								<div
									className="tj-nav__post previous"
									style={{ visibility: prevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={prevItem ? `/careers/${prevItem.slug || prevItem.id}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/careers"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								{/* <!-- next post --> */}
								<div
									className="tj-nav__post next"
									style={{ visibility: nextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={nextItem ? `/careers/${nextItem.slug || nextItem.id}` : "#"}>
											Next
											<span>
												<i className="tji-arrow-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="tj-blog-sidebar">
							{/* <!-- Job information  --> */}
							<div
								className="tj-sidebar-widget"
							>
								<h4 className="widget-title">Job Information</h4>
								<div className="project_catagory">
									<ul>
										<li>
											<span className="first-child">Category</span>
											<span>{category}</span>
										</li>
										<li>
											<span className="first-child">Level</span>
											<span>{level}</span>
										</li>
										<li>
											<span className="first-child">Company</span>
											<span>iTANZ</span>
										</li>
										<li>
											<span className="first-child">Website</span>
											<span>itanzgroup.com</span>
										</li>
										<li>
											<span className="first-child">Work Model</span>
											<span>{workModel}</span>
										</li>
										<li>
											<span className="first-child">Vacancy</span>
											<span>{need}</span>
										</li>
										<li>
											<span className="first-child">Status</span>
											<span>{need}</span>
										</li>
									</ul>
								</div>
							</div>
							<div
								className="tj-sidebar-widget"
							>
								<h4 className="widget-title">Apply or Submit Profile</h4>
								<p>
									Share your profile with iTANZ for this role or future
									opportunities across technology, platforms, data and delivery.
								</p>
								<ItanzTalentNetworkModal
									buttonText="Apply / Submit Profile"
									roleTitle={title}
								/>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareerDetails1;
