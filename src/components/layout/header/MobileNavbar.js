import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";

const MobileSubmenu = ({ item }) => {
	if (!item?.submenu?.length) {
		return null;
	}

	return item.submenu.map(submenuItem =>
		submenuItem?.items?.length ? (
			<li key={submenuItem.id} className="mobile-menu-group">
				<span className="mobile-menu-group-title">{submenuItem.name}</span>
				<ul>
					{submenuItem.items.map(child => (
						<li key={child.id}>
							<Link href={child.path || "#"}>{child.name}</Link>
						</li>
					))}
				</ul>
			</li>
		) : (
			<li key={submenuItem.id}>
				<Link href={submenuItem.path || "#"}>{submenuItem.name}</Link>
			</li>
		)
	);
};

const MobileNavbar = () => {
	const navItems = getNavItems().filter(item => item.name !== "Home");

	return (
		<div className="hamburger_menu">
			<div className="mobile_menu mean-container">
				<div className="mean-bar">
					<Link
						href="#nav"
						className="meanmenu-reveal"
						style={{ right: 0, left: "auto" }}
					>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</Link>
					<nav className="mean-nav">
						<ul>
							{navItems.map(item =>
								item.submenu?.length ? (
									<MobileMenuItem
										key={item.id}
										text={item.name}
										url={item.path || "#"}
									>
										<MobileSubmenu item={item} />
									</MobileMenuItem>
								) : (
									<li key={item.id}>
										<Link href={item.path || "#"}>{item.name}</Link>
									</li>
								)
							)}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileNavbar;
