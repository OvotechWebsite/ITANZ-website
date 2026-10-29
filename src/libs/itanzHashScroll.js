import { gsap, ScrollSmoother, ScrollTrigger } from "@/libs/gsap.config";

const DEFAULT_OFFSET = 120;

const getTarget = targetId => {
	if (!targetId) {
		return null;
	}

	const cleanId = String(targetId).replace(/^#/, "");
	return document.getElementById(cleanId);
};

const refreshScrollState = () => {
	window.requestAnimationFrame(() => {
		ScrollTrigger.refresh();
		ScrollSmoother.get()?.refresh();
	});
};

const revealTargetAnimations = target => {
	if (!target) {
		return;
	}

	const animatedItems = target.querySelectorAll(
		".wow, .title-anim, .text-anim, .hero-text-anim"
	);

	animatedItems.forEach(item => {
		const childItems = item.querySelectorAll("*");

		item.classList.add("start-anim", "animated");
		item.style.visibility = "visible";
		item.style.opacity = "1";

		if (childItems.length) {
			gsap.set(childItems, {
				clearProps: "opacity,visibility,transform",
			});
		}
	});
};

const getScrollTopForTarget = (target, smoother, offset) => {
	if (!smoother) {
		return target.getBoundingClientRect().top + window.scrollY - offset;
	}

	if (typeof smoother.offset === "function") {
		return smoother.offset(target, "top top") - offset;
	}

	return target.getBoundingClientRect().top + smoother.scrollTop() - offset;
};

export const scrollToHashTarget = (targetId, { offset = DEFAULT_OFFSET } = {}) => {
	const target = getTarget(targetId);

	if (!target) {
		return false;
	}

	const smoother = ScrollSmoother.get();
	ScrollTrigger.refresh(true);
	smoother?.refresh();
	revealTargetAnimations(target);

	if (smoother) {
		const top = getScrollTopForTarget(target, smoother, offset);
		smoother.scrollTo(Math.max(top, 0), true);
		ScrollTrigger.update();
		gsap.delayedCall(0.55, () => {
			revealTargetAnimations(target);
			ScrollTrigger.refresh(true);
			smoother.refresh();
			ScrollTrigger.update();
		});
		return true;
	}

	const top = getScrollTopForTarget(target, null, offset);

	gsap.to(window, {
		duration: 0.45,
		ease: "power2.out",
		scrollTo: { y: Math.max(top, 0), autoKill: false },
		onComplete: () => {
			revealTargetAnimations(target);
			refreshScrollState();
		},
	});

	return true;
};

export const initItanzHashScroll = () => {
	const handleHash = ({ replace = false } = {}) => {
		const targetId = window.location.hash.replace("#", "");

		if (!targetId) {
			return;
		}

		window.requestAnimationFrame(() => {
			setTimeout(() => {
				if (scrollToHashTarget(targetId) && replace) {
					window.history.replaceState(null, "", `#${targetId}`);
				}
			}, 120);
		});
	};

	const handleClick = event => {
		if (event.defaultPrevented) {
			return;
		}

		const link = event.target.closest?.("a[href*='#']");

		if (!link) {
			return;
		}

		const href = link.getAttribute("href") || "";

		if (!href || href === "#") {
			return;
		}

		const url = new URL(href, window.location.href);

		if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
			return;
		}

		const targetId = url.hash.replace("#", "");

		if (!targetId || !getTarget(targetId)) {
			return;
		}

		event.preventDefault();
		window.history.pushState(null, "", `${url.pathname}${url.search}#${targetId}`);
		scrollToHashTarget(targetId);
	};

	handleHash({ replace: true });
	window.addEventListener("hashchange", handleHash);
	document.addEventListener("click", handleClick, true);

	return () => {
		window.removeEventListener("hashchange", handleHash);
		document.removeEventListener("click", handleClick, true);
	};
};
