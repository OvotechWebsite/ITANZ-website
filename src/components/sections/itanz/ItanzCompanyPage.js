import Link from "next/link";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ItanzCta from "./ItanzCta";
import ItanzCompanyStickyNav from "./ItanzCompanyStickyNav";
import { companyOverview } from "./companyData";

const pageNav = [
	["About", "about"],
	["What We Do", "what-we-do"],
	["What We Believe", "what-we-believe"],
	["How We Engage", "how-we-engage"],
	["Our Approach", "our-approach"],
	["Governed AI", "governed-intelligence"],
	["Sustainability", "sustainability"],
	["Certifications", "certifications"],
];

const capabilities = [
	{
		title: "Advisory",
		kicker: "Shape what's possible.",
		desc: "Strategy and transformation, enterprise architecture, discovery and assessment, business consulting, and change and adoption.",
		icon: "tji-service-1",
	},
	{
		title: "Engineering",
		kicker: "Build what matters.",
		desc: "Platforms and products, enterprise applications, data and AI, integration, cloud engineering and cybersecurity.",
		icon: "tji-service-3",
	},
	{
		title: "Operations",
		kicker: "Run it. Improve it. Evolve it.",
		desc: "Managed services, application support, application management, Resource as a Service and continuous improvement.",
		icon: "tji-support",
	},
];

const beliefs = [
	["Understand Deeply", "We start with curiosity, context and the operating reality, not assumptions."],
	["Engineer Intelligently", "We combine domain insight with the right technology to create solutions designed for the real world."],
	["Operate Responsibly", "We take ownership beyond delivery and remain accountable for what happens next."],
	["Create Impact", "Technology is a means. Better outcomes are the mission."],
	["Earn Trust", "We act with integrity, transparency, security and respect in every decision and every engagement."],
	["Think Global", "We bring global thinking, ecosystem capability and cross-industry experience while staying grounded in local operating realities."],
];

const clearMethod = [
	["C", "Contextualise", "Understand before recommending.", "We map the business environment, operating model, systems, people, data, dependencies, constraints and desired outcomes before proposing a direction.", "A shared understanding of the real problem."],
	["L", "Locate the Gap", "Find where intention and execution have diverged.", "We identify the gaps between strategy, operations, technology, data and capability, then distinguish symptoms from root causes.", "Clarity on what actually needs to change."],
	["E", "Architect for Execution", "Design for delivery reality.", "We translate understanding into an executable architecture and delivery path that is technology-agnostic, scalable, secure and aligned with the operating environment.", "A solution designed to work beyond the presentation deck."],
	["A", "Activate with Accountability", "Turn the plan into owned action.", "Clear responsibilities, named owners, traceable decisions, transparent governance and measurable milestones keep execution visible.", "Execution with confidence and control."],
	["R", "Run & Evolve", "Value should continue after go-live.", "We stay engaged through operations, managed services, optimization and continuous improvement so solutions continue to perform as the organization evolves.", "Sustainable value, not a handover cliff."],
];

const approach = [
	{
		number: "01",
		title: "Understand",
		subtitle: "Start with reality.",
		desc: "Before architecture, platforms or transformation roadmaps, we build a clear picture of the environment we are entering. We examine the industry context, operating model, processes, systems, data, people, regulatory requirements, risks and strategic objectives.",
		points: ["Understand the environment.", "Define the outcome.", "Find the real gap."],
	},
	{
		number: "02",
		title: "Engineer",
		subtitle: "Turn understanding into something that performs.",
		desc: "We architect the right combination of platforms, applications, data, AI, cloud, integration and security around the outcome that needs to be achieved. Our approach is technology-agnostic and ecosystem-led.",
		points: ["Best-fit technology.", "Integration by design.", "Built for operation, not only go-live."],
	},
	{
		number: "03",
		title: "Operate",
		subtitle: "Take responsibility for what happens next.",
		desc: "Transformation does not end when a system launches. We support, manage, measure, optimize and evolve the environments we help create, keeping technology aligned with changing operational and business requirements.",
		points: ["No handoff cliff.", "Continuous improvement.", "Accountability beyond delivery."],
	},
];

