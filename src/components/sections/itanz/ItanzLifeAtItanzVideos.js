"use client";

import { useState } from "react";
import { lifeAtItanzMedia } from "./clientSuccessData";

const getYoutubeEmbedUrl = media => {
	if (media.youtubeId) {
		return `https://www.youtube.com/embed/${media.youtubeId}`;
	}

	if (!media.youtubeUrl) {
		return "";
	}

	try {
		const url = new URL(media.youtubeUrl);
		const host = url.hostname.replace("www.", "");

		if (host === "youtu.be") {
			return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
		}

		if (host === "youtube.com") {
			const videoId = url.searchParams.get("v");
			if (videoId) {
				return `https://www.youtube.com/embed/${videoId}`;
			}

			const shortsId = url.pathname.match(/\/shorts\/([^/?]+)/)?.[1];
			if (shortsId) {
				return `https://www.youtube.com/embed/${shortsId}`;
			}
		}
	} catch {
		return "";
	}

	return "";
};

const ItanzYoutubeFrame = ({ media, className = "" }) => {
	const [isPlaying, setIsPlaying] = useState(!media.thumbnail);
	const [shouldAutoplay, setShouldAutoplay] = useState(false);
	const embedUrl = getYoutubeEmbedUrl(media);

	if (media.videoUrl && isPlaying) {
		return (
			<video
				className={`itanz-life-local-video ${className}`}
				src={media.videoUrl}
				controls
				autoPlay={shouldAutoplay}
				preload="metadata"
				poster={media.thumbnail}
				playsInline
			></video>
		);
	}

	if (media.videoUrl) {
		return (
			<button
				className={`itanz-life-video-thumbnail itanz-life-local-thumbnail ${className}`}
				type="button"
				onClick={() => {
					setShouldAutoplay(true);
					setIsPlaying(true);
				}}
				aria-label={`Play ${media.title}`}
			>
				{media.thumbnail ? (
					<img src={media.thumbnail} alt={`${media.title} video thumbnail`} />
				) : (
					<video src={media.videoUrl} preload="metadata" playsInline muted></video>
				)}
				<span>
					<i className="tji-play"></i>
				</span>
			</button>
		);
	}

	if (embedUrl && isPlaying) {
		return (
			<iframe
				src={shouldAutoplay ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1` : embedUrl}
				title={media.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			></iframe>
		);
	}

	if (embedUrl && media.thumbnail) {
		return (
			<button
				className={`itanz-life-video-thumbnail ${className}`}
				type="button"
				onClick={() => {
					setShouldAutoplay(true);
					setIsPlaying(true);
				}}
				aria-label={`Play ${media.title}`}
			>
				<img src={media.thumbnail} alt={`${media.title} video thumbnail`} />
				<span>
					<i className="tji-play"></i>
				</span>
			</button>
		);
	}

	return (
		<a
			className={`itanz-life-video-placeholder ${className}`}
			href={media.youtubeUrl}
			target="_blank"
			rel="noreferrer"
		>
			<span>
				<i className="tji-play"></i>
			</span>
			<strong>{media.title}</strong>
			<small>Watch on YouTube</small>
		</a>
	);
};

const ItanzLifeAtItanzVideos = ({
	media = lifeAtItanzMedia,
	className = "",
	sectionClassName = "",
}) => {
	return (
		<section id="itanz-videos" className={`itanz-life-at-itanz-section section-gap pt-0 ${sectionClassName}`}>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp">
								<i className="tji-box"></i>Watch the Videos
							</span>
							<h2 className="sec-title title-anim">Life at iTANZ</h2>
							<p>
								Real stories from the people shaping enterprise technology,
								delivery culture and client outcomes across iTANZ.
							</p>
						</div>
					</div>
				</div>
				<div className={`itanz-life-video-feature ${className}`}>
					<div className="itanz-life-video-frame">
						<ItanzYoutubeFrame media={media.featured} />
					</div>
					<div className="itanz-life-video-copy">
						<span>Main Feature</span>
						<h3>{media.featured.title}</h3>
						<p>{media.featured.desc}</p>
					</div>
				</div>
				<div className="itanz-life-shorts-head mt-5">
					<h3>What People say about iTANZ</h3>
				</div>
				<div className="itanz-life-shorts-grid">
					{media.shorts.map((short, index) => (
						<div
							key={`${short.youtubeUrl || short.videoUrl || short.title}-${index}`}
							className="itanz-life-short-card"
						>
							<ItanzYoutubeFrame media={short} className="itanz-life-short-placeholder" />
							<h3>{short.title}</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ItanzLifeAtItanzVideos;
