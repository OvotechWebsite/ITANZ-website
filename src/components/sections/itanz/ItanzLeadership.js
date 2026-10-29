import TeamCard from "@/components/shared/cards/TeamCard";
import { leadershipMembers } from "./data";

const ItanzLeadership = () => {
	return (
		<section className="tj-team-section itanz-leadership-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading style-2 text-center">
							<span className="sub-title wow fadeInUp">Meet the Leadership</span>
							<h2 className="sec-title text-anim">
								People Behind <span>iTANZ</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="row leftSwipeWrap">
					{leadershipMembers?.map(member => (
						<div key={member.id} className="col-lg-3 col-sm-6">
							<TeamCard
								teamMember={member}
								showDefaultSocials={false}
								showDefaultEmail={false}
								linkProfile={false}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ItanzLeadership;
