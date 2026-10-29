"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const avatarImages = [
	"/images/testimonial/client-1.webp",
	"/images/testimonial/client-2.webp",
	"/images/testimonial/client-3.webp",
];

const ItanzSuccessTestimonials = ({ testimonials }) => {
	return (
		<section className="tj-testimonial-section-2 itanz-success-testimonial-section section-gap">
			<div className="container">
				<div className="row row-gap-4 align-items-stretch">
					<div className="col-lg-6 order-lg-2">
						<div
							className="testimonial-img-area itanz-success-testimonial-visual wow fadeInUp"
							data-wow-delay=".3s"
						>
							<div className="testimonial-img">
								<img
									data-speed=".8"
									src="/images/success-stories/hero-banner.webp"
									alt="iTANZ client success conversation"
								/>
								<div className="sec-heading style-2--">
									<span className="sub-title">
										<i className="tji-box"></i>Success, In Their Words
									</span>
									<h2 className="sec-title title-anim">
										What Clients Remember is How the Work Felt in Operation.
									</h2>
								</div>
							</div>
							<div className="box-area">
								<div className="rating-box itanz-success-testimonial-note">
									<span>&nbsp;</span><br/><br/>
									<strong>&nbsp;</strong>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 order-lg-1">
						<div
							className="testimonial-wrapper itanz-success-testimonial-slider-wrap wow fadeInUp"
							data-wow-delay=".5s"
						>
							<Swiper
								spaceBetween={28}
								slidesPerView={1}
								loop={true}
								speed={1500}
								autoplay={{ delay: 4500 }}
								pagination={{
									el: ".itanz-success-testimonial-pagination",
									clickable: true,
								}}
								navigation={{
									nextEl: ".itanz-success-testimonial-next",
									prevEl: ".itanz-success-testimonial-prev",
								}}
								modules={[Pagination, Autoplay, Navigation]}
								className="testimonial-slider-2 itanz-success-testimonial-slider"
							>
								{testimonials?.map((item, idx) => (
									<SwiperSlide key={item.name}>
										<div className="testimonial-item itanz-success-testimonial-item">
											<span className="quote-icon">
												<i className="tji-quote"></i>
											</span>
											<div className="desc">
												<p>&quot;{item.quote}&quot;</p>
											</div>
											<div className="testimonial-author">
												<div className="author-inner">
													{/* <div className="author-img">
														<img
															src={avatarImages[idx % avatarImages.length]}
															alt=""
														/>
													</div> */}
													<div className="author-header">
														<h4 className="title">{item.name}</h4>
														<span className="designation">{item.role}</span>
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
								<div className="itanz-success-testimonial-controls">
									<button
										className="itanz-success-testimonial-prev"
										type="button"
										aria-label="Previous testimonial"
									>
										<i className="tji-arrow-left"></i>
									</button>
									<div className="swiper-pagination-area itanz-success-testimonial-pagination"></div>
									<button
										className="itanz-success-testimonial-next"
										type="button"
										aria-label="Next testimonial"
									>
										<i className="tji-arrow-right"></i>
									</button>
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzSuccessTestimonials;
