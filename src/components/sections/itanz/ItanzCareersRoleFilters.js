"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ItanzTalentNetworkModal from "./ItanzTalentNetworkModal";

const roleFilters = [
	{ label: "All Roles", value: "all" },
	{ label: "Technology", value: "technology" },
	{ label: "Consulting", value: "consulting" },
	{ label: "Data & AI", value: "data-ai" },
	{ label: "Delivery", value: "delivery" },
	{ label: "Managed Services", value: "managed-services" },
];

const getRoleSearchText = role =>
	[
		role.title,
		role.category,
		role.need,
		role.location,
		role.workModel,
		role.level,
		role.summary,
	]
		.filter(Boolean)
		.join(" ")
		.toLowerCase();

const matchesRoleFilter = (role, filter) => {
	if (filter === "all") {
		return true;
	}

	const text = getRoleSearchText(role);

	if (filter === "technology") {
		return [
			"enterprise platforms",
			"crm",
			"integration",
			"oracle",
			"netsuite",
			"salesforce",
			"engineer",
			"technology",
		].some(term => text.includes(term));
	}

	if (filter === "consulting") {
		return text.includes("consultant") || text.includes("consulting");
	}

	if (filter === "data-ai") {
		return text.includes("data") || text.includes("analytics") || text.includes("ai");
	}

	if (filter === "delivery") {
		return text.includes("delivery") || text.includes("client-facing");
	}

	if (filter === "managed-services") {
		return (
			text.includes("managed services") ||
			text.includes("support") ||
			text.includes("operations")
		);
	}

	return true;
};

const ItanzCareersRoleFilters = ({ roles }) => {
	const [activeRoleFilter, setActiveRoleFilter] = useState("all");
	const [query, setQuery] = useState("");

	const visibleRoles = useMemo(() => {
		const searchTerm = query.trim().toLowerCase();

		return roles.filter(role => {
			const matchesSearch = searchTerm
				? getRoleSearchText(role).includes(searchTerm)
				: true;

			return matchesRoleFilter(role, activeRoleFilter) && matchesSearch;
		});
	}, [activeRoleFilter, query, roles]);

	const hasActiveFilters = activeRoleFilter !== "all" || query.trim();

	const clearFilters = () => {
		setActiveRoleFilter("all");
		setQuery("");
	};

	return (
		<div className="itanz-careers-role-browser mt-5">
			<div className="itanz-careers-role-filter-head">
				<div>
					<strong>{visibleRoles.length}</strong>
					<span>{visibleRoles.length === 1 ? " role shown" : " roles shown"}</span>
				</div>
				<label className="itanz-careers-role-search">
					<i className="tji-search"></i>
					<input
						type="search"
						value={query}
						placeholder="Search roles, skills or platforms"
						onChange={event => setQuery(event.target.value)}
					/>
				</label>
			</div>

			<div className="itanz-careers-filter-group" aria-label="Filter roles by capability">
				{roleFilters.map(filter => (
					<button
						key={filter.value}
						type="button"
						className={activeRoleFilter === filter.value ? "active" : ""}
						onClick={() => setActiveRoleFilter(filter.value)}
					>
						{filter.label}
					</button>
				))}
			</div>

			{hasActiveFilters ? (
				<button type="button" className="itanz-careers-clear-filters" onClick={clearFilters}>
					Clear filters
				</button>
			) : (
				""
			)}

			{visibleRoles.length ? (
				<div className="row row-gap-4 mt-4">
					{visibleRoles.map(role => (
						<div key={role.id} className="col-xl-4 col-md-6">
							<Link
								className="itanz-career-role-card"
								href={`/careers/${role.slug || role.id}`}
							>
								<span className="itanz-career-role-icon">
									<i className={role.iconName}></i>
								</span>
								<span className="itanz-career-role-meta">
									<em>{role.category}</em>
									<em>{role.need}</em>
								</span>
								<strong>{role.title}</strong>
								<span>{role.summary}</span>
								<small>
									{role.location} / {role.workModel} / {role.level}
								</small>
							</Link>
						</div>
					))}
				</div>
			) : (
				<div className="itanz-careers-empty-state">
					<span className="itanz-career-role-icon">
						<i className="tji-search"></i>
					</span>
					<h3>No matching roles right now.</h3>
					<p>
						Try a different filter, or submit your profile so iTANZ can keep you
						in mind for future opportunities.
					</p>
					<div className="itanz-talent-actions">
						<button type="button" className="text-btn" onClick={clearFilters}>
							<span className="btn-text">
								<span>Reset Filters</span>
							</span>
						</button>
						<ItanzTalentNetworkModal />
					</div>
				</div>
			)}
		</div>
	);
};

export default ItanzCareersRoleFilters;
