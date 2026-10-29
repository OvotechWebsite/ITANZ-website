"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlides } from "./data";

const ItanzHero = () => {
	const [controlledMainSwiper, setControlledMainSwiper] = useState(null);

	return (
		<section className="tj-slider-section itanz-template-hero">
			<Swiper
				slidesPerView={1}
				spaceBetween={0}
				loop={true}
				effect="fade"
				speed={1400}
				autoplay={{ delay: 6500 }}
				modules={[Autoplay, Navigation, EffectFade, Thumbs]}
				thumbs={{ swiper: controlledMainSwiper }}
				navigation={{ nextEl: ".slider-next", prevEl: ".slider-prev" }}
				className="hero-slider"
				style={{ height: "100%" }}
			>
				{heroSlides.map(({ img, video, title, highlight, desc }, idx) => (
					<SwiperSlide
						key={idx}
						className="tj-slider-item"
						style={{ height: "auto" }}
					>
						{video ? (
							<div className="slider-bg-image itanz-hero-video">
								<video
									autoPlay
									loop
									muted
									playsInline
									preload="metadata"
									poster={img}
								>
									<source src={video} type="video/mp4" />
								</video>
							</div>
						) : (
							<div
								className="slider-bg-image"
								style={{ backgroundImage: `url('${img}')` }}
							></div>
						)}
						<div className="container">
							<div className="slider-wrapper">
								<div className="slider-content">
									<span className="sub-title">
										Connect · Automate · Optimise · Scale
									</span>
									<h1 className="slider-title">
										{title} <span>{highlight}</span>
									</h1>
									<div className="slider-desc">{desc}</div>
									<div className="slider-btn itanz-hero-actions">
										<ButtonPrimary text="Explore Solutions" url="/solutions" />
										<ButtonPrimary
											text="Speak to an Expert"
											url="/contact/book-a-consultation"
											className="btn-dark"
										/>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}

				<div className="hero-navigation d-inline-flex wow fadeIn">
					<div className="slider-prev" role="button">
						<span className="anim-icon">
							<i className="tji-arrow-left"></i>
							<i className="tji-arrow-left"></i>
						</span>
					</div>
					<div className="slider-next" role="button">
						<span className="anim-icon">
							<i className="tji-arrow-right"></i>
							<i className="tji-arrow-right"></i>
						</span>
					</div>
				</div>
			</Swiper>
			<Swiper
				onSwiper={setControlledMainSwiper}
				slidesPerView={3}
				spaceBetween={15}
				loop={false}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[Thumbs]}
				className="hero-thumb wow fadeIn"
			>
				{heroSlides.map(({ thumbImg }, idx) => (
					<SwiperSlide key={idx} className="thumb-item">
						<Image
							src={thumbImg}
							alt=""
							width={80}
							height={80}
							style={{ height: "auto" }}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="circle-text-wrap wow fadeInUp">
				<span
					className="circle-text"
					style={{ backgroundImage: "url('/images/hero/circle-text.webp')" }}
				></span>
				<Link className="circle-icon" href="/solutions">
					<i className="tji-arrow-down-big"></i>
				</Link>
			</div>
		</section>
	);
};

export default ItanzHero;
