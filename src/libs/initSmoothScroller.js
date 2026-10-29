import { gsap, ScrollSmoother } from "@/libs/gsap.config";

const initSmoothScroller = () => {
	const animItems = gsap.utils.toArray("#smooth-wrapper");
	if (animItems.length) {
		gsap.config({
			nullTargetWarn: false,
		});

		const existingSmoother = ScrollSmoother.get();
		if (existingSmoother) {
			existingSmoother.kill();
		}

		return ScrollSmoother.create({
			content: "#smooth-content",
			wrapper: "#smooth-wrapper",
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.1,
			ignoreMobileResize: true,
		});
	}

	return null;
};

export default initSmoothScroller;
