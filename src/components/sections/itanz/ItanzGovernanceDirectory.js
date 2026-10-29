"use client";

import { gsap, ScrollTrigger } from "@/libs/gsap.config";
import { useEffect, useMemo, useRef, useState } from "react";

const governanceTabs = [
	{
		id: "board-committees",
		label: "Board & Committees",
		sections: [
			{
				title: "Board of Directors",
				count: "7 members",
				columns: ["Name", "Designation", "Category"],
				rows: [
					[
						"Syed Ahmed Bilal",
						"Chairperson",
						"Non-Executive Director",
						"Provides board-level oversight, governance direction and strategic guidance for iTANZ as it continues to strengthen its enterprise technology and public-market responsibilities.",
					],
					[
						"Syed Asim Zafar",
						"Chief Executive Officer",
						"Executive Director",
						"Leads iTANZ's business strategy, technology direction and transformation agenda, with responsibility for execution, growth and stakeholder value creation.",
					],
					[
						"Muhammad Amin Shakir",
						"Executive Director",
						"Executive Director",
						"Supports executive oversight, financial discipline and operating governance across iTANZ's corporate and technology transformation activities.",
					],
					[
						"Amer Khan",
						"Director",
						"Non-Executive Director",
						"Contributes independent board perspective on growth, governance and market-facing execution across iTANZ's enterprise technology ecosystem.",
					],
					[
						"Muhammad Yousuf",
						"Director",
						"Independent Director",
						"Supports independent oversight, audit discipline and transparent governance practices aligned with shareholder and regulatory expectations.",
					],
					[
						"Amir Raza Khan",
						"Director",
						"Independent Director",
						"Brings independent judgement to board and committee responsibilities, including governance, remuneration and long-term organisational accountability.",
					],
					[
						"Hibatullah Khan",
						"Director",
						"Non-Executive Director",
						"Provides non-executive oversight and governance perspective to support responsible decision-making and sustainable corporate growth.",
					],
				],
			},
			{
				title: "Key Management Personnel",
				count: "2 personnel",
				columns: ["Name", "Designation"],
				rows: [
					[
						"Syed Asim Zafar",
						"Chief Executive Officer",
						"Leads iTANZ's strategic direction, operating execution and enterprise technology growth agenda.",
					],
					[
						"Muhammad Amin Shakir",
						"Chief Financial Officer",
						"Oversees financial management, reporting discipline and corporate controls supporting transparent business operations.",
					],
				],
			},
			{
				title: "Audit Committee",
				count: "4 members",
				columns: ["Name", "Committee Role"],
				rows: [
					["Muhammad Yousuf", "Chairperson / Independent Director"],
					["Amir Raza Khan", "Member / Independent Director"],
					["Hibatullah Khan", "Member / Non-Executive Director"],
					["Amer Khan", "Member / Non-Executive Director"],
				],
			},
			{
				title: "HR & Remuneration Committee",
				count: "3 members",
				columns: ["Name", "Committee Role"],
				rows: [
					["Amir Raza Khan", "Chairperson / Independent Director"],
					["Syed Asim Zafar", "Member / Executive Director"],
					["Amer Khan", "Member / Non-Executive Director"],
				],
			},
		],
	},
	{
		id: "corporate-officers",
		label: "Corporate Officers",
		sections: [
			{
				title: "Statutory and Advisory Functions",
				columns: ["Function", "Name or Organisation"],
				rows: [
					["Chief Financial Officer", "Muhammad Amin Shakir"],
					["Company Secretary", "H. M. Maqsood Munshi"],
					["External Auditors", "Alam and Aulakh Chartered Accountants"],
					["Tax Advisor", "Vector Vision"],
					[
						"Share Registrar",
						"F.D. Registrar Services (Private) Limited",
						[
							["Address", "Suite 1705-A, 17th Floor, Saima Trade Tower, I.I. Chundrigar Road, Karachi."],
							["Phone", "(92-21) 32271905-6; (92-21) 32213243"],
							["Fax", "(92-21) 32621233"],
							["Complaint Officer", "S. Mohsin Abbad Zaidi, 021-3227-1906"],
							["Email", "info@fdregistrar.com; complain@fdregistrar.com"],
							["Web", "www.fdregistrar.com"],
						],
					],
				],
			},
		],
	},
	{
		id: "company-information",
		label: "Company Information",
		sections: [
			{
				title: "Company Information",
				columns: ["Information", "Details"],
				rows: [
					["Company Registration Number", "CUIN 0021566"],
					["Registered Office", "623 B, PCSIR II, Lahore"],
					[
						"Regional Office",
						"University of Karachi (ICCB), Building No. 01, Room No. 104, Industrial Linkage and Technology Park, Karachi",
					],
					["Bankers", "Dubai Islamic Bank Limited; Bank Al Habib Limited"],
					["Website", "www.itanzgroup.com"],
				],
			},
		],
	},
];

const classificationLabels = [
	"Independent Director",
	"Non-Executive Director",
	"Executive Director",
];

const splitRole = role => {
	const classification = classificationLabels.find(label => role.includes(label));

	if (!classification) {
		return { role, classification: "" };
	}

	return {
		role: role.replace(classification, "").replace(/\s*\/\s*$/, "").trim(),
		classification,
	};
};

const GovernanceDetail = ({ detail }) => {
	if (Array.isArray(detail)) {
		return (
			<div className="itanz-governance-detail-list">
				{detail.map(([label, value]) => (
					<p key={label}>
						<strong>{label}:</strong> {value}
					</p>
				))}
			</div>
		);
	}

	return <p>{detail}</p>;
};

