import Link from "next/link";
import ItanzCta from "./ItanzCta";

const ItanzInsightArticlePage = ({ article, parentPath, parentLabel }) => {
	return (
		<>
			<section
				className="itanz-article-hero section-gap"
				style={{ "--itanz-article-hero-bg": `url(${article.banner || article.img})` }}
			>
				<div className="container">
					<div className="row">
						<div className="col-xl-9 col-lg-10">
							<Link className="itanz-article-back" href={parentPath}>
								{parentLabel}
							</Link>
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>{article.category}
							</span>
							<h1 className="sec-title title-anim">{article.title}</h1>
							<p>{article.desc}</p>
							<div className="itanz-article-meta">
								<span>{article.author}</span>
								<span>{article.date}</span>
								<span>{article.readTime}</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="itanz-article-detail section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-9 col-lg-10">
							{/* <div className="itanz-article-gallery">
								{article.gallery?.slice(0, 3).map((img, idx) => (
									<img
										key={img}
										src={img}
										alt={`${article.title} visual ${idx + 1}`}
									/>
								))}
							</div> */}
							<div className="itanz-article-body">
								{article.body.map((section, idx) => (
									<div key={section.heading || idx} className="itanz-article-section">
										{section.heading ? <h2>{section.heading}</h2> : ""}
										{section.content?.map(paragraph => (
											<p key={paragraph}>{paragraph}</p>
										))}
										{section.image ? (
											<figure className="itanz-article-inline-image">
												<img
													src={section.image}
													alt={section.alt || `${article.title} supporting visual`}
												/>
												{section.caption ? (
													<figcaption>{section.caption}</figcaption>
												) : (
													""
												)}
											</figure>
										) : (
											""
										)}
										{section.list ? (
											<ul>
												{section.list.map(item => (
													<li key={item}>{item}</li>
												))}
											</ul>
										) : (
											""
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzCta
				title="Need a perspective on your transformation priority?"
				desc="Talk to iTANZ about the platform, data, AI or delivery questions behind your next decision."
				buttonText="Speak to an Expert"
				buttonUrl={`/contact/book-a-consultation?intent=consultation&source=${encodeURIComponent(article.url)}`}
			/>
		</>
	);
};

export default ItanzInsightArticlePage;
