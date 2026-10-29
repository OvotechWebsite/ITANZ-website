
import navItems from "../../public/fakedata/nav-items"

const getNavItems = () => {
	const order = [
		"Home",
		"Solutions",
		"Industries",
		"Success Stories",
		"Insights",
		"Partners",
		"Careers",
		"Discover iTANZ",
		"Contact Us",
		"Investor Relations",
	];
	const getOrder = item => {
		const idx = order.indexOf(item.name);
		return idx === -1 ? order.length : idx;
	};

	return navItems ? [...navItems].sort((a, b) => getOrder(a) - getOrder(b)) : []
};

export default getNavItems;
