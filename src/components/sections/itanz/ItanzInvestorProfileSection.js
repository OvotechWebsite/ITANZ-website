const profile = {
	label: "English Version",
	img: "/images/investor-relations/profile/company-profile-1.webp",
	title: "iTANZ Corporate Profile",
	desc: "Discover iTANZ’s expertise and capabilities across global markets",
	meta: "PDF · 1.8 MB",
	url: "/images/investor-relations/profile/iTANZ_Corporate_Profile.pdf",
	cta: "View Corporate Profile",
};

const ItanzInvestorProfileSection = () => {
	return (
		<section className="itanz-investor-profile-section section-gap">
			<div className="container">
				<div className="itanz-investor-profile-hero">
					<div className="sec-heading text-center">
						<span className="sub-title">
							<i className="tji-box"></i>Company Profile
						</span>
						<h2 className="sec-title">
							Discover the company behind the capability
						</h2>
						<p>
							Explore iTANZ&apos;s journey, enterprise expertise and technology
							capabilities online, or download the complete company profile for
							easy reference and sharing.
						</p>
					</div>
				</div>
				<div className="row row-gap-4">
					<div className="col-12">
						<a
							className="itanz-investor-profile-card"
							href={profile.url}
							target="_blank"
							rel="noreferrer"
						>
							<div className="itanz-investor-profile-preview">
								<img src={profile.img} alt={`${profile.title} preview`} />
								<span>{profile.label}</span>
							</div>
							<div className="itanz-investor-profile-content">
								<span>{profile.meta}</span>
								<h3>{profile.title}</h3>
								<p>{profile.desc}</p>
								<strong>
									{profile.cta}
									<i className="tji-arrow-up-right"></i>
								</strong>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzInvestorProfileSection;
