import Link from "next/link";

const ServiceCard2 = ({ service, idx, lastItem }) => {
	const { title, desc, id, iconName, list, url, buttonText } = service || {};
	const serviceUrl = url || `/services/${id}`;
	const shouldShowList = service?.showList !== false;
	const serviceList = list?.length
		? list
		: ["Expansion Strategies", "Operational Efficiency", "Competitive Edge"];

	return (
		<div className="service-item-wrapper tj-fadein-right-on-scroll">
			<div className="service-item style-2 ">
				<div className="title-area">
					<div className="service-icon">
						<i className={iconName ? iconName : "tji-service-1"}></i>
					</div>
					<h4 className="title">
						<Link href={serviceUrl}>{title}</Link>
					</h4>
				</div>
				<div className="service-content">
					<p className="desc">
						{desc ||
							"Through a combination of data-driven insights and innovative approaches, we work closely with you to develop customized."}
					</p>
					{shouldShowList ? (
						<ul className="list-items">
							{serviceList.map(item => (
								<li key={item}>
									<i className="tji-list"></i>
									{item}
								</li>
							))}
						</ul>
					) : (
						""
					)}
					{/* {buttonText ? (
						<Link className="tj-primary-btn text-btn-itanz-service-card-cta" href={serviceUrl}>
							<span className="btn-text">
								<span>{buttonText}</span>
							</span>
							<span className="btn-icon">
								<i className="tji-arrow-right-long"></i>
							</span>
						</Link>
					) : (
						""
					)} */}
				</div>
			</div>
		</div>
	);
};

export default ServiceCard2;
