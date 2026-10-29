"use client";

import { scrollToHashTarget } from "@/libs/itanzHashScroll";

const ItanzHashButton = ({ className = "", targetId, text }) => {
	const handleClick = () => {
		if (scrollToHashTarget(targetId)) {
			window.history.replaceState(null, "", `#${targetId}`);
		}
	};

	return (
		<button
			type="button"
			className={`tj-primary-btn ${className}`}
			onClick={handleClick}
		>
			<span className="btn-text">
				<span>{text}</span>
			</span>
			<span className="btn-icon">
				<i className="tji-arrow-right-long"></i>
			</span>
		</button>
	);
};

export default ItanzHashButton;
