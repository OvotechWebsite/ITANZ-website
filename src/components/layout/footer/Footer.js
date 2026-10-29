import Link from "next/link";
import getSocials from "@/libs/getSocials";

const footerColumns = [
	{
		title: "Solutions",
		links: [
			["iTANZ Accelerators & IP", "/solutions/itanz-accelerators-prosuite-core"],
			["Enterprise Platforms", "/solutions"],
			["Data, Integration & Analytics", "/solutions/integration-oic-nsip-mulesoft"],
			["Cloud, Network & Security", "/solutions/network-security"],
			["Implementation & Support", "/solutions/oem-implementation-services"],
			["Managed Services", "/solutions/managed-services"],
			["Resource as a Service", "/solutions/resource-as-a-service"],
		],
	},
	{
		title: "Industries",
		links: [
			["Government", "/industries/government-public-sector"],
			["Local Government", "/industries/local-government"],
			["Utilities & Energy", "/industries/utilities-energy"],
			["Financial Services", "/industries/banking-financial-services"],
			["Healthcare", "/industries/healthcare"],
			["Manufacturing", "/industries/manufacturing"],
		],
	},
	{
		title: "Resources",
		links: [
			["Success Stories", "/success-stories"],
			["Insights", "/insights"],
			["Partners", "/partners"],
			["Newsroom", "/insights/newsroom"],
			["Events", "/insights/events-webinars"],
		],
	},
	{
		title: "Company",
		links: [
			["Discover iTANZ", "/company"],
			["Certification & Compliance", "/company/certifications-compliance"],
		],
	},
];

const Footer = () => {
	const socials = getSocials();

	return (
		<footer className="tj-footer-section footer-1 section-gap-x">
			<div className="footer-main-area">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-xl-2 col-lg-4 col-md-6">
							<div className="footer-widget wow fadeInUp" data-wow-delay=".1s">
								<div className="footer-logo">
									<Link href="/">
										<img src="/images/logos/logo.webp" alt="iTANZ Technologies" />
									</Link>
								</div>
								<div className="footer-text">
									<p>
										iTANZ delivers enterprise technology and transformation
										platforms that help organisations modernise systems, connect
										data and achieve digital outcomes.
									</p>
								</div>
								<div className="social-links">
									<ul>
										{socials.map(social => (
											<li key={social.name}>
												<Link
													href={social.path}
													target="_blank"
													aria-label={social.name}
												>
													<i className={social.iconName}></i>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{footerColumns.map((column, index) => (
							<div key={column.title} className="col-xl-2 col-lg-4 col-md-6">
								<div
									className="footer-widget widget-nav-menu wow fadeInUp"
									data-wow-delay={`.${index + 2}s`}
								>
									<h5 className="title">{column.title}</h5>
									<ul>
										{column.links.map(([label, url]) => (
											<li key={label}>
												<Link href={url}>{label}</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						))}

						<div className="col-xl-2 col-lg-5 col-md-6">
							<div
								className="footer-widget widget-nav-menu wow fadeInUp"
								data-wow-delay=".7s"
							>
								<h5 className="title">Contact Us</h5>
								<div className="itanz-footer-contact-links">
									<ul>
										<li>
											<Link href="mailto:info@itanzgroup.com">
												<span className="icon"><i className="tji-envelop-2"></i></span>
												<span className="text">info@itanzgroup.com</span>
											</Link>
										</li>
									{/* <li>
										<Link href="tel:+61391234567">
											+61 3 9123 4567
										</Link>
									</li> */}
									<li>
										<Link href="https://wa.me/+61403081646?text=Hello iTANZ" target="_blank">
											<span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
											<span className="text">+61 403 081 646</span>
										</Link>
									</li>
									<li>
										<Link href="https://itanzgroup.com/" target="_blank">
											<span className="icon"><i className="tji-at"></i></span>
											<span className="text">www.itanzgroup.com</span>
										</Link>
									</li>
									<li>
										<Link href="/contact/book-a-consultation">
											<span className="icon"><i className="tji-arrow-right-long"></i></span>
											<span className="text">Speak to an Expert</span>
										</Link>
									</li>
									
								</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="tj-copyright-area">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="copyright-content-area">
								<div className="copyright-text">
									<p>&copy; 2026 iTANZ Technologies. All rights reserved.</p>
								</div>
								<div className="footer-contact">
									<ul>
										<li>
											<Link href="/docs/iTANZ_Privacy_Policy.pdf">Privacy Policy</Link>
										</li>
										<li>
											<Link href="/docs/iTANZ_Terms_of_Use.pdf">Terms of Use</Link>
										</li>
										<li>
											<Link href="/docs/iTANZ_Cookie_Policy.pdf">Cookie Policy</Link>
										</li>
									</ul>
								</div>
								<div className="copyright-text">
									<p>
										Understanding, Engineered.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</footer>
	);
};

export default Footer;
