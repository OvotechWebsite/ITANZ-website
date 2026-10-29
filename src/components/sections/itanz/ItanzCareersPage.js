import ItanzCareersRoleFilters from "./ItanzCareersRoleFilters";
import ItanzCompanyStickyNav from "./ItanzCompanyStickyNav";
import ItanzCta from "./ItanzCta";
import ItanzHashButton from "./ItanzHashButton";
import ItanzLifeAtItanzVideos from "./ItanzLifeAtItanzVideos";
import ItanzTalentNetworkModal from "./ItanzTalentNetworkModal";

const pageNav = [
	["Life at iTANZ", "life-at-itanz"],
	["Open Roles", "open-roles"],
	["Why Join", "why-join-itanz"],
	["Watch Videos", "itanz-videos"],
	["Hiring Process", "hiring-process"],
	["Talent Network", "talent-network"],
];

const cultureCards = [
	{
		title: "Trust",
		desc: "<b>Be Trusted to Own What Matters.</b><br/>Work in a culture where your ideas are heard, your judgement is valued and ownership is encouraged. At iTANZ, trust means having the space to take responsibility, solve meaningful problems and grow through real experience.",
		icon: "tji-award",
	},
	{
		title: "Learning",
		desc: "<b>Keep Learning. Keep Moving Forward.</b><br/>Build experience across Oracle, NetSuite, Salesforce, integration, data, AI and managed services. Work alongside experienced teams, expand your capabilities and develop skills that remain relevant as enterprise technology evolves.",
		icon: "tji-innovative",
	},
	{
		title: "Collaboration",
		desc: "<b>Build Better, Together.</b><br/>Great transformation is never a solo effort. Collaborate across consulting, technology, data and delivery teams, learn from different perspectives and contribute your own thinking to solutions built around real business challenges.",
		icon: "tji-user",
	},
	{
		title: "Meaningful Impact",
		desc: "<b>See Your Work Make a Difference.</b><br/>Contribute to technology environments that support governments, utilities and enterprises where reliability matters. Your work goes beyond delivering systems&mdash;it helps organisations operate better, make smarter decisions and move forward with confidence.",
		icon: "tji-service-3",
	},
];

const whyJoinCards = [
	{
		title: "Enterprise Projects",
		desc: "Work on platforms and operating environments that support critical services and large-scale organisations.",
	},
	{
		title: "Platform Exposure",
		desc: "Build experience across enterprise applications, cloud, integration, analytics, AI and managed operations.",
	},
	{
		title: "Growth Pathways",
		desc: "Develop across consulting, technical, delivery and managed-services tracks as your capability expands.",
	},
];

const hiringSteps = [
	{
		step: "01",
		title: "Apply or Submit Profile",
		desc: "Share your profile for a role or join the talent network for future opportunities.",
	},
	{
		step: "02",
		title: "Recruitment Screening",
		desc: "The team reviews your background, interests, availability and role alignment.",
	},
	{
		step: "03",
		title: "Technical or Functional Discussion",
		desc: "Meet relevant leaders to discuss skills, delivery experience and how you approach real problems.",
	},
	{
		step: "04",
		title: "Final Conversation",
		desc: "Confirm mutual fit, offer details and the onboarding pathway for your next step with iTANZ.",
	},
];

