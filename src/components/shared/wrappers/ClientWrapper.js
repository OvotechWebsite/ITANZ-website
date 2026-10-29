"use client";
import animateInvertText from "@/libs/animateInvertText";
import arrangeAnim from "@/libs/arrangeAnim";
import arrangeAnim2 from "@/libs/arrangeAnim2";
import fadeInRightOnScrollAnim from "@/libs/fadeInRightOnScrollAnim";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/libs/gsap.config";
import { initItanzHashScroll } from "@/libs/itanzHashScroll";
import initSmoothScroller from "@/libs/initSmoothScroller";
import onePageNavAnim from "@/libs/onePageNavAnim";
import progressBar from "@/libs/progressBar";
import sidebarSticky from "@/libs/sidebarSticky";
import textReavealAnim from "@/libs/textReavealAnim";
import titleAnim from "@/libs/titleAnim";
import titleAnim2 from "@/libs/titleAnim2";
import titleAnim3 from "@/libs/titleAnim3";
import tjImageParallex from "@/libs/tjImageParallex";
import tjLeftSwipeAnimation from "@/libs/tjLeftSwipeAnimation";
import tjMagicCursorAnimation from "@/libs/tjMagicCursorAnimation";
import tjProgressAnimation from "@/libs/tjProgressAnimation";
import tjRightSwipeAnimation from "@/libs/tjRightSwipeAnimation";
import tjScrollSlider from "@/libs/tjScrollSlider";
import tjStackAnimation from "@/libs/tjStackAnimation";
import tjStackAnimation2 from "@/libs/tjStackAnimation2";
import tjStackAnimation3 from "@/libs/tjStackAnimation3";
import tjZoomInScroll from "@/libs/tjZoomInScroll";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const ClientWrapper = () => {
	const pathname = usePathname();

	useEffect(() => {
		let isDisposed = false;
		let wowInstance;

		import("wow.js").then(({ default: WOW }) => {
			if (!isDisposed) {
				wowInstance = new WOW();
				wowInstance.init();
			}
		});
		const cleanupHashScroll = initItanzHashScroll();
		const cleanup = tjMagicCursorAnimation();
		return () => {
			isDisposed = true;
			wowInstance?.stop?.();
			cleanupHashScroll();
			if (cleanup) cleanup();
		};
	}, [pathname]);
	useGSAP((context, contextSafe) => {
		const smoother = initSmoothScroller();
		const cleanupOnePageNav = onePageNavAnim(contextSafe);

		if (!window.location.hash) {
			smoother?.scrollTop(0);
			window.scrollTo({ top: 0, left: 0, behavior: "auto" });
		}

		tjRightSwipeAnimation();
		tjLeftSwipeAnimation();
		titleAnim();
		titleAnim2();
		titleAnim3();
		textReavealAnim();
		sidebarSticky();
		arrangeAnim();
		arrangeAnim2();
		animateInvertText();
		fadeInRightOnScrollAnim();
		progressBar();
		tjStackAnimation();
		tjScrollSlider();
		tjStackAnimation2();
		tjImageParallex();
		tjProgressAnimation();
		tjZoomInScroll();
		tjStackAnimation3();

		const refreshFrame = window.requestAnimationFrame(() => {
			ScrollTrigger.refresh(true);
			smoother?.refresh();
		});

		return () => {
			window.cancelAnimationFrame(refreshFrame);
			cleanupOnePageNav();
			if (smoother === ScrollSmoother.get()) {
				smoother.kill();
			}
		};
	}, { dependencies: [pathname], revertOnUpdate: true });
	return null;
};

export default ClientWrapper;
