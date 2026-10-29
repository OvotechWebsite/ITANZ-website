import ServiceCard5 from "@/components/shared/cards/ServiceCard5";
import Link from "next/link";
import { solutionAreaCards } from "./data";

const ItanzSolutionsAreas = () => {
	const lastItemIdx = solutionAreaCards.length - 1;

	return (
		<section className="tj-service-section-5 section-gap itanz-solution-areas-alt">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="sec-heading style-4 text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Our Solution Areas
							</span>
							<h2 className="sec-title title-anim">
								End-to-end capabilities across platforms, data, cloud, security
								and delivery.
							</h2>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="service-wrapper">
							{solutionAreaCards.map((service, idx) => (
								<ServiceCard5
									key={service.title}
									service={service}
									idx={idx}
									lastItemIdx={lastItemIdx}
								/>
							))}
						</div>
						<div className="service-bottom-text">
							<p className="desc">
								<span>
									<i className="tji-box"></i>Compare this option with the
									existing solutions section, then{" "}
									<Link href="/solutions">view all solutions</Link>.
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzSolutionsAreas;
