import { gsap } from "@/libs/gsap.config";
const onePageNavAnim = contextSafe => {
	const animItems = gsap.utils.toArray(".tj-scroll-btn");
	const listeners = [];
	if (animItems.length) {
		animItems.forEach(btn => {
			const onClickGood = contextSafe(() => {
				const sectionTarget = btn.getAttribute("data-target");
				gsap.to(window, {
					duration: 0.3,
					ease: "power2.out",
					scrollTo: { y: sectionTarget, offsetY: 70 },
				});
			});
			btn.addEventListener("click", onClickGood);
			listeners.push([btn, onClickGood]);
		});
	}

	return () => {
		listeners.forEach(([btn, listener]) => {
			btn.removeEventListener("click", listener);
		});
	};
};

export default onePageNavAnim;
