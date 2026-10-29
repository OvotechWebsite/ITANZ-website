import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";
import { Fragment } from "react";
import {
	contactFlagStrip,
	contactRoutes,
	internationalContactCards,
	regionalPresence,
} from "./contactData";
import ItanzCta from "./ItanzCta";
import ItanzContactForm from "./ItanzContactForm";

const renderAddress = address => {
	const lines = address.split(/<br\s*\/?>/i);

	return lines.map((line, index) => (
		<Fragment key={`${line}-${index}`}>
			{line.trim()}
			{index < lines.length - 1 ? <br /> : null}
		</Fragment>
	));
};

const ItanzContactPage = () => {
	return (
		<>
			<section className="itanz-contact-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-9">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Contact iTANZ
								</span>
								<h1 className="sec-title title-anim">
									Start the Right Conversation
								</h1>
								<p>
									Whether you are planning a platform modernisation, exploring
									integration, requesting a demo or looking for the right regional
									contact, iTANZ will route your enquiry to the team best placed
									to help.
								</p>
								<div className="itanz-contact-actions">
									<ButtonPrimary
										text="Speak to an Expert"
										url="/contact/book-a-consultation?intent=consultation"
									/>
									<ButtonPrimary
										text="Request a Demo"
										url="/contact/product-demo?intent=demo"
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							{/* <div className="itanz-contact-summary">
								<h3>Response Routing</h3>
								<ul>
									<li>Business transformation and solution consultation</li>
									<li>Platform, accelerator and solution demos</li>
									<li>Regional, investor and partnership enquiries</li>
								</ul>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			<section className="tj-choose-section section-gap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Enquiry Routes
								</span>
								<h2 className="sec-title title-anim">
									Route Your Enquiry to the Right Team
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{contactRoutes.map(route => (
							<div key={route.title} className="col-xl-3 col-md-6">
								<Link className="itanz-contact-route-card" href={route.url}>
									<i className={route.icon}></i>
									<h3>{route.title}</h3>
									<p>{route.desc}</p>
									<span>Continue <i className="tji-arrow-right-long"></i></span>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="itanz-contact-global-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Regional Offices
								</span>
								<h2 className="sec-title title-anim">
									Connect with iTANZ Across Key Markets
								</h2>
							</div>
						</div>
					</div>
					<div className="itanz-contact-global-grid">
						{internationalContactCards.map(card => (
							<div key={card.title} className="itanz-contact-global-card">
								<div className="itanz-contact-global-image">
									<img src={card.img} alt={`${card.title} office location`} />
									<span>
										<img src={card.icon} alt={`${card.country} flag`} />
									</span>
								</div>
								<div className="itanz-contact-global-copy">
									<span>{card.country}</span>
									<h3>{card.city}</h3>
									<p>{card.address}</p>
									<Link
										className="tj-primary-btn itanz-contact-global-btn"
										href={`/contact/book-a-consultation?region=${encodeURIComponent(card.country)}&source=%2Fcontact`}
									>
										<span className="btn-text">
											<span>Contact iTANZ</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</Link>
								</div>
							</div>
						))}
					</div>
					<div className="itanz-contact-flag-strip" aria-label="iTANZ regional presence flags">
						{contactFlagStrip.map(flag => (
							<span key={flag.label}>
								<img src={flag.img} alt={flag.label} />
							</span>
						))}
					</div>
				</div>
			</section>
			<div className="itanz-contact-flag-line">
				<img src="/images/contact/itanz-line.webp" alt="" aria-hidden="true" />
			</div>
			<section className="tj-contact-section-2 section-gap">
				<div className="container">
					<div className="row row-gap-4">
						<div className="col-lg-7">
							<ItanzContactForm />
						</div>
						<div className="col-lg-5">
							<div className="itanz-regional-panel">
								<h3>Connect with iTANZ, <br/>Wherever You Operate</h3>
								<p>
									Tell us where you operate and what you need, and we'll connect you with the iTANZ team best placed to move your requirement forward.
								</p>
								{regionalPresence.map(item => (
									<div key={`${item.region}-${item.city}`} className="itanz-region-card">
										<span>{item.region}</span>
										<h4>{item.city}</h4>
										<p>{renderAddress(item.desc)}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzCta
				title="Ready to start the right conversation?"
				desc="Share your enquiry and iTANZ will route it to the team best placed to help."
				buttonText="Book a Consultation"
				buttonUrl="/contact/book-a-consultation?intent=consultation"
			/>
		</>
	);
};

export default ItanzContactPage;
