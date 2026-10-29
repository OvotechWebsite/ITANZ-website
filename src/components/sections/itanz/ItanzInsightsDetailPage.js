import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import Link from "next/link";
import ItanzCta from "./ItanzCta";
import { insightCategories, insightPages } from "./insightsData";

const ItanzInsightsDetailPage = ({ page, detailOverride = {} }) => {
	const detail = { ...insightPages[page], ...detailOverride };
	const relatedCategories = insightCategories.filter(category => category.slug !== page).slice(0, 3);
	const isCaseStudies = page === "case-studies";
	const isNewsroom = page === "newsroom";

	if (!detail) {
		return null;
	}

	return (
		<>
			<section
				className="itanz-insights-hero section-gap"
				style={{ "--itanz-insights-hero-bg": `url(${detail.img})` }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-8">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{detail.title}
								</span>
								<h1 className="sec-title title-anim">{detail.title}</h1>
								<p>{detail.desc}</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text={detail.primaryCta}
										url={isCaseStudies ? "/success-stories" : "#insight-entries"}
									/>
									<ButtonPrimary
										text={detail.secondaryCta}
										url={`/contact?source=%2Finsights%2F${page}`}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-company-proof">
								<span>{detail.title}</span>
								<span>Enterprise Guidance</span>
								<span>Practical Resources</span>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			{isNewsroom ? (
				<section className="tj-choose-section section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>Newsroom Categories
									</span>
									<h2 className="sec-title title-anim">
										Corporate News, Press Releases and Events
									</h2>
								</div>
							</div>
						</div>
						<div className="row row-gap-4">
							{detail.categories.map(category => (
								<div key={category.slug} className="col-lg-4">
									<div className="itanz-newsroom-category-card">
										<span>{category.title}</span>
										<p>{category.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				<section className="tj-choose-section section-gap">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>{isCaseStudies ? "Client Success" : "Editorial Focus"}
									</span>
									<h2 className="sec-title title-anim">
										{isCaseStudies
											? "Proof-Led Transformation Stories"
											: "Practical Reads for Enterprise Buyers"}
									</h2>
								</div>
							</div>
						</div>
						<div className="row row-gap-4 rightSwipeWrap">
							{(isCaseStudies
								? [
									{
										title: "Success Stories",
										desc: "Browse client outcomes and case-study previews across transformation, platforms, data, integration and managed services.",
										icon: "tji-award",
										url: "/success-stories",
									},
									{
										title: "Outcomes",
										desc: "Explore the measurable business outcomes iTANZ supports across complex operating environments.",
										icon: "tji-chart",
										url: "/success-stories",
									},
									{
										title: "Sector Stories",
										desc: "View examples across government, utilities, healthcare, manufacturing, technology and financial services.",
										icon: "tji-user",
										url: "/success-stories",
									},
								]
								: [
									{
										title: "Transformation Strategy",
										desc: "Business-led guidance for planning digital modernisation, operating models and delivery value.",
										icon: "tji-innovative",
									},
									{
										title: "Cloud, Data and AI",
										desc: "Practical thinking on connected platforms, trusted data, analytics and AI-ready foundations.",
										icon: "tji-chart",
									},
									{
										title: "Integration and Managed Capability",
										desc: "Perspectives on system integration, automation and sustaining platforms after go-live.",
										icon: "tji-service-2",
									},
								]).map((topic, idx) => (
								<div key={topic.title} className="col-lg-4 col-md-6">
									<FeatureCard feature={topic} type={2} idx={idx} />
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			<section id="insight-entries" className="itanz-insight-articles section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>{isNewsroom ? "Corporate News" : "Latest Content"}
								</span>
								<h2 className="sec-title title-anim">
									{isNewsroom ? "Company Updates from iTANZ" : "Featured Reads and Resources"}
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{(detail.articles.length ? detail.articles : [
							{
								category: "Case Studies",
								title: "Explore iTANZ Client Success",
								desc: "Case-study cards are managed in the Success Stories area so approved outcomes stay consistent across the website.",
								date: "Client Success",
								readTime: "Success Stories",
								img: detail.img,
								url: "/success-stories",
							},
						]).map(article => (
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

			{isNewsroom && detail.pressReleases?.length ? (
				<section className="itanz-insight-articles section-gap pt-0">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sec-heading text-center">
									<span className="sub-title wow fadeInUp">
										<i className="tji-box"></i>Press Releases
									</span>
									<h2 className="sec-title title-anim">
										Updates That Shape What's Next
									</h2>
								</div>
							</div>
						</div>
						<div className="row row-gap-4">
							{detail.pressReleases.map(article => (
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
			) : (
				""
			)}

			<section className="tj-choose-section section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>More Insights
								</span>
								<h2 className="sec-title title-anim">
									Explore Related Thinking
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4 rightSwipeWrap">
						{relatedCategories.map((category, idx) => (
							<div key={category.slug} className="col-lg-4">
								<FeatureCard
									feature={{
										title: category.title,
										desc: category.desc,
										icon: category.icon,
										url: `/insights/${category.slug}`,
									}}
									idx={idx}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<ItanzCta
				title="Need a perspective on your transformation priority?"
				desc="Speak with iTANZ about the platform, data, AI or delivery questions behind your next decision."
				buttonText="Speak to iTANZ"
				buttonUrl={`/contact/book-a-consultation?intent=consultation&source=%2Finsights%2F${page}`}
			/>
		</>
	);
};

export default ItanzInsightsDetailPage;
