import Link from "next/link";

const PortfolioCard2 = ({ portfolio }) => {
	const {
		title = "Event Management Platform",
		img2 = "/images/project/project-1.webp",
		shortDesc,
		id,
		dataFilter,
		category = "Connect",
		url,
	} = portfolio ? portfolio : {};
	const portfolioUrl = url || `/portfolios/${id}`;
	return (
		<div className="project-item">
			<div
				className="project-img"
				style={{ backgroundImage: `url(${img2})` }}
			></div>
			<div className="project-content">
				<span className="categories">
					<Link href={portfolioUrl}>{category}</Link>
				</span>
				<div className="project-text">
					<h3 className="title">
						<Link href={portfolioUrl}>{title}</Link>
					</h3>
					<Link className="project-btn" href={portfolioUrl}>
						<i className="tji-arrow-right-big"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PortfolioCard2;
