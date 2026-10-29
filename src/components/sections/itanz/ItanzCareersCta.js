import Link from "next/link";

const ItanzCareersCta = () => {
	return (
		<section className="itanz-careers-cta section-gap">
			<div className="container">
				<div
					className="itanz-careers-cta-inner"
					style={{
						backgroundImage: "url('/images/cta/hr-section-cta.webp')",
					}}
				>
					<div className="itanz-careers-cta-content">
						<h2>Build What the Future Depends On</h2>
						<p>
							Join iTANZ to solve enterprise-scale challenges, grow with
							high-performing teams and create technology that delivers lasting
							impact.
						</p>
						<Link className="tj-primary-btn btn-dark" href="/careers">
							<span className="btn-text">
								<span>Explore Careers</span>
							</span>
							<span className="btn-icon">
								<i className="tji-arrow-right-long"></i>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzCareersCta;
