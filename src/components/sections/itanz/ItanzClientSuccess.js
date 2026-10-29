"use client";

import PortfolioCard2 from "@/components/shared/cards/PortfolioCard2";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { successStories } from "./data";

const ItanzClientSuccess = () => {
	const portfolioSlides = [...successStories, ...successStories];

	return (
		<section className="tj-project-section-2 section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading style-2 text-center">
							<span className="sub-title wow fadeInUp">See our Impact in Action</span>
							<h2 className="sec-title text-anim">
								Real Results. Proven at{" "}
								<span>Enterprise Scale.</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="project-wrapper wow fadeInUp">
							<Swiper
								slidesPerView={1.2}
								spaceBetween={15}
								loop={true}
								speed={1500}
								centeredSlides={true}
								autoplay={{ delay: 6000 }}
								pagination={{
									el: ".swiper-pagination-area",
									clickable: true,
								}}
								breakpoints={{
									576: { slidesPerView: 1.7, spaceBetween: 20 },
									768: { slidesPerView: 2, spaceBetween: 20 },
									992: { slidesPerView: 2, spaceBetween: 30 },
									1024: { slidesPerView: 2.2, spaceBetween: 30 },
									1400: { slidesPerView: 2.31, spaceBetween: 30 },
								}}
								modules={[Pagination, Autoplay]}
								className="project-slider"
							>
								{portfolioSlides.map((portfolio, idx) => (
									<SwiperSlide key={`${portfolio.title}-${idx}`}>
										<PortfolioCard2 portfolio={portfolio} />
									</SwiperSlide>
								))}
								<div className="swiper-pagination-area"></div>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzClientSuccess;
