"use client";
import Link from "next/link";
import getSocials from "@/libs/getSocials";

const ContactMenu = ({ isContactOpen, setIsContactOpen }) => {
	const socials = getSocials();
	const handleClick = () => {
		setIsContactOpen(false);
	};
	return (
		<>
			<div
				className={`body-overlay  ${isContactOpen ? "opened" : ""}`}
				onClick={handleClick}
			></div>
			<div
				className={`tj-offcanvas-area d-none d-lg-block  ${
					isContactOpen ? "opened" : ""
				}`}
			>
				<div className="hamburger_bg"></div>
				<div className="hamburger_wrapper">
					<div className="hamburger_inner">
						<div className="hamburger_top d-flex align-items-center justify-content-between">
							<div className="hamburger_logo">
								<Link href="/" className="mobile_logo">
									<img src="/images/logos/logo-2.webp" alt="iTANZ Technologies" />
								</Link>
							</div>
							<div className="hamburger_close">
								<button className="hamburger_close_btn" onClick={handleClick}>
									<i className="fa-thin fa-times"></i>
								</button>
							</div>
						</div>
						<div className="offcanvas-text">
							<p>
								iTANZ helps governments, utilities and complex enterprises
								modernise platforms, connect data, automate operations and scale
								digital transformation with confidence.
							</p>
						</div>
						<div className="hamburger-search-area">
							<h5 className="hamburger-title">Search Now!</h5>
							<div className="hamburger_search">
								<form method="get" action="/">
									<button type="submit">
										<i className="tji-search"></i>
									</button>
									<input
										type="search"
										autoComplete="off"
										name="s"
										placeholder="Search here..."
									/>
								</form>
							</div>
						</div>
						<div className="hamburger-infos">
							<h5 className="hamburger-title">Contact Info</h5>
							<div className="contact-info">
								<div className="contact-item">
									<span className="subtitle">Phone</span>
									<Link className="contact-link" href="tel:+61403081646">
										+61 403 081 646
									</Link>
								</div>
								<div className="contact-item">
									<span className="subtitle">Email</span>
									<Link className="contact-link" href="mailto:info@itanzgroup.com">
										info@itanzgroup.com
									</Link>
								</div>
								<div className="contact-item">
									<span className="subtitle">Location</span>
									<span className="contact-link">
										Level 7, 276 Flinders Street, Melbourne
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="hamburger-socials">
						<h5 className="hamburger-title">Follow Us</h5>
						<div className="social-links style-3">
							<ul>
								{socials.map(social => (
									<li key={social.name}>
										<a
											href={social.path}
											target="_blank"
											aria-label={social.name}
											rel="noreferrer"
										>
											<i className={social.iconName}></i>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactMenu;
