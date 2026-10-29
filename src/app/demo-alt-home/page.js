import navItems from "@/../public/fakedata/nav-items.json";
import {
	industries,
	ipAcceleratorCards,
	reasons,
	solutionAreaCards,
	stats,
	successStories,
} from "@/components/sections/itanz/data";
import { buildMetadata } from "@/libs/seo";

export const metadata = {
	...buildMetadata({
		title: "Alternate Home Demo | iTANZ",
		description: "A lightweight alternate home page demo for iTANZ using the current website content.",
		path: "/demo-alt-home",
	}),
	robots: { index: false, follow: false, nocache: true },
};

const partnerNames = ["Oracle", "NetSuite", "Salesforce", "Informatica", "MuleSoft", "Tableau"];

const solutionDemoImages = [
	"/images/solutions/oracle.webp",
	"/images/solutions/integration.webp",
	"/images/solutions/analytics-reporting.webp",
	"/images/solutions/agentic-ai.webp",
	"/images/solutions/netsuite.webp",
	"/images/solutions/salesforce.webp",
	"/images/solutions/hero/icp.webp",
];

const industryDemoImages = [
	"/images/industries/government-public-sector.webp",
	"/images/industries/utilities-energy.webp",
	"/images/industries/industries-main.webp",
];

const InertLink = ({ children, className = "" }) => (
	<span className={className} role="link" aria-disabled="true" tabIndex={-1}>
		{children}
	</span>
);

const DemoAltNav = () => {
	const visibleNavItems = navItems.filter(item => item.name !== "Home");

	return (
		<header className="vineta-demo-header">
			<InertLink className="vineta-demo-logo">
				<img src="/images/logos/logo.webp" alt="iTANZ" />
			</InertLink>
			<nav className="vineta-demo-nav">
				{visibleNavItems.map(item => (
					<div key={item.name} className="vineta-demo-nav-item">
						<InertLink>{item.name}</InertLink>
						{item.submenu ? (
							<div className={`vineta-demo-dropdown ${item.name === "Solutions" ? "is-mega" : ""}`}>
								{item.name === "Solutions" ? (
									item.submenu.map(group => (
										<div key={group.name} className="vineta-demo-mega-column">
											<strong>{group.name}</strong>
											{group.items?.map(child => (
												<InertLink key={child.name}>{child.name}</InertLink>
											))}
										</div>
									))
								) : (
									item.submenu.map(child => (
										<InertLink key={child.name}>{child.name}</InertLink>
									))
								)}
							</div>
						) : (
							""
						)}
					</div>
				))}
			</nav>
			<div className="vineta-demo-actions">
				<span>Search</span>
				<span>Contact</span>
			</div>
		</header>
	);
};

const DemoAltHome = () => {
	return (
		<main className="vineta-demo-home">
			<div className="vineta-demo-topbar">
				<span>Enterprise Technology</span>
				<span>Platform Modernisation</span>
				<span>Managed Capability</span>
			</div>

			<DemoAltNav />

			<section className="vineta-demo-hero">
				<div className="vineta-demo-hero-copy">
					<span>iTANZ Technologies</span>
					<h1>Enterprise Technology for Organisations That Cannot Afford to Stop</h1>
					<p>
						iTANZ modernises critical systems, connects data and builds lasting digital foundations.
					</p>
					<div className="vineta-demo-hero-actions">
						<InertLink>Explore Solutions</InertLink>
						<InertLink>Speak to an Expert</InertLink>
					</div>
				</div>
				<div className="vineta-demo-hero-media">
					<img src="/images/solutions/analytics-reporting.webp" alt="Connected enterprise technology platform visual" />
					<img src="/images/solutions/integration.webp" alt="Enterprise cloud and data transformation visual" />
				</div>
			</section>

			<section className="vineta-demo-partners">
				{partnerNames.map(name => (
					<span key={name}>{name}</span>
				))}
			</section>

			<section className="vineta-demo-categories">
				{ipAcceleratorCards.map(card => (
					<article key={card.title} className="vineta-demo-category">
						<span>{card.title}</span>
						<em>{card.desc}</em>
					</article>
				))}
			</section>

			<section className="vineta-demo-section">
				<div className="vineta-demo-heading">
					<span>Our Solutions</span>
					<h2>Direct Routes to Business Value Across Platforms, Data and Capability.</h2>
				</div>
				<div className="vineta-demo-product-grid">
					{solutionAreaCards.map((service, idx) => (
						<article className="vineta-demo-product-card" key={service.title}>
							<div className="vineta-demo-product-img">
								<img
									src={solutionDemoImages[idx % solutionDemoImages.length]}
									alt={`${service.title} solution visual`}
								/>
								<span>Explore</span>
							</div>
							<div className="vineta-demo-product-body">
								<small>{service.list?.[0]}</small>
								<h3>{service.title}</h3>
								<p>{service.desc}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="vineta-demo-banners">
				{industries.slice(0, 3).map((industry, idx) => (
					<article
						key={industry.title}
						style={{
							backgroundImage: `url('${industryDemoImages[idx % industryDemoImages.length]}')`,
						}}
					>
						<span>Industries We Serve</span>
						<strong>{industry.title}</strong>
						<em>{industry.desc}</em>
					</article>
				))}
			</section>

			<section className="vineta-demo-stats">
				{stats.map(stat => (
					<div key={stat.text}>
						<strong>{stat.value}{stat.symbol}</strong>
						<span>{stat.text}</span>
					</div>
				))}
			</section>

			<section className="vineta-demo-section vineta-demo-why">
				<div className="vineta-demo-heading">
					<span>Why iTANZ</span>
					<h2>Transformation-First Thinking, Delivered with Discipline.</h2>
				</div>
				<div className="vineta-demo-reason-grid">
					{reasons.map(reason => (
						<article key={reason.title}>
							<strong>{reason.title}</strong>
							<p>{reason.desc}</p>
						</article>
					))}
				</div>
			</section>

			<section className="vineta-demo-section">
				<div className="vineta-demo-heading">
					<span>Client Success</span>
					<h2>Proof-Led Transformation Stories.</h2>
				</div>
				<div className="vineta-demo-story-grid">
					{successStories.map(story => (
						<article key={story.title}>
							<img src={story.img2} alt="" />
							<span>{story.category}</span>
							<strong>{story.title}</strong>
						</article>
					))}
				</div>
			</section>

			<footer className="vineta-demo-footer">
				<div>
					<img src="/images/logos/logo-2.webp" alt="iTANZ" />
					<p>Ready to accelerate your digital future? Speak to an expert.</p>
				</div>
				{navItems.filter(item => item.name !== "Home").slice(0, 4).map(item => (
					<div key={item.name}>
						<strong>{item.name}</strong>
						{item.submenu?.slice(0, 5).map(child => (
							<InertLink key={child.name}>{child.name}</InertLink>
						))}
					</div>
				))}
			</footer>
		</main>
	);
};

export default DemoAltHome;
