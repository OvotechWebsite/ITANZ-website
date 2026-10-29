import makeWowDelay from "@/libs/makeWowDelay";
import Link from "next/link";

const CareerCard = ({ careerSingle, idx }) => {
	const { title, iconName, price, location, duration, category, need, id, slug } =
		careerSingle || {};
	const careerUrl = `/careers/${slug || id}`;

	return (
		<div
			className="tj-careers wow fadeInUp"
			data-wow-delay={makeWowDelay(idx, 0.1)}
		>
			<div className="tj-careers-icon mb-30">
				<i className={iconName ? iconName : "tji-strategy"}></i>
			</div>
			<div className="tj-careers-tag">
				<span>{category}</span> <span>{need}</span>
			</div>
			<h4 className="tj-careers-title">
				<Link href={careerUrl}>{title}</Link>
			</h4>
			<div className="tj-careers-salary">
				<span>{price}</span> / {duration}
			</div>
			<div className="tj-careers-bottom">
				<span className="location">
					<i className="tji-location"></i>
					{location}
				</span>
				<Link href={careerUrl} className="tj-careers-btn">
					<div className="btn-text">
						<span>View role</span>
					</div>
					<span className="btn-icon">
						<i className="tji-arrow-right"></i>
						<i className="tji-arrow-right"></i>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default CareerCard;
