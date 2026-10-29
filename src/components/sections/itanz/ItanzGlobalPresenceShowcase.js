"use client";

import { useCallback, useState } from "react";

const ItanzGlobalPresenceShowcase = ({ presence }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleCurrentIndex = useCallback(idx => {
		setCurrentIndex(idx);
	}, []);

	return (
		<section className="h6-project itanz-global-presence-section itanz-global-presence-showcase section-gap section-gap-x">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading style-2 style-6 text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Our Global Presence
							</span>
							<h2 className="sec-title title-anim">{presence.title}</h2>
							<p>{presence.desc}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="h6-project-inner itanz-global-presence-inner wow fadeInUp" data-wow-delay="0.6s">
							{presence.markets.map((market, idx) => (
								<div
									key={market.country}
									className={`project-item h6-project-item itanz-global-presence-item ${
										currentIndex === idx ? "active" : ""
									}`}
									onMouseEnter={() => handleCurrentIndex(idx)}
									onFocus={() => handleCurrentIndex(idx)}
									tabIndex={0}
								>
									<div
										className="project-item-inner h6-project-item-inner"
										style={{ backgroundImage: `url("${market.img}")` }}
									>
										<div className="project-content">
											<span className="categories">
												<span>{market.region}</span>
											</span>
											<div className="project-text">
												<h3 className="title">{market.country}</h3>
												<p>{market.desc}</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
			<div className="bg-shape-3">
				<img src="/images/shape/shape-blur.svg" alt="" />
			</div>
		</section>
	);
};

export default ItanzGlobalPresenceShowcase;
