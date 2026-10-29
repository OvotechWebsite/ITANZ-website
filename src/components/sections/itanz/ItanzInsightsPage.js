import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import Link from "next/link";
import {
	featuredInsight,
	insightArticles,
	insightCategories,
	insightsOverview,
} from "./insightsData";

const ItanzInsightsPage = () => {
	return (
		<>
			<section className="itanz-insights-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Insights
								</span>
								<h1 className="sec-title title-anim">{insightsOverview.title}</h1>
								<p>{insightsOverview.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary text={insightsOverview.primaryCta} url="#insights-library" />
									<ButtonPrimary
										text={insightsOverview.secondaryCta}
										url="/contact?source=%2Finsights"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>Case Studies</span>
								<span>Blogs</span>
								<span>Newsroom</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="itanz-featured-insight section-gap">
				<div className="container">
					<div className="itanz-featured-insight-card">
						<div
							className="itanz-featured-insight-media"
							style={{ backgroundImage: `url(${featuredInsight.img})` }}
						></div>
						<div className="itanz-featured-insight-content">
							<span className="sub-title">
								<i className="tji-box"></i>{featuredInsight.category}
							</span>
							<h2>{featuredInsight.title}</h2>
							<p>{featuredInsight.desc}</p>
							<ButtonPrimary text="Read the Perspective" url={featuredInsight.url} />
						</div>
					</div>
				</div>
			</section>

			<section id="insights-library" className="tj-choose-section itanz-insights-library section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Content Categories
								</span>
								<h2 className="sec-title title-anim">
									Find the Insight Pathway That Matches Your Priority
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{insightCategories.map((category, idx) => (
							<div key={category.slug} className="col-lg-4 col-md-6">
								<FeatureCard
									feature={{
										title: category.title,
										desc: category.desc,
										icon: category.icon,
										url: category.slug === "case-studies" ? "/case-studies" : `/insights/${category.slug}`,
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-insight-articles section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Featured Reads
								</span>
								<h2 className="sec-title title-anim">
									Practical Technology Thinking for Enterprise Buyers
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{insightArticles.map(article => (
							<div key={article.title} className="col-lg-4">
								<Link className="itanz-insight-card" href={article.url}>
									<span
										className="itanz-insight-card-img"
										style={{ backgroundImage: `url(${article.img})` }}
									></span>
									<span className="itanz-insight-card-body">
										<span className="itanz-insight-card-kicker">{article.category}</span>
										<strong>{article.title}</strong>
										<span>{article.desc}</span>
										<em>{article.date} {article.readTime ? `- ${article.readTime}` : ""}</em>
									</span>
								</Link>
							</div>
						))}
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
										Need a perspective on your transformation priority?
									</h2>
									<div className="cta-btn wow fadeInUp">
										<ButtonPrimary
											text="Speak to iTANZ"
											url="/contact/book-a-consultation?intent=consultation&source=%2Finsights"
											className="btn-dark"
										/>
									</div>
								</div>
								<div className="cta-img">
									<img src="/images/solutions/netsuite.webp" alt="Enterprise platform insights visual" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ItanzInsightsPage;
