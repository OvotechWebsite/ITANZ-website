"use client";

import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import Link from "next/link";

const NavDropdown = ({ item }) => {
	if (!item?.submenu?.length) {
		return null;
	}

	const hasGroups = item.submenu.some(submenuItem => submenuItem?.items?.length);
	const isSolutionsMenu = item.name === "Solutions";

	if (hasGroups) {
		return (
			<ul
				className={`sub-menu header__mega-menu mega-menu mega-menu-pages ${
					isSolutionsMenu ? "itanz-solutions-mega" : ""
				}`}
			>
				<li>
					<div className="mega-menu-wrapper">
						{item.desc ? (
							<div className="mega-menu-intro">
								<h6 className="mega-menu-title">{item.name}</h6>
								<p>{item.desc}</p>
							</div>
						) : (
							""
						)}
						{item.submenu.map(group => (
							<div key={group.id} className="mega-menu-pages-single">
								<div className="mega-menu-pages-single-inner">
									<h6 className="mega-menu-title">{group.name}</h6>
									<div className="mega-menu-list">
										{group.items?.map(child => (
											<Link
												key={child.id}
												href={child.path || "#"}
												className={child.isActive ? "active" : ""}
											>
												{child.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</li>
			</ul>
		);
	}

	return (
		<ul className="sub-menu">
			{item.submenu.map(child => (
				<li key={child.id} className={child.isActive ? "current-menu-item" : ""}>
					<Link href={child.path || "#"}>
						{child.name}
						{child.desc ? <span className="tj-nav-desc">{child.desc}</span> : ""}
					</Link>
				</li>
			))}
		</ul>
	);
};

const Navbar = () => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems()
		.filter(item => item.name !== "Home")
		.map(item => makeActiveLink(item));

	return (
		<div className="menu-area d-none d-lg-inline-flex align-items-center">
			<nav className="mainmenu">
				<ul>
					{navItems.map(item => (
						<li
							key={item.id}
							className={`${item.submenu?.length ? "has-dropdown" : ""} ${
								item.name === "Solutions" ? "itanz-nav-solutions" : ""
							} ${item.name === "Partners" ? "itanz-nav-partners" : ""} ${
								item.isActive ? "current-menu-ancestor" : ""
							}`}
						>
							<Link href={item.path || "#"}>{item.name}</Link>
							<NavDropdown item={item} />
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
