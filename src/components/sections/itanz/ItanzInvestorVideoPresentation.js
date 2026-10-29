"use client";

import { useState } from "react";
import Link from "next/link";
import { investorVideo } from "./investorVideoData";
import styles from "./ItanzInvestorVideoPresentation.module.scss";

const ItanzInvestorVideoPresentation = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<section className={`${styles.section} section-gap`} aria-labelledby="investor-presentation-title">
			<div className="container">
				<div className={styles.layout}>
					<div className={styles.copy}>
						<div className="sec-heading mb-0">
							<span className="sub-title"><i className="tji-box"></i>CEO Presentation</span>
							<h2 id="investor-presentation-title" className="sec-title">{investorVideo.title}</h2>
							<p>{investorVideo.description}</p>
							<Link className={styles.pageLink} href={investorVideo.pageUrl}>
								Open presentation page <i className="tji-arrow-up-right" aria-hidden="true"></i>
							</Link>
						</div>
					</div>
					<div className={styles.media}>
						{isPlaying ? (
							<iframe
								className={styles.video}
								src={`${investorVideo.embedUrl}?autoplay=1`}
								title={investorVideo.title}
								allow="autoplay; encrypted-media; picture-in-picture; web-share"
								allowFullScreen
								referrerPolicy="strict-origin-when-cross-origin"
							/>
						) : (
							<button
								type="button"
								className={styles.thumbnail}
								onClick={() => setIsPlaying(true)}
								aria-label={`Watch ${investorVideo.title}`}
							>
								<img src={investorVideo.poster} alt="" />
								<span className={styles.playIcon} aria-hidden="true"><i className="tji-play"></i></span>
								<span className={styles.watchLabel}>Watch Presentation <span aria-hidden="true">→</span></span>
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzInvestorVideoPresentation;