const aiPrinciples = [
	["Grounded", "In real, relevant data, not assumptions."],
	["Traceable", "Connected to its source and capable of being examined."],
	["Secure", "Protected through security and governance by design."],
	["Accountable", "Supported by clear ownership and appropriate human oversight."],
];

const sustainability = [
	["Responsible Technology", "Ethical, secure and accountable delivery guides the way iTANZ approaches technology transformation."],
	["Efficiency and Resilience", "Cloud, automation, reduced waste, data visibility and improved operations can support long-term sustainable value."],
	["Long-Term Progress", "Sustainable transformation is about responsible decisions, resilient operations and technology choices that support business, community and environmental value."],
];

const ItanzCompanyPage = () => {
	return (
		<>
			<section
				className="itanz-company-hero itanz-discover-hero section-gap"
				style={{ "--itanz-company-hero-bg": "url(/images/company/company-hero.webp)" }}
			>
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-9">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>Discover iTANZ
								</span>
								<h1 className="sec-title title-anim">{companyOverview.title}</h1>
								<p>{companyOverview.desc}</p>
								<strong className="itanz-discover-hero-line">
									Understanding, engineered. Impact, delivered.
								</strong>
								<div className="itanz-contact-actions">
									<ButtonPrimary text="Start a Conversation" url="/contact/book-a-consultation?source=%2Fcompany" />
									<a className="text-btn" href="#about">
										<span className="btn-text">
											<span>Explore iTANZ</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzCompanyStickyNav items={pageNav} />

			<section id="about" className="itanz-company-section itanz-company-about-bg section-gap bg-white">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>About Us
								</span>
								<h2 className="sec-title">We understand first. <br/>Then we engineer what comes next.</h2>
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-lg-12 text-center">
							<div className="itanz-company-rich-copy ">
								<p>
									Technology alone rarely solves an operational problem. The real
									challenge is understanding how strategy, people, processes, data
									and systems come together, and where they do not. That is where
									iTANZ begins.
								</p>
								<p>
									iTANZ brings together domain understanding, technology engineering
									and operational accountability to help organizations modernize,
									transform and grow with confidence. We work at the intersection of
									business reality and technology possibility, particularly where
									reliability, security, integration, governance and continuity matter.
								</p>
								<p>
									We do not begin with a product looking for a problem. We begin with
									the organization, its operating reality and the outcome it needs to
									achieve.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="what-we-do" className="itanz-company-section itanz-company-muted section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>What We Do
								</span>
								<h2 className="sec-title">Our capabilities span the full transformation lifecycle</h2>
								<p>
									From the first question to the systems that ultimately run the
									organization, we connect strategy, engineering and operations
									around one objective: measurable outcomes.
								</p>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{capabilities.map(item => (
							<div key={item.title} className="col-lg-4">
								<div className="itanz-company-capability-card">
									<div className="itanz-company-icon">
										<i className={item.icon}></i>
									</div>
									<span>{item.kicker}</span>
									<h3>{item.title}</h3>
									<p>{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="what-we-believe" className="itanz-company-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>What We Believe
								</span>
								<h2 className="sec-title">One ecosystem. <br/>Aligned to your outcomes.</h2>
								<p>
									These beliefs shape how iTANZ thinks, builds, operates and earns trust
									across complex enterprise environments.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-company-belief-grid">
						{beliefs.map(([title, desc]) => (
							<div key={title} className="itanz-company-belief-card">
								<h3>{title}</h3>
								<p>{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="how-we-engage" className="itanz-company-clear-section itanz-company-clear-bg section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title text-white">
									<i className="tji-box"></i>How We Engage
								</span>
								<h2 className="sec-title">A CLEAR method. <br/>Built for outcomes.</h2>
								<p>
									CLEAR creates a disciplined path from understanding the problem to
									delivering, operating and continuously improving the solution.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-company-clear-grid">
						{clearMethod.map(([letter, title, kicker, desc, outcome]) => (
							<div key={letter} className="itanz-company-clear-card">
								<span>{letter}</span>
								<h3>{title}</h3>
								<strong>{kicker}</strong>
								<p>{desc}</p>
								<em>Outcome: {outcome}</em>
							</div>
						))}
					</div>
					<div className="itanz-company-commitment">
						<h3>The iTANZ Commitment</h3>
						<ul>
							<li>Partner, not supplier.</li>
							<li>Outcome focused.</li>
							<li>Transparent and collaborative.</li>
							<li>Built to last.</li>
						</ul>
					</div>
				</div>
			</section>

			<section id="our-approach" className="itanz-company-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Our Approach
								</span>
								<h2 className="sec-title">Understand. Engineer. Operate.</h2>
								<p>
									The technology should fit the organization, not the other way
									around. iTANZ begins with how the organization actually works.
								</p>
							</div>
						</div>
					</div>
					<div className="itanz-company-approach-list d-none">
						{approach.map(item => (
							<div key={item.number} className="itanz-company-approach-item">
								<span>{item.number}</span>
								<div>
									<strong>{item.subtitle}</strong>
									<h3>{item.title}</h3>
									<p>{item.desc}</p>
								</div>
								<ul>
									{item.points.map(point => (
										<li key={point}>{point}</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="itanz-company-outcome-band">
						<span>Where This Leads</span>
						<p>
							Platforms that understand. Transformations that deliver. Operations
							that keep improving. Outcomes that last.
						</p>
					</div>
				</div>
			</section>

			<section id="governed-intelligence" className="itanz-company-ai-section section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-5">
							<div className="sec-heading">
								<span className="sub-title">
									<i className="tji-box"></i>Governed Intelligence
								</span>
								<h2 className="sec-title">Trust is engineered</h2>
								<p>
									AI without governance creates risk. As intelligence becomes embedded
									across enterprise platforms and operations, trust must be engineered
									into the way data, models and decisions work.
								</p>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="itanz-company-ai-grid">
								{aiPrinciples.map(([title, desc]) => (
									<div key={title}>
										<h3>{title}</h3>
										<p>{desc}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="sustainability" className="itanz-company-sustainability section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Sustainability
								</span>
								<h2 className="sec-title">Responsible Technology for Long-Term Progress</h2>
								<p>
									Sustainable transformation is not only about new systems. It is about
									responsible decisions, resilient operations and technology choices
									that support long-term business, community and environmental value.
								</p>
							</div>
						</div>
					</div>
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-6">
							<div className="itanz-company-sustainability-list">
								{sustainability.map(([title, desc]) => (
									<div key={title}>
										<h3>{title}</h3>
										<p>{desc}</p>
									</div>
								))}
							</div>
						</div>
						<div className="col-lg-6">
							<div className="itanz-company-sustainability-img">
								<img src="/images/company/sustainability-hero.webp" alt="Responsible technology and sustainable transformation visual" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="certifications" className="itanz-company-cert-strip section-gap">
				<div className="container">
					<div className="itanz-company-cert-inner">
						<div className="sec-heading text-center mb-0">
							<span className="sub-title">
								<i className="tji-box"></i>Certifications & Compliance
							</span>
							<h2>Trust should be more than a promise. <br/>It should be verifiable.</h2>
							<p>
								Organizations operating critical systems need confidence in the
								people, practices, partnerships, governance and controls behind the
								technology. iTANZ takes a structured approach to certification,
								security, governance and compliance across the technology lifecycle.
							</p>
							<Link href="/company/certifications-compliance" className="tj-primary-btn mt-4">
								<span className="btn-text">
									<span>View Current Certifications & Credentials</span>
								</span>
								<span className="btn-icon">
									<i className="tji-arrow-right-long"></i>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<ItanzCta
				title="Understanding, Engineered."
				desc="Organizations do not need more technology. They need technology that understands how they work. iTANZ helps move from complexity to clarity, and from transformation ambition to lasting impact."
				buttonText="Start a Conversation"
				buttonUrl="/contact/book-a-consultation?source=%2Fcompany"
			/>
		</>
	);
};

export default ItanzCompanyPage;
