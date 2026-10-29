"use client";

import { ScrollSmoother } from "@/libs/gsap.config";
import { scrollToHashTarget } from "@/libs/itanzHashScroll";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ItanzCompanyStickyNav = ({
	items,
	basePath = "/company",
	visibleFromId = "about",
	ariaLabel = "Discover iTANZ sections",
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) {
			return;
		}

		const updateVisibility = () => {
			const firstSection = document.getElementById(visibleFromId);
			const footer = document.querySelector("footer");

			if (!firstSection) {
				setIsVisible(false);
				return;
			}

			const smoother = ScrollSmoother.get();
			const scrollY = smoother?.scrollTop() ?? window.scrollY;
			const firstSectionTop = firstSection.getBoundingClientRect().top + scrollY;
			const footerTop = footer
				? footer.getBoundingClientRect().top + scrollY
				: Number.POSITIVE_INFINITY;
			const hasReachedFirstSection = scrollY + 180 >= firstSectionTop;
			const hasReachedFooter = scrollY + window.innerHeight >= footerTop - 40;

			setIsVisible(hasReachedFirstSection && !hasReachedFooter);
		};

		updateVisibility();
		window.addEventListener("scroll", updateVisibility, { passive: true });
		window.addEventListener("resize", updateVisibility);

		return () => {
			window.removeEventListener("scroll", updateVisibility);
			window.removeEventListener("resize", updateVisibility);
		};
	}, [isMounted, visibleFromId]);

	if (!isMounted) {
		return null;
	}

	return createPortal(
		<nav
			className={`itanz-company-sticky-nav ${isVisible ? "is-visible" : ""}`}
			aria-label={ariaLabel}
			aria-hidden={!isVisible}
		>
			<div className="container">
				<div className="itanz-company-sticky-inner">
					{items.map(([label, id]) => (
						<a
							key={id}
							href={`#${id}`}
							onClick={event => {
								event.preventDefault();
								window.history.pushState(null, "", `${basePath}#${id}`);
								scrollToHashTarget(id);
							}}
						>
							{label}
						</a>
					))}
				</div>
			</div>
		</nav>,
		document.body
	);
};

export default ItanzCompanyStickyNav;
