import Link from "next/link";

const defaultSocialLinks = {
	facebook: "https://www.facebook.com/",
	instagram: "https://www.instagram.com/",
	x: "https://x.com/",
	linkedin: "https://www.linkedin.com/",
};

const socialIcons = {
	facebook: "fa-brands fa-facebook-f",
	instagram: "fa-brands fa-instagram",
	x: "fa-brands fa-x-twitter",
	linkedin: "fa-brands fa-linkedin-in",
};

const TeamCard = ({
	teamMember,
	showDefaultSocials = true,
	showDefaultEmail = true,
	linkProfile = true,
}) => {
	const {
		id,
		name,
		desig,
		img = "/images/team/team-1.webp",
		email,
		socialLinks,
	} = teamMember || {};
	const links = socialLinks || (showDefaultSocials ? defaultSocialLinks : {});
	const visibleSocialLinks = Object.entries(links).filter(([, href]) => href);
	const emailHref = email || (showDefaultEmail ? "info@bexon.com" : "");

	return (
		<div className="team-item left-swipe">
			<div className="team-img">
				<div className="team-img-inner">
					<img src={img} alt="" />
				</div>
				{visibleSocialLinks.length ? (
					<div className="social-links">
						<ul>
							{visibleSocialLinks.map(([network, href]) => (
								<li key={network}>
									<Link href={href} target="_blank">
										<i className={socialIcons[network]}></i>
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
					""
				)}
			</div>
			<div className="team-content">
				<h4 className="title">
					{linkProfile ? (
						<Link href={`/team/${id}`}>{name}</Link>
					) : (
						<span>{name}</span>
					)}
				</h4>
				<span className="designation">{desig}</span>
				{emailHref ? (
					<Link className="mail-at" href={`mailto:${emailHref}`}>
						<i className="tji-at"></i>
					</Link>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default TeamCard;
