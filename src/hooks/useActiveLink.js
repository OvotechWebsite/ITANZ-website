"use client";
import { usePathname } from "next/navigation";

const normalizePath = path => {
	if (!path || path === "#") {
		return "";
	}
	return path !== "/" ? path.replace(/\/$/, "") : path;
};

const checkActive = (item, currentPathname) => {
	const currentPath = normalizePath(currentPathname);
	const itemPath = normalizePath(item?.path);

	if (itemPath && (currentPath === itemPath || currentPath.startsWith(`${itemPath}/`))) {
		return true;
	}

	return item?.submenu?.some(submenuItem => checkActive(submenuItem, currentPath)) ||
		item?.items?.some(childItem => checkActive(childItem, currentPath));
};

export default function useActiveLink() {
	const currentPathname = usePathname();
	const makeActiveLink = modifiableObject => {
		const currentObject = {
			...modifiableObject,
			isActive: checkActive(modifiableObject, currentPathname),
			submenu: modifiableObject?.submenu?.length
				? modifiableObject?.submenu?.map(submenuItem => ({
						...submenuItem,
						isActive: checkActive(submenuItem, currentPathname),
						items: submenuItem?.items?.length
							? submenuItem?.items?.map(item => ({
									...item,
									isActive: checkActive(item, currentPathname),
							  }))
							: [],
				  }))
				: [],
		};

		return currentObject;
	};
	return makeActiveLink;
}