const ItanzGovernanceTable = ({ section }) => {
	const profileSections = ["Board of Directors", "Key Management Personnel"];
	const showDetails = !profileSections.includes(section.title);

	return (
		<div className="itanz-governance-table-wrap">
			<div className="itanz-governance-subhead">
				<h3>{section.title}</h3>
				{section.count ? <span>{section.count}</span> : ""}
			</div>
			<table className="itanz-governance-table">
				<thead>
					<tr>
						{section.columns.map(column => (
							<th key={column} scope="col">{column}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{section.rows.map(row => {
						const [firstCell, ...remainingCells] = row;
						const visibleCells = remainingCells.slice(0, section.columns.length - 1);
						const detail = remainingCells[section.columns.length - 1];

						return (
							<tr key={`${section.title}-${firstCell}-${visibleCells.join("-")}`}>
								<td data-label={section.columns[0]}>{firstCell}</td>
								{visibleCells.map((cell, index) => {
									const column = section.columns[index + 1];
									const shouldSplitRole = column === "Committee Role";
									const { role, classification } = shouldSplitRole
										? splitRole(cell)
										: { role: cell, classification: "" };
									const isLastVisibleCell = index === visibleCells.length - 1;

									return (
										<td key={`${firstCell}-${column}`} data-label={column}>
											{column === "Category" ? (
												<div className="itanz-governance-role">
													<em>{cell}</em>
												</div>
											) : classification ? (
												<div className="itanz-governance-role">
													{role ? <span>{role}</span> : ""}
													<em>{classification}</em>
												</div>
											) : (
												cell
											)}
											{showDetails && detail && isLastVisibleCell ? (
												<details className="itanz-governance-detail">
													<summary>View details</summary>
													<GovernanceDetail detail={detail} />
												</details>
											) : ""}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const ItanzGovernanceDirectory = () => {
	const [activeTab, setActiveTab] = useState(governanceTabs[0].id);
	const sectionRef = useRef(null);
	const introRef = useRef(null);
	const tabRefs = useRef([]);
	const activeIndex = useMemo(
		() => governanceTabs.findIndex(tab => tab.id === activeTab),
		[activeTab]
	);
	const active = governanceTabs[activeIndex] || governanceTabs[0];

	useEffect(() => {
		const hash = window.location.hash.replace("#governance-", "");
		if (governanceTabs.some(tab => tab.id === hash)) {
			setActiveTab(hash);
		}
	}, []);

	useEffect(() => {
		if (!sectionRef.current || !introRef.current) {
			return undefined;
		}

		const matchMedia = gsap.matchMedia();

		matchMedia.add("(min-width: 1200px)", () => {
			const sectionEl = sectionRef.current;
			const introEl = introRef.current;

			if (!sectionEl || !introEl) {
				return undefined;
			}

			const trigger = ScrollTrigger.create({
				trigger: sectionEl,
				start: "top 120px",
				end: () => `+=${Math.max(0, (sectionEl?.offsetHeight || 0) - (introEl?.offsetHeight || 0) - 120)}`,
				pin: introEl,
				pinSpacing: false,
				invalidateOnRefresh: true,
			});

			return () => trigger.kill();
		});

		return () => matchMedia.revert();
	}, []);

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [activeTab]);

	const selectTab = (id, shouldFocus = false) => {
		setActiveTab(id);
		window.history.replaceState(null, "", `#governance-${id}`);

		if (shouldFocus) {
			const nextIndex = governanceTabs.findIndex(tab => tab.id === id);
			tabRefs.current[nextIndex]?.focus();
		}
	};

	const handleKeyDown = event => {
		const lastIndex = governanceTabs.length - 1;
		let nextIndex = activeIndex;

		if (event.key === "ArrowRight") {
			nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
		} else if (event.key === "ArrowLeft") {
			nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = lastIndex;
		} else {
			return;
		}

		event.preventDefault();
		selectTab(governanceTabs[nextIndex].id, true);
	};

	return (
		<section
			id="governance-directory"
			ref={sectionRef}
			className="itanz-investor-governance-directory section-gap"
		>
			<div className="container">
				<div className="itanz-governance-layout">
					<div ref={introRef} className="itanz-governance-intro">
						<div className="sec-heading mb-0">
							<span className="sub-title">
								<i className="tji-box"></i>Governance
							</span>
							<h2 className="sec-title">
								Governed with clarity.
								<span> Led with accountability.</span>
							</h2>
							<p>
								Explore the leadership structure, committees and statutory functions
								that support responsible oversight, effective controls and transparent
								decision-making at iTANZ.
							</p>
						</div>
					</div>
					<div className="itanz-governance-directory-panel">
						<div className="itanz-governance-directory-head">
							<h3>Governance Directory</h3>
							<div
								className="itanz-governance-tabs"
								role="tablist"
								aria-label="Governance directory"
								onKeyDown={handleKeyDown}
							>
								{governanceTabs.map((tab, idx) => (
									<button
										key={tab.id}
										ref={node => {
											tabRefs.current[idx] = node;
										}}
										type="button"
										id={`governance-tab-${tab.id}`}
										role="tab"
										aria-selected={activeTab === tab.id}
										aria-controls="governance-panel"
										tabIndex={activeTab === tab.id ? 0 : -1}
										className={activeTab === tab.id ? "is-active" : ""}
										onClick={() => selectTab(tab.id)}
									>
										{tab.label}
									</button>
								))}
							</div>
						</div>
						<div
							id="governance-panel"
							role="tabpanel"
							aria-labelledby={`governance-tab-${active.id}`}
							className="itanz-governance-tab-panel"
						>
							{active.sections.map(section => (
								<ItanzGovernanceTable key={section.title} section={section} />
							))}
						</div>
						<p className="itanz-governance-source">
							Source: Official iTANZ governance records. Final names, roles and
							corporate details should be verified by the Company Secretary before
							production release.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ItanzGovernanceDirectory;
