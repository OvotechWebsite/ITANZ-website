import ItanzBrands from "./ItanzBrands";
import ItanzCareersCta from "./ItanzCareersCta";
import ItanzClientSuccess from "./ItanzClientSuccess";
import ItanzCta from "./ItanzCta";
import ItanzHero from "./ItanzHero";
import ItanzIPAccelerators from "./ItanzIPAccelerators";
import ItanzIndustries from "./ItanzIndustries";
import ItanzGlobalPresenceShowcase from "./ItanzGlobalPresenceShowcase";
import ItanzLeadership from "./ItanzLeadership";
import ItanzSolutionsOverview from "./ItanzSolutionsOverview";
import ItanzStats from "./ItanzStats";
import ItanzWhy from "./ItanzWhy";
import { globalPresence } from "./clientSuccessData";

const ItanzHome = () => {
	return (
		<>
			<ItanzHero />
			<ItanzBrands />
			<ItanzIPAccelerators />
			<ItanzSolutionsOverview />
			{/* <ItanzSolutionsAreas /> */}
			<ItanzIndustries />
			<ItanzLeadership />
			<ItanzGlobalPresenceShowcase presence={globalPresence} />
			<ItanzStats />
			<ItanzWhy />
			<ItanzClientSuccess />
			<ItanzCareersCta />
			<ItanzCta />
		</>
	);
};

export default ItanzHome;