const ItanzCareersPage = ({ roles = [] }) => {
	return (
		<>
			<section className="itanz-careers-hero section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-7">
							<div className="sec-heading">
								<span className="sub-title">
									<i className="tji-box"></i>Careers at iTANZ
								</span>
								<h1 className="sec-title">
									Build the Systems Behind Digital Transformation
								</h1>
								<p>
									iTANZ is growing a team of technology, platform, integration,
									analytics and delivery professionals who want to work on
									meaningful transformation challenges.
								</p>
								<div className="itanz-contact-actions">
									<ItanzHashButton text="View Open Roles" targetId="open-roles" />
									<ItanzTalentNetworkModal isTextBtn={true} />
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="itanz-careers-hero-card">
								<img
									src="/images/careers/hero-image.webp"
									alt="iTANZ careers and enterprise technology team visual"
								/>
								{/* <div className="itanz-careers-hero-proof">
									<span>Enterprise Platforms</span>
									<span>Integration & Data</span>
									<span>Managed Services</span>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzCompanyStickyNav
				items={pageNav}
				basePath="/careers"
				visibleFromId="life-at-itanz"
				ariaLabel="Careers sections"
			/>

			<section id="life-at-itanz" className="tj-choose-section itanz-careers-culture section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Life at iTANZ
								</span>
								<h2 className="sec-title">
									A Culture Built Around Trust, Learning and Delivery
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{cultureCards.map((card, idx) => (
							<div key={card.title} className="col-xl-3 col-md-6">
								<div className="itanz-careers-culture-card">
									<i className={card.icon}></i>
									<h3>{card.title}</h3>
									<p dangerouslySetInnerHTML={{ __html: card.desc }}></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="open-roles" className="itanz-careers-roles section-gap">
				<div className="container">
					<div className="row align-items-end row-gap-3">
						<div className="col-lg-8">
							<div className="sec-heading mb-0">
								<span className="sub-title">
									<i className="tji-box"></i>Open Roles
								</span>
								<h2 className="sec-title">
									Find Your Next Technology Role at iTANZ
								</h2>
								<p>
									Current opportunities should stay fresh and grouped by capability,
									region and experience level. These cards can be updated as active
									openings are approved.
								</p>
							</div>
						</div>
						<div className="col-lg-4 text-lg-end">
							<ItanzTalentNetworkModal />
						</div>
					</div>
					<ItanzCareersRoleFilters roles={roles} />
				</div>
			</section>

			<section id="why-join-itanz" className="itanz-careers-why section-gap">
				<div className="container">
					<div className="row align-items-center row-gap-4">
						<div className="col-lg-5">
							<div className="sec-heading mb-0">
								<span className="sub-title">
									<i className="tji-box"></i>Why Join iTANZ
								</span>
								<h2 className="sec-title">
									Meaningful Technology Work with Room to Grow
								</h2>
								<p>
									iTANZ brings together meaningful transformation work, exposure
									to enterprise platforms, learning, global projects and a culture
									of accountability.
								</p>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="itanz-careers-why-grid">
								{whyJoinCards.map(card => (
									<div key={card.title} className="itanz-careers-why-card">
										<h3>{card.title}</h3>
										<p>{card.desc}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<ItanzLifeAtItanzVideos sectionClassName="itanz-careers-life-videos" />

			<section id="hiring-process" className="itanz-careers-process section-gap">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center">
								<span className="sub-title">
									<i className="tji-box"></i>Hiring Process
								</span>
								<h2 className="sec-title">
									A Clear Hiring Process for Confident Candidates
								</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{hiringSteps.map(item => (
							<div key={item.step} className="col-lg-3 col-md-6">
								<div className="itanz-careers-process-card">
									<span>{item.step}</span>
									<h3>{item.title}</h3>
									<p>{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="talent-network" className="itanz-careers-profile section-gap">
				<div className="container">
					<div className="itanz-careers-profile-inner">
						<div>
							<span className="sub-title">
								<i className="tji-box"></i>Talent Network
							</span>
							<h2>Do Not See the Right Role Yet?</h2>
							<p>
								Submit your profile so iTANZ can consider you for future roles
								across platforms, data, integration, AI, delivery and managed
								services.
							</p>
						</div>
						<ItanzTalentNetworkModal className="btn-dark" />
					</div>
				</div>
			</section>

			<ItanzCta
				title="Build what the future depends on"
				desc="Join iTANZ to solve enterprise-scale challenges, grow with high-performing teams and create technology that delivers lasting impact."
				buttonText="View Open Roles"
				buttonUrl="#open-roles"
			/>
		</>
	);
};

export default ItanzCareersPage;
