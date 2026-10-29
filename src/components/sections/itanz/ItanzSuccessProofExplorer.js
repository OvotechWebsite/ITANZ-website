"use client";

import { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const ItanzSuccessProofExplorer = ({ proofPoints }) => {
	const [activeIndex, setActiveIndex] = useState(null);
	const activeProof = activeIndex === null ? null : proofPoints?.[activeIndex];

	return (
		<div className="itanz-proof-explorer">
			<div className="itanz-proof-instruction">
				<span>Select a sector to view the operational proof</span>
				<i className="tji-arrow-right-long"></i>
			</div>
			<div className="itanz-proof-tabs" role="tablist" aria-label="Success proof categories">
				{proofPoints.map((proof, idx) => (
					<button
						key={proof.title}
						type="button"
						className={`itanz-proof-tab ${idx === activeIndex ? "is-active" : ""}`}
						onClick={() => setActiveIndex(idx)}
						role="tab"
						aria-selected={idx === activeIndex}
					>
						<span
							className="itanz-proof-tab-img"
							style={{ backgroundImage: `url(${proof.img})` }}
						></span>
						<span className="itanz-proof-tab-copy">
							<strong>{proof.title}</strong>
							<small>{proof.shortDesc}</small>
						</span>
					</button>
				))}
			</div>

			{activeProof ? (
				<div className="itanz-proof-detail">
					<div
						className="itanz-proof-detail-img"
						style={{ backgroundImage: `url(${activeProof.img})` }}
					></div>
					<div className="itanz-proof-detail-copy">
						<button
							type="button"
							className="itanz-proof-detail-close"
							onClick={() => setActiveIndex(null)}
							aria-label="Hide proof details"
						>
							Hide Details
							<i className="fa-regular fa-xmark"></i>
						</button>
						<span className="sub-title">
							<i className="tji-box"></i>{activeProof.category}
						</span>
						<h3>{activeProof.heading}</h3>
						<p>{activeProof.desc}</p>
						<div className="itanz-proof-detail-meta">
							<div>
								<strong>Relevant iTANZ Capability</strong>
								<span>{activeProof.capability}</span>
							</div>
							<div>
								<strong>Proof</strong>
								<span>{activeProof.proof}</span>
							</div>
						</div>
						<div>
							<ButtonPrimary text={activeProof.cta} url={activeProof.url} isTextBtn={false} />
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default ItanzSuccessProofExplorer;
