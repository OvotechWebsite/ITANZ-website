export const caseStudyOverview = {
	title: "Built for complexity. Proven in the real world.",
	desc:
		"See how iTANZ helps organizations modernize critical systems, connect operations and turn transformation into measurable outcomes.",
	metaTitle: "Case Studies | iTANZ Transformation Proof",
	metaDescription:
		"Explore iTANZ case studies mapped by solution, service and product capability.",
};

const img = id => ({
	gridImage: `/images/case-studies/case-${id}/${id}b.webp`,
	bannerImage: `/images/case-studies/case-${id}/${id}a.webp`,
});

export const caseStudies = [
	{
		id: 1,
		slug: "three-metering-head-ends-auditable-billing-flow",
		filter: "utilities",
		category: "Utilities",
		evidence: "Verified Production Proof",
		sector: "Energy, Power & Utilities",
		title: "When Three Metering Head-Ends Become One Auditable Billing Flow",
		subtitle:
			"How iTANZ modernized Oracle Utilities at multi-million-customer scale and stayed to run the billing cycle.",
		primaryCategory: "Utilities Solutions",
		platforms: "Oracle Utilities, UBR patterns, Managed Services",
		alsoMapsTo: "Enterprise SI, Integration, IoT & Edge, Data quality",
		intro:
			"iTANZ took a production Oracle Utilities environment through a CC&B-to-CCS modernization, consolidated three metering head-end vendors into Oracle MDM, and now runs the billing cycle. Customer identity and detailed engagement documents remain confidential.",
		problemLead:
			"A revenue engine cannot modernize at the expense of billing continuity or auditability.",
		problem: [
			"Three separate head-end vendors had to feed one governed meter-data flow.",
			"The move from CC&B to Customer Cloud Service had to protect account, meter and financial reconciliation data.",
			"Meter determinants needed to remain clean, explainable and provable before becoming charges.",
			"The operating model had to extend beyond go-live into ongoing billing-cycle assurance.",
		],
		solutionLead:
			"Modernize the billing core, normalize meter data, prove the cycle, then stay for operate.",
		solution: [
			"Designed the target CCS architecture around deterministic, reproducible rating.",
			"Consolidated three head-end feeds into Oracle MDM with validation and estimation/editing rules.",
			"Used Oracle integration patterns, parallel-run and balance-to-balance controls as migration safeguards.",
			"Continued operating the production cycle after transformation.",
		],
		technologies:
			"Oracle Utilities CC&B, Oracle Customer Cloud Service, Oracle Utilities MDM, Oracle Integration Cloud, iTANZ UBR reference patterns, Managed Services",
		impactLabel: "Impact We Created",
		impacts: [
			["Multi-million-customer scale", "The delivery proof is described at multi-million-customer scale."],
			["3 head-ends to 1 MDM flow", "Three metering head-end vendors were consolidated into Oracle MDM."],
			["Build plus operate", "iTANZ now runs the billing cycle rather than ending accountability at go-live."],
			["Auditability preserved", "Rating remains deterministic and reproducible."],
		],
		conclusion:
			"The hard part of utilities modernization is keeping the revenue engine trustworthy while everything around it changes.",
		source:
			"Source basis: iTANZ Product & Services Explorer - Oracle practice proof, Oracle meter-to-cash / AMI-MDM use cases and outbound proof language.",
		...img(1),
	},
	{
		id: 2,
		slug: "council-finance-rates-assets-one-platform",
		filter: "government",
		category: "Government",
		evidence: "Production Platform Proof",
		sector: "Government / Local Council",
		title: "When a Council Stops Running Finance, Rates and Assets as Separate Businesses",
		subtitle:
			"One IP-owned system of record across whole-of-council operations, with one integration layer underneath it.",
		primaryCategory: "Citizen Services & Government Solutions",
		platforms: "ICP, Oracle, NetSuite, OCI",
		alsoMapsTo: "Enterprise SI, Integration, Managed Services",
		intro:
			"ICP is described as iTANZ's built, operational local-government platform, deployed across councils. It spans finance, procurement, inventory, assets, property rating, revenue, works and citizen services.",
		problemLead:
			"Whole-of-council work breaks when each function owns a different system and integration becomes the operating model.",
		problem: [
			"Ageing finance, rates and asset platforms create separate sources of truth.",
			"Staff and citizens cross multiple systems to finish one journey.",
			"Finance and rating cycles must be protected during migration.",
			"Councils still need statutory change, release management and support after implementation.",
		],
		solutionLead:
			"Consolidate the council domain first, then migrate and operate it in controlled stages.",
		solution: [
			"Mapped council functions, statutory obligations and data into ICP reference configuration.",
			"Connected iTANZ-owned modules through one integration layer.",
			"Migrated financial, property, asset and payroll data with reconciliation.",
			"Supported the platform after go-live, including statutory and release change.",
		],
		technologies:
			"iTANZ ICP, Oracle Cloud Infrastructure, NetSuite, Oracle platform components, iTANZ Integration Layer, OIC patterns, Employment Hero where applicable",
		impactLabel: "Impact We Created",
		impacts: [
			["One council platform", "Finance, rates, assets, works and citizen services sit within one domain model."],
			["Deployed today", "The Explorer states ICP is built, operational and deployed across councils."],
			["Single source of truth", "Fragmented ownership is replaced with one integrated operating record."],
			["Statutory-ready design", "Compliance and auditability are built into the operating pattern."],
		],
		conclusion:
			"A council transformation is not an ERP replacement if citizens, rates, assets and works still live apart.",
		source:
			"Source basis: iTANZ Product & Services Explorer - ICP product definition, whole-of-council use cases, deployment proof and claim guardrails.",
		...img(2),
	},
	{
		id: 3,
		slug: "bbq-procurement-payment-budget-control",
		filter: "government",
		category: "Government",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Local Council",
		title: "From We Need a New BBQ to a Bank-Ready Payment Without Losing Budget Control",
		subtitle:
			"The Pormpuraaw scenario connects requisition, budget validation, PO, goods receipt, three-way match and executive sign-off.",
		primaryCategory: "Citizen Services & Government Solutions",
		platforms: "ICP, iTANZ Procurement, iTANZ Finance, NetSuite",
		alsoMapsTo: "Business Process Automation, Finance, Procurement",
		intro:
			"Use Case A follows a Parks & Gardens purchase from need identification to payment release. The actors, amounts and values are demonstration data; the workflow represents iTANZ Procurement and iTANZ Finance capabilities powered by NetSuite.",
		problemLead:
			"Procurement control weakens when budget checks, approvals, purchasing and payment live in separate manual steps.",
		problem: [
			"Requisitions can be raised without confirming budget availability.",
			"Manual PO creation weakens approval traceability.",
			"Invoices can arrive before goods receipt is confirmed.",
			"Payment release needs segregation of duties and executive approval.",
		],
		solutionLead:
			"Put control at the point of commitment, then carry the same record all the way to the bank file.",
		solution: [
			"The system performs an instant budget check before the request proceeds.",
			"Approval automatically creates the purchase order and encumbers budget.",
			"Goods receipt triggers three-way match and notifies Finance.",
			"ABA bank file and payment advice are generated only after final approval.",
		],
		technologies:
			"iTANZ Procurement, iTANZ Finance, NetSuite, workflow and notifications, budget control, encumbrance, three-way matching, ABA bank-file generation",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["Budget-aware from the start", "The requisition cannot silently bypass configured budget control."],
			["PO creation automated", "Approval converts the requisition into a PO without manual re-keying."],
			["Matched before payment", "Goods receipt connects procurement and invoice validation."],
			["Gated bank release", "Bank file generation occurs only after Finance Manager and CEO approval."],
		],
		conclusion:
			"Good procurement automation is not faster clicking. It is fewer control gaps between intention and cash leaving the bank.",
		source: "Source basis: Pormpuraaw demo deck, Use Case A - slides 18-22.",
		...img(3),
	},
	{
		id: 4,
		slug: "bank-reconciliation-exception-management",
		filter: "finance",
		category: "Finance",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Local Council",
		title: "When Daily Bank Reconciliation Becomes Exception Management Instead of Transaction Matching",
		subtitle: "Bulk auto-match, many-to-one exception handling and audit-ready sign-off in iTANZ Finance.",
		primaryCategory: "Finance & Enterprise Applications",
		platforms: "ICP, iTANZ Finance, NetSuite",
		alsoMapsTo: "Business Process Automation, Financial Controls",
		intro:
			"Use Case B demonstrates a daily council bank reconciliation in iTANZ Finance: import statement, bulk auto-match, exception handling and final sign-off.",
		problemLead:
			"High-volume reconciliation becomes expensive when every transaction gets the same manual attention.",
		problem: [
			"Bank statements and system transactions must be compared at volume every day.",
			"Grouped payments, direct credits, fees and timing differences need controlled exception handling.",
			"Many-to-one matching must be validated, not improvised.",
			"Finance needs a reproducible audit trail.",
		],
		solutionLead:
			"Automate the obvious matches and put finance attention only where judgement is needed.",
		solution: [
			"Imported ANZ statements in OFX/BAI2 format.",
			"Used amount, date and reference to drive bulk matching.",
			"Surfaced remaining items in an exception worklist.",
			"Generated reconciliation reports only when balances agreed.",
		],
		technologies:
			"iTANZ Finance, NetSuite, OFX / BAI2 import, bulk auto-match rules, many-to-one matching, GL exception handling, reconciliation reporting",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["Majority auto-matched", "Routine matches clear automatically while staff investigate exceptions."],
			["Illustrative demo match", "The demo dashboard shows auto-match performance as demo data, not a public KPI."],
			["Complex exceptions supported", "Grouped payments, fees, credits and timing differences stay inside one workflow."],
			["Reconciled by evidence", "The process ends when system and bank closing balances agree."],
		],
		conclusion:
			"The value of reconciliation automation is using humans only where the bank and ledger genuinely disagree.",
		source: "Source basis: Pormpuraaw demo deck, Use Case B - slides 25, 28 and 31.",
		...img(4),
	},
	{
		id: 5,
		slug: "building-permit-statutory-clock",
		filter: "government",
		category: "Government",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Local Council",
		title: "A Building Permit Workflow That Knows When the Statutory Clock Should Stop",
		subtitle: "From citizen submission to fee, RFI, permit and finance posting without losing the record.",
		primaryCategory: "Citizen Services & Government Solutions",
		platforms: "ICP, Planning & Building, CPM, e-Services",
		alsoMapsTo: "Oracle, NetSuite, Integration, Document Management",
		intro:
			"Use Case C demonstrates a building application journey across e-Services, Planning & Building, Council Property Management, document management and NetSuite GL.",
		problemLead:
			"A permit journey is both a citizen experience and a statutory control process.",
		problem: [
			"Applicants need guided digital submission instead of incomplete forms.",
			"Fees, payment status and assessment must stay synchronized.",
			"Missing documents must pause the statutory clock and preserve correspondence.",
			"Permit, fee and supporting documents must remain traceable as one record.",
		],
		solutionLead:
			"Make the portal, statutory workflow, payment engine and finance ledger behave as one journey.",
		solution: [
			"Validated online submission before back-office processing.",
			"Automatically created and issued invoices through CPM.",
			"Paused and resumed the statutory clock around RFI events.",
			"Posted payment transactions to the finance GL through an automated batch.",
		],
		technologies:
			"iTANZ e-Services Portal, iTANZ Planning & Building, iTANZ CPM, Document Management, iTANZ Finance, NetSuite, integration batch posting",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["Guided submission", "Validation reduces incomplete applications before they reach officers."],
			["Clock integrity", "Payment starts the statutory clock and RFI events pause it."],
			["One application record", "Forms, correspondence, fee and permit remain connected."],
			["Revenue closes to GL", "CPM transactions post to finance accounts through automated batch."],
		],
		conclusion:
			"Digital permitting only works when citizen convenience and statutory defensibility are designed together.",
		source: "Source basis: Pormpuraaw demo deck, Use Case C - slides 35, 38, 41, 44, 47 and 50.",
		...img(5),
	},
	{
		id: 6,
		slug: "failed-burner-fully-costed-work-order",
		filter: "asset-field",
		category: "Asset & Field Operations",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Asset-Intensive Operations",
		title: "From a Failed Burner to a Fully Costed Work Order - Without a Manual Journal",
		subtitle:
			"A reactive maintenance flow that connects procurement, inventory, work execution, asset history and finance.",
		primaryCategory: "Asset, Works & Field Operations",
		platforms: "ICP, Works & Assets, Procurement, Finance",
		alsoMapsTo: "Oracle, NetSuite, Integration",
		intro:
			"Use Case E follows replacement of a faulty BBQ burner through procurement and maintenance, connecting NetSuite procurement and inventory with Oracle Works & Assets.",
		problemLead:
			"Maintenance cost becomes unreliable when parts, work orders, labor and finance are recorded in separate places.",
		problem: [
			"Purchased parts may not become immediately visible to maintenance.",
			"Manual planning increases risk of wrong materials or missing labor capture.",
			"Asset history fragments if work is not linked to the operational asset.",
			"Finance often receives a manual journal instead of activity-level maintenance cost.",
		],
		solutionLead:
			"Make the part, the work order and the financial transaction one connected chain.",
		solution: [
			"Approved purchase requests create POs and encumber budget in NetSuite.",
			"Goods receipt updates inventory and synchronizes the part to Works & Assets.",
			"Work-order templates define material, labor and overhead requirements.",
			"Automated integration pushes financial transactions to NetSuite GL.",
		],
		technologies:
			"iTANZ Procurement, iTANZ Inventory, NetSuite, iTANZ Works & Assets, Oracle, work-order templates, asset lifecycle history, automated GL integration",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["Inventory visible to work", "Goods receipt makes the part available to the work order."],
			["Cost captured at source", "Material, labor and overhead are recorded at activity level."],
			["Asset history stays whole", "The maintenance event updates the asset lifecycle record."],
			["No manual finance journal", "Financial transactions synchronize to the GL automatically."],
		],
		conclusion:
			"Asset management becomes financially useful when operational work and the ledger stop being separate truths.",
		source: "Source basis: Pormpuraaw demo deck, Use Case E - slides 61 and 64.",
		...img(6),
	},
	{
		id: 7,
		slug: "asset-you-buy-becomes-asset-you-depreciate",
		filter: "finance",
		category: "Finance",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Local Council",
		title: "The Asset You Buy Becomes the Asset You Depreciate - Without Re-Keying",
		subtitle: "Direct capitalisation, dual records, automated depreciation and AASB 116 revaluation in one lifecycle.",
		primaryCategory: "Finance & Asset Management",
		platforms: "ICP, Fixed Assets, Procurement, Council Asset Management",
		alsoMapsTo: "NetSuite, Oracle, Integration, Compliance",
		intro:
			"Use Case F continues the BBQ purchase into fixed-asset accounting, showing purchase details flowing into iTANZ Fixed Assets and linked operational asset records.",
		problemLead:
			"A purchased item becomes an audit problem when procurement, fixed assets, operations and the GL all require separate re-entry.",
		problem: [
			"Finance can miss capitalizable purchases if the fixed-asset decision is detached from goods receipt.",
			"Re-keying creates duplicate work and inconsistent records.",
			"Finance and operations can describe the same physical asset differently.",
			"Depreciation and revaluation need repeatable rules and audit trail.",
		],
		solutionLead:
			"Convert once, keep two synchronized views and let the accounting engine carry recurring work.",
		solution: [
			"Detected capitalisation threshold at goods receipt.",
			"Converted purchase details into fixed assets without re-keying.",
			"Created a linked operational asset record in Oracle.",
			"Automated depreciation and annual AASB 116 revaluation journals.",
		],
		technologies:
			"iTANZ Procurement, NetSuite, iTANZ Fixed Assets, iTANZ Finance GL, iTANZ Council Asset Management, Oracle, automated depreciation, AASB 116 workflow",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["No double entry", "Supplier, cost, date and description flow into the fixed-asset record."],
			["Two views, one asset", "Finance gets the accounting record while operations gets the linked maintenance record."],
			["Recurring accounting automated", "Monthly depreciation posts to GL without manual journals."],
			["Audit-ready revaluation", "Old and new values, journals and treatments are retained for audit."],
		],
		conclusion:
			"The strongest asset-control design begins before depreciation - at the moment the organization receives what it bought.",
		source: "Source basis: Pormpuraaw demo deck, Use Case F - slides 67, 70, 73 and 76.",
		...img(7),
	},
	{
		id: 8,
		slug: "septic-application-to-permit-revenue-trail",
		filter: "government",
		category: "Government",
		evidence: "Functional Demonstration Scenario",
		sector: "Government / Environmental Health",
		title: "From Septic Application to Permit - One Workflow, One Revenue Trail",
		subtitle: "Automated invoicing, mobile inspection, rectification and permit issuance connected back to finance.",
		primaryCategory: "Citizen Services & Government Solutions",
		platforms: "ICP, Environmental Health, CPM, e-Services",
		alsoMapsTo: "Oracle, NetSuite, Mobile Field Work, Integration",
		intro:
			"Use Case H demonstrates environmental-health work across application review, automated invoicing, payment status, mobile inspection, rectification, permit generation and finance posting.",
		problemLead:
			"Environmental-health work fails citizens and auditors when application, payment, inspection evidence and finance are disconnected.",
		problem: [
			"Officers need supporting documents and payment status before scheduling compliance work.",
			"Field findings, pass/fail criteria, observations and photos must remain attached to the record.",
			"Non-compliance must create a controlled rectification path.",
			"Fees must reconcile to the right income accounts and drill back to the application.",
		],
		solutionLead:
			"Treat the application, inspection, permit and fee as one governed transaction.",
		solution: [
			"Created invoices in CPM and exposed payment through e-Services.",
			"Updated Environmental Health and portal status when payment was confirmed.",
			"Captured inspection criteria, observations and photos on mobile.",
			"Generated permits and pushed daily fee transactions to NetSuite GL.",
		],
		technologies:
			"iTANZ Environmental Health, Oracle, iTANZ CPM, e-Services Portal, mobile inspection workflow, iTANZ Finance GL, NetSuite, automated revenue batch",
		impactLabel: "Operational Impact Demonstrated",
		impacts: [
			["Real-time status", "Payment and compliance events update staff and citizen views."],
			["Field evidence retained", "Inspection criteria, observations and photos become part of the application record."],
			["Controlled non-compliance", "Rectification uses an explicit On Hold and re-inspection path."],
			["Audit-ready revenue", "Daily fees reconcile to GL and drill back to the application."],
		],
		conclusion:
			"A permit is only one output. The real system has to carry payment, inspection evidence, compliance and revenue together.",
		source: "Source basis: Pormpuraaw demo deck, Use Case H - slides 84, 87 and 90.",
		...img(8),
	},
	{
		id: 9,
		slug: "clinical-documents-coded-work",
		filter: "healthcare",
		category: "Healthcare",
		evidence: "Live Product Deployment",
		sector: "Healthcare / UK NHS Primary Care",
		title: "When Clinical Documents Become Coded Work Instead of Administrative Backlog",
		subtitle:
			"OvoTech's live UK NHS primary-care anchor turns unstructured correspondence into structured, human-gated operations.",
		primaryCategory: "Health Solutions",
		platforms: "OvoTech",
		alsoMapsTo: "Data & AI, Integration, Clinical Workflow, Analytics",
		intro:
			"OvoTech is iTANZ's AI-native clinical operations platform, with Medical Coding live in UK NHS primary care. It operates over existing clinical systems rather than replacing them.",
		problemLead:
			"The clinical record may be digital, but a large share of the work arriving around it is still unstructured.",
		problem: [
			"Clinical correspondence and discharge summaries require repetitive reading, coding and filing.",
			"Manual handling can create coding backlogs and missed actionable items.",
			"Automation must explain its source and keep clinical decisions human-gated.",
			"Practices need structured intelligence from the documents they already receive.",
		],
		solutionLead:
			"Read, code, action and file the work while keeping a person in control of every clinical item.",
		solution: [
			"Ingested documents through NHS integration paths and existing clinical estates.",
			"Used clinical NLP to identify concepts and code them to SNOMED CT UK.",
			"Created task lists for clinical and admin roles.",
			"Recorded actions in an immutable audit trail and exposed structured data for analytics.",
		],
		technologies:
			"OvoTech, EMIS / SystmOne integration, NHS IM1 API / NHS ITK, SNOMED CT UK, BioBERT / ClinicalBERT patterns, FHIR, HL7, human-in-the-loop review",
		impactLabel: "Impact We Created",
		impacts: [
			["Medical Coding live", "Medical Coding is identified as the live Phase 1 anchor in UK NHS primary care."],
			["Less manual handling", "Repetitive reading, coding and filing work shifts away from staff."],
			["National-standard data", "Clinical terms are structured to SNOMED CT UK."],
			["Traceable by design", "Outputs point back to source records and remain human-gated."],
		],
		conclusion:
			"Healthcare AI becomes useful when it carries administrative load without asking clinicians to surrender accountability.",
		source:
			"Source basis: iTANZ Product & Services Explorer - OvoTech product definition, live status, UK NHS primary-care positioning and guardrails.",
		...img(9),
	},
	{
		id: 10,
		slug: "whatsapp-compliance-salesforce-customer-conversations",
		filter: "salesforce",
		category: "Salesforce",
		evidence: "Solution Case Pattern",
		sector: "Banking / Retail / Customer-Facing Enterprise",
		title: "Getting WhatsApp Customer Conversations Out of the Compliance Blind Spot",
		subtitle: "A governed Salesforce pattern that connects messaging, customer identity, data and human-gated AI.",
		primaryCategory: "Salesforce CRM & CX",
		platforms: "Salesforce, Data Cloud, Marketing Cloud",
		alsoMapsTo: "Data & AI, Integration, Compliance, Agentforce",
		intro:
			"Governed WhatsApp engagement is positioned as a Salesforce play for regulated and high-volume customer environments in Pakistan and the Middle East.",
		problemLead:
			"Customers already use WhatsApp; the risk appears when the enterprise behaves as if those conversations do not exist.",
		problem: [
			"Customer conversations can move into informal channels outside record-keeping.",
			"Customer identity is fragmented across core systems and channels.",
			"AI and personalization pilots become unsafe on incomplete customer records.",
			"Compliance teams need retained, auditable message history.",
		],
		solutionLead:
			"Bring messaging under governance first, then build the data foundation AI can safely use.",
		solution: [
			"Moved messaging onto WhatsApp Business API and governed Marketing Cloud workflows.",
			"Unified customer identity and consent through Salesforce Data Cloud / Customer 360.",
			"Retained channel records for conduct, consent and communication history.",
			"Grounded Agentforce use cases on a trusted customer foundation.",
		],
		technologies:
			"Salesforce Marketing Cloud, WhatsApp Business API, Salesforce Data Cloud / Customer 360, Agentforce, MuleSoft, integration APIs, audit and consent controls",
		impactLabel: "Impact to Validate / What Changes",
		impacts: [
			["Compliance perimeter restored", "Customer messaging moves from shadow channels into governed workflows."],
			["Trusted customer foundation", "Identity and consent can be unified before personalization or AI."],
			["AI grounded on evidence", "Agent outputs are designed to be traceable and human-approved."],
			["Outcome must be baselined", "Claims should be sized from each prospect's current baseline."],
		],
		conclusion:
			"The first Salesforce AI project should not be add an agent. It should be make the customer record trustworthy enough for an agent.",
		source:
			"Source basis: iTANZ Product & Services Explorer - Salesforce practice, BFSI/retail messaging, Data Cloud, Agentforce and demand-generation guardrails.",
		...img(10),
	},
	{
		id: 11,
		slug: "governed-api-led-integration",
		filter: "integration",
		category: "Integration",
		evidence: "Solution Case Pattern",
		sector: "Cross-Industry Enterprise",
		title: "When Every New Connection Stops Becoming Another Point-to-Point Liability",
		subtitle:
			"Replacing brittle interfaces with governed API-led architecture so billing, CRM, ERP, GIS and field systems can move as one.",
		primaryCategory: "Integration (System & Data)",
		platforms: "OIC, MuleSoft, Boomi, IBM Integration",
		alsoMapsTo: "Enterprise SI, Data Engineering, Managed Operations",
		intro:
			"Integration is a dedicated iTANZ service line with heritage in complex multi-vendor environments. This is a reusable solution pattern rather than a named customer claim.",
		problemLead:
			"A portfolio of systems is not an integrated business when every change can silently break another interface.",
		problem: [
			"Point-to-point links accumulate until no one has a trusted map of the estate.",
			"Customer, asset or account changes may need re-keying.",
			"Every new channel becomes another bespoke connector.",
			"Interface failures may surface only after operational or financial consequences.",
		],
		solutionLead:
			"Map the business flows, build reusable APIs, add observability, then operate the integration layer as a product.",
		solution: [
			"Mapped existing integrations and prioritized them by business risk and value.",
			"Defined an API-led target architecture on the best-fit middleware.",
			"Built real-time, batch and event-driven flows with data-quality controls.",
			"Added monitoring, reconciliation, error handling and reprocessing.",
		],
		technologies:
			"Oracle Integration Cloud, SOA Suite, MuleSoft, Boomi, IBM Integration Bus, API-led architecture, event / batch / real-time pipelines, observability and reconciliation",
		impactLabel: "Impact to Validate / What Changes",
		impacts: [
			["Reusable connectivity", "New consumers can reuse governed APIs."],
			["Less re-keying", "One system change can propagate to the systems that need to know."],
			["Observable operations", "Monitoring and reprocessing make failure visible and recoverable."],
			["Measured from baseline", "Interface count, change lead time and incidents are the right proof metrics."],
		],
		conclusion:
			"Integration becomes strategic when it stops being invisible glue and starts being governed infrastructure.",
		source:
			"Source basis: iTANZ Product & Services Explorer - Integration service definition and Enterprise SI fragmented-estate use case.",
		...img(11),
	},
	{
		id: 12,
		slug: "oracle-estate-oci-migration",
		filter: "cloud",
		category: "Cloud",
		evidence: "Solution Case Pattern",
		sector: "Enterprise / Banking / Public Sector",
		title: "Moving the Oracle Estate to OCI Without Turning Cloud Migration Into a Big-Bang Risk",
		subtitle: "A phased landing-zone pattern for secure migration, reconciliation, resilience and long-run operations.",
		primaryCategory: "Infrastructure (Cloud & On-Prem)",
		platforms: "Oracle Cloud Infrastructure",
		alsoMapsTo: "Enterprise SI, Integration, Managed Services, Security",
		intro:
			"OCI migration and landing-zone patterns sit within iTANZ's Oracle and infrastructure practices. The narrative is presented as a proven solution pattern.",
		problemLead:
			"Cloud mandates fail when the organization starts moving workloads before designing the place they are moving into.",
		problem: [
			"Ageing Oracle Database or Exadata estates may be approaching refresh.",
			"A cloud mandate without a landing zone leaves tenancy, network, identity and cost governance unresolved.",
			"Big-bang moves risk data and interfaces around mission-critical Oracle systems.",
			"Day-two patching, scaling, cost governance and resilience must work in production.",
		],
		solutionLead:
			"Design the governed target first, migrate in reconcilable stages, and keep a tested rollback position.",
		solution: [
			"Designed OCI landing zones covering tenancy, network, identity and guardrails.",
			"Selected migration paths for Oracle Database, Exadata or Autonomous Database.",
			"Migrated and reconciled data in stages with tested cutover and rollback.",
			"Operated OCI after migration across patching, scaling, resilience, cost and security.",
		],
		technologies:
			"Oracle Cloud Infrastructure, Oracle Database, Exadata, Autonomous Database, IDCS / IDM, Oracle Integration Cloud, cloud operations, cost governance, resilience",
		impactLabel: "Impact to Validate / What Changes",
		impacts: [
			["Governed landing zone first", "Identity, network, guardrails and cost controls are designed before migration."],
			["Lower-risk cutover", "Phased migration, reconciliation and rollback reduce big-bang exposure."],
			["Production lineage", "ICP is hosted on OCI in production and the Explorer cites enterprise OCI patterns."],
			["Outcome needs client baseline", "Run cost, resilience and scalability should be measured against the current estate."],
		],
		conclusion:
			"A cloud migration is credible when the target state is governable on day two, not just reachable on day one.",
		source:
			"Source basis: iTANZ Product & Services Explorer - Oracle OCI migration / landing-zone use case and Infrastructure service definition.",
		...img(12),
	},
	{
		id: 13,
		slug: "procure-to-pay-controlled-netsuite-workflow",
		filter: "finance",
		category: "Finance",
		evidence: "NetSuite Case Study",
		sector: "Finance / Procurement",
		title: "From Purchase Request to Supplier Payment - Controlled in One Connected Workflow",
		subtitle:
			"How iTANZ connects procurement and finance processes on Oracle NetSuite so purchasing teams can move faster without losing budget, approval or audit control.",
		primaryCategory: "NetSuite Finance & Procurement",
		platforms: "Oracle NetSuite, iTANZ Procurement, iTANZ Finance",
		alsoMapsTo: "NetSuite, Procurement, Finance, Workflow Automation, Audit Controls",
		intro:
			"This case study follows a connected procure-to-pay journey across request, budget check, approval, purchase order, receipt, invoice match and payment sign-off.",
		problemLead:
			"Procurement processes often lose control when requests, budget checks, approvals and finance activity sit in disconnected tools.",
		problem: [
			"Purchase requests often move across email, spreadsheets, procurement tools and finance systems.",
			"Manual budget checks and repeated data entry limit visibility into committed spend.",
			"Delayed approvals and fragmented handoffs increase the risk of inconsistent purchasing information.",
			"Supplier payment controls can weaken when receipt, invoice matching and final approval are separated.",
		],
		solutionLead:
			"iTANZ connects the full procurement and finance cycle on Oracle NetSuite, carrying the same controlled record from request to payment.",
		solution: [
			"Validated available budget before the request proceeds.",
			"Routed the request through the required approval hierarchy and generated the purchase order.",
			"Recorded receipt and confirmed invoice matching before payment activity continued.",
			"Applied final payment controls and retained the complete approval and transaction history.",
		],
		technologies:
			"Oracle NetSuite, iTANZ Procurement, iTANZ Finance, approval workflows, budget validation, purchase orders, goods receipt, invoice matching, payment controls",
		impactLabel: "Business Outcomes",
		impacts: [
			["Real-time budget control", "Validate available funds and make committed spend visible before the purchase proceeds."],
			["Fewer manual handoffs", "Replace email chasing and repetitive purchase-order creation with configured workflows."],
			["Controlled supplier payments", "Apply invoice matching and multi-level approval before funds are released."],
			["Complete audit trail", "Retain who approved, when they approved and the budget position at the time of decision."],
		],
		conclusion:
			"Procure-to-pay works best when procurement is treated as one connected business process rather than a series of isolated transactions. Integration creates the continuity needed to make purchasing easier to control, track and scale.",
		source:
			"Source basis: iTANZ NetSuite procure-to-pay web copy and iTANZ NetSuite business-process case-study content.",
		...img(13),
	},
	{
		id: 14,
		slug: "daily-bank-reconciliation-automated-matching",
		filter: "finance",
		category: "Finance",
		evidence: "NetSuite Case Study",
		sector: "Finance / Treasury",
		title: "Accelerating Daily Bank Reconciliation with Automated Matching",
		subtitle:
			"How iTANZ Finance on Oracle NetSuite reduces repetitive matching work and isolates the items that need finance review.",
		primaryCategory: "NetSuite Finance & Reconciliation",
		platforms: "Oracle NetSuite, iTANZ Finance",
		alsoMapsTo: "NetSuite, Finance, Treasury, Reconciliation, Exception Management",
		intro:
			"This case study follows a daily bank reconciliation journey across statement import, automated matching, exception handling, many-to-one resolution and final sign-off.",
		problemLead:
			"Daily bank reconciliation becomes slow and error-prone when finance teams manually compare every system transaction with every bank line.",
		problem: [
			"High daily transaction volumes create repetitive matching work for finance teams.",
			"Consolidated bank payments, fees, direct credits and timing differences make reconciliation harder to control.",
			"Unmatched items can move into offline spreadsheets or informal follow-up.",
			"Finance needs a reliable history of who matched, reviewed and signed off the reconciliation.",
		],
		solutionLead:
			"iTANZ Finance on Oracle NetSuite automates routine matching and focuses finance effort on the exceptions that need judgement.",
		solution: [
			"Imported the prior-day bank statement into iTANZ Finance in the supported format.",
			"Used amount, date and reference information to clear routine transactions against configured rules.",
			"Presented unmatched lines, fees, direct credits, timing differences and grouped payments in an exception worklist.",
			"Supported many-to-one matching and final sign-off once the cleared balance agreed with the bank closing balance.",
		],
		technologies:
			"Oracle NetSuite, iTANZ Finance, bank statement import, auto-match rules, exception worklists, many-to-one matching, reconciliation reporting",
		impactLabel: "Business Outcomes",
		impacts: [
			["Reduce repetitive matching", "Allow automation to clear routine items before finance begins exception review."],
			["Structured exception handling", "Keep unresolved items visible in a controlled worklist rather than offline spreadsheets."],
			["Support complex matches", "Resolve consolidated payments and many-to-one scenarios with validated totals."],
			["Audit-ready reconciliation", "Record the user, date and matching method for completed reconciliation activity."],
		],
		conclusion:
			"Daily reconciliation becomes more valuable when finance teams stop spending equal effort on every transaction and focus attention where the bank and ledger genuinely need review.",
		source:
			"Source basis: iTANZ NetSuite bank reconciliation web copy and iTANZ NetSuite business-process case-study content.",
		...img(14),
	},
	{
		id: 15,
		slug: "purchase-to-fixed-assets-finance-lifecycle",
		filter: "finance",
		category: "Finance",
		evidence: "NetSuite Case Study",
		sector: "Finance / Asset Management",
		title: "Connecting Procurement, Fixed Assets and Finance from Day One",
		subtitle:
			"How iTANZ helps qualifying purchases move into Oracle NetSuite Fixed Assets using the original procurement data.",
		primaryCategory: "NetSuite Fixed Assets",
		platforms: "Oracle NetSuite, NetSuite Fixed Assets, iTANZ Procurement",
		alsoMapsTo: "NetSuite, Fixed Assets, Procurement, Finance, Asset Governance",
		intro:
			"This case study follows a purchase-to-fixed-asset journey across purchase, receipt, capitalisation, depreciation and valuation history.",
		problemLead:
			"Procurement and fixed-asset records become difficult to govern when finance teams must recreate asset information after purchase.",
		problem: [
			"Finance teams often re-enter supplier, cost and purchase information into fixed-asset records.",
			"Separate procurement and asset records increase the risk of inconsistent information.",
			"Delayed capitalisation can lead to missed depreciation and difficult asset-to-GL reconciliation.",
			"Asset history becomes harder to review when purchase, setup, depreciation and valuation are disconnected.",
		],
		solutionLead:
			"iTANZ connects procurement and fixed-asset accounting so qualifying purchases can move into the asset lifecycle without duplicate entry.",
		solution: [
			"Confirmed goods receipt in iTANZ Procurement using the original purchase-order record.",
			"Applied configured value and useful-life rules to identify purchases that should become fixed assets.",
			"Transferred supplier, cost, purchase date and description into the fixed-asset record.",
			"Supported asset setup, recurring depreciation, GL posting and valuation history for review and audit.",
		],
		technologies:
			"Oracle NetSuite, NetSuite Fixed Assets, iTANZ Procurement, goods receipt, capitalisation rules, depreciation, GL posting, asset valuation history",
		impactLabel: "Business Outcomes",
		impacts: [
			["No duplicate data entry", "Reuse approved procurement data instead of recreating the asset record manually."],
			["Timely capitalisation", "Prompt finance when a received item meets the configured asset criteria."],
			["Automated recurring accounting", "Process depreciation across active assets and post the resulting journals to the GL."],
			["Stronger asset governance", "Retain purchase, setup, depreciation and valuation history against the asset record."],
		],
		conclusion:
			"Fixed-asset control is strongest when the asset lifecycle begins at procurement. Connecting purchase data to asset accounting reduces rework and gives finance a cleaner audit path.",
		source:
			"Source basis: iTANZ NetSuite fixed-assets web copy and iTANZ NetSuite business-process case-study content.",
		...img(15),
	},
	{
		id: 16,
		slug: "service-revenue-to-finance-gl",
		filter: "finance",
		category: "Finance",
		evidence: "NetSuite Case Study",
		sector: "Local Government / Service Revenue",
		title: "Connecting Citizen and Service Payments with Oracle NetSuite Finance",
		subtitle:
			"How iTANZ integrates service-payment operations with Oracle NetSuite Finance to reduce manual journals and create an auditable path to the general ledger.",
		primaryCategory: "NetSuite Finance & Revenue",
		platforms: "Oracle NetSuite, iTANZ Finance",
		alsoMapsTo: "NetSuite, Finance, Revenue, Local Government, Integration",
		intro:
			"This case study follows a service-revenue journey across online, EFTPOS and counter payments, operational payment capture, automated batch posting and GL reconciliation.",
		problemLead:
			"Service revenue becomes harder to control when operational payments and finance ledgers are separated.",
		problem: [
			"Service fees may be collected across online portals, EFTPOS terminals and counter payments.",
			"Finance may rely on manual journals and spreadsheet reconciliation when operational platforms sit outside the ledger.",
			"Revenue can become harder to trace back to the originating application, permit, licence or service.",
			"Finance teams need source totals, GL postings and exceptions to reconcile through one controlled path.",
		],
		solutionLead:
			"iTANZ transfers approved operational payment transactions into Oracle NetSuite Finance through a controlled integration and reconciliation process.",
		solution: [
			"Captured online, EFTPOS and over-the-counter payments against the relevant service transaction.",
			"Moved the day's operational payment transactions into Oracle NetSuite Finance at the configured cut-off.",
			"Mapped each fee type to the appropriate general-ledger account during automated posting.",
			"Enabled finance users to reconcile source totals to the GL batch and drill back to the original payment detail.",
		],
		technologies:
			"Oracle NetSuite, iTANZ Finance, operational payments, scheduled batch integration, GL posting, revenue mapping, reconciliation, transaction drill-back",
		impactLabel: "Business Outcomes",
		impacts: [
			["Automated revenue posting", "Reduce manual journal creation by moving approved operational transactions into Finance through a scheduled integration."],
			["Multi-channel visibility", "Bring online, EFTPOS and counter receipts into one finance reconciliation process."],
			["Daily control and exception review", "Compare source totals with the GL batch and flag any variance for investigation."],
			["End-to-end traceability", "Drill from the finance entry back to the original service and payment detail."],
		],
		conclusion:
			"Service-revenue integration gives finance a cleaner path from citizen or customer payment to the general ledger, reducing manual journals while preserving traceability.",
		source:
			"Source basis: iTANZ NetSuite service-revenue web copy and iTANZ NetSuite business-process case-study content.",
		...img(16),
	},
	{
		id: 17,
		slug: "secure-resilient-aws-cloud-foundation-financial-services",
		filter: "cloud",
		category: "Cloud",
		evidence: "Illustrative Solution Scenario",
		sector: "Financial Services",
		title: "Building a Secure, Resilient AWS Cloud Foundation for a Growing Financial Services Business",
		subtitle:
			"How iTANZ can help financial-services organisations move selected workloads to AWS with governance, security, resilience and cost visibility built in from the start.",
		primaryCategory: "AWS Cloud Transformation",
		platforms: "AWS, AWS Control Tower, AWS Organizations, Amazon VPC, IAM, Amazon EC2, Amazon RDS / Aurora, Amazon S3, CloudWatch, CloudTrail, Security Hub, GuardDuty",
		alsoMapsTo: "AWS, Cloud Migration, Financial Services, Security, Resilience, FinOps, Managed Cloud Operations",
		intro:
			"A rapidly growing financial-services organisation was expanding its digital customer base while continuing to operate critical applications on ageing on-premise infrastructure. The business wanted to move selected workloads to AWS, improve resilience and create a more scalable foundation without compromising security, regulatory control or service continuity.",
		problemLead:
			"The organisation did not simply need infrastructure in the cloud. It needed a governed cloud operating model.",
		problem: [
			"Capacity planning depended on purchasing infrastructure ahead of demand.",
			"Customer-facing applications were vulnerable to traffic spikes and infrastructure bottlenecks.",
			"Disaster-recovery processes relied heavily on manual intervention.",
			"Development, test and production environments were not consistently governed.",
			"Security controls differed across workloads and teams, while monitoring remained fragmented.",
			"Legacy databases and tightly coupled applications made cloud migration risky.",
			"Management wanted greater visibility of cloud cost before scaling adoption.",
		],
		solutionLead:
			"iTANZ designed a phased AWS transformation that separated cloud foundation, migration and application modernization rather than attempting a high-risk big-bang move.",
		solution: [
			"Established a governed AWS landing zone with multi-account architecture, identity controls, network segmentation, logging, backup policies and tagging standards.",
			"Connected AWS securely to the existing data centre so dependent workloads could move in controlled stages.",
			"Assessed applications and databases by business criticality, dependency, complexity and cloud suitability before migration waves began.",
			"Used runbooks, replication, cutover testing, rollback planning, data validation and performance validation before production transition.",
			"Redesigned customer-facing applications around Multi-Availability-Zone deployment, load balancing and Auto Scaling.",
			"Embedded least-privilege access, threat detection, encryption, monitoring, backup and web-application protection into the target architecture.",
			"Introduced observability and cloud-cost governance so workloads could be reviewed for utilisation, sizing and lifecycle optimisation after migration.",
		],
		technologies:
			"Amazon Web Services, AWS Organizations, AWS Control Tower, Amazon VPC, AWS Identity and Access Management, Amazon EC2, Elastic Load Balancing, Amazon EC2 Auto Scaling, Amazon RDS / Amazon Aurora, Amazon S3, AWS Database Migration Service, Amazon CloudWatch, AWS CloudTrail, AWS Security Hub, Amazon GuardDuty, AWS Backup, AWS WAF, Amazon CloudFront, AWS Cost Explorer, AWS Budgets",
		impactLabel: "Impact We Created",
		impacts: [
			["Scalable AWS foundation", "Created a cloud foundation capable of supporting continued digital growth."],
			["Stronger governance", "Improved separation and control across production, non-production, security and shared-service environments."],
			["Greater resilience", "Reduced dependence on individual infrastructure components and improved readiness for traffic spikes and recovery events."],
			["Faster provisioning", "Enabled new environments to be provisioned through more structured cloud controls."],
			["Improved security visibility", "Consolidated monitoring, logging and threat visibility across cloud workloads."],
			["Better cost control", "Gave management clearer visibility into infrastructure utilisation and cloud expenditure."],
		],
		conclusion:
			"Successful cloud transformation is not measured by how many servers move to AWS. It is measured by whether the organisation becomes more resilient, more governable and easier to scale after the migration than it was before it.",
		source:
			"Source basis: iTANZ AWS illustrative financial-services case-study content. Publishing note: this is an illustrative solution scenario and should not be presented as a verified customer success story until supported by an approved customer reference.",
		...img(17),
	},
];

export const caseStudyFilters = [
	{ label: "All", value: "all" },
	{ label: "Utilities", value: "utilities" },
	{ label: "Government", value: "government" },
	{ label: "Finance", value: "finance" },
	{ label: "Asset & Field", value: "asset-field" },
	{ label: "Healthcare", value: "healthcare" },
	{ label: "Salesforce", value: "salesforce" },
	{ label: "Integration", value: "integration" },
	{ label: "Cloud", value: "cloud" },
];

export const caseStudyPages = caseStudies.reduce((pages, item) => {
	pages[item.slug] = item;
	return pages;
}, {});
