import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

const getConnectionString = () =>
	process.env.DATABASE_URL ||
	process.env.POSTGRES_URL ||
	process.env.POSTGRES_PRISMA_URL ||
	"";

export const isNeonConfigured = () => Boolean(getConnectionString());

export const getDb = () => {
	const connectionString = getConnectionString();
	if (!connectionString) return null;
	return neon(connectionString);
};

let tablesEnsured = false;

export const ensureTables = async () => {
	if (tablesEnsured) return;
	const sql = getDb();
	if (!sql) return;

	try {
		await sql`
			CREATE TABLE IF NOT EXISTS itanz_contact_submissions (
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				company TEXT,
				email TEXT NOT NULL,
				phone TEXT,
				region TEXT,
				solution TEXT,
				custom_solution TEXT,
				industry TEXT,
				enquiry_type TEXT,
				source_page TEXT,
				message TEXT,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`;

		await sql`
			CREATE TABLE IF NOT EXISTS itanz_talent_submissions (
				id SERIAL PRIMARY KEY,
				full_name TEXT NOT NULL,
				email TEXT NOT NULL,
				phone TEXT,
				city TEXT,
				country TEXT,
				linkedin_url TEXT,
				areas_of_interest TEXT[],
				experience_level TEXT,
				opportunity_type TEXT,
				preferred_locations TEXT[],
				portfolio_url TEXT,
				impact_statement TEXT,
				cv_file_url TEXT,
				source_page TEXT,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`;

		tablesEnsured = true;
	} catch (error) {
		console.error("Unable to ensure Neon DB tables:", error.message);
	}
};

export const saveContactSubmission = async data => {
	const sql = getDb();
	if (!sql) return null;

	await ensureTables();

	const rows = await sql`
		INSERT INTO itanz_contact_submissions (
			name,
			company,
			email,
			phone,
			region,
			solution,
			custom_solution,
			industry,
			enquiry_type,
			source_page,
			message
		) VALUES (
			${data.name || ""},
			${data.company || ""},
			${data.email || ""},
			${data.phone || ""},
			${data.region || ""},
			${data.solution || ""},
			${data.custom_solution || ""},
			${data.industry || ""},
			${data.enquiry_type || ""},
			${data.source_page || ""},
			${data.message || ""}
		)
		RETURNING *;
	`;

	return rows?.[0] || null;
};

export const getContactSubmissions = async (limit = 100) => {
	const sql = getDb();
	if (!sql) return [];

	await ensureTables();

	const rows = await sql`
		SELECT * FROM itanz_contact_submissions
		ORDER BY created_at DESC
		LIMIT ${limit};
	`;

	return rows || [];
};

export const saveTalentSubmission = async data => {
	const sql = getDb();
	if (!sql) return null;

	await ensureTables();

	const rows = await sql`
		INSERT INTO itanz_talent_submissions (
			full_name,
			email,
			phone,
			city,
			country,
			linkedin_url,
			areas_of_interest,
			experience_level,
			opportunity_type,
			preferred_locations,
			portfolio_url,
			impact_statement,
			cv_file_url,
			source_page
		) VALUES (
			${data.full_name || ""},
			${data.email || ""},
			${data.phone || ""},
			${data.city || ""},
			${data.country || ""},
			${data.linkedin_url || ""},
			${data.areas_of_interest || []},
			${data.experience_level || ""},
			${data.opportunity_type || ""},
			${data.preferred_locations || []},
			${data.portfolio_url || ""},
			${data.impact_statement || ""},
			${data.cv_file_url || ""},
			${data.source_page || ""}
		)
		RETURNING *;
	`;

	return rows?.[0] || null;
};

export const getTalentSubmissions = async (limit = 100) => {
	const sql = getDb();
	if (!sql) return [];

	await ensureTables();

	const rows = await sql`
		SELECT * FROM itanz_talent_submissions
		ORDER BY created_at DESC
		LIMIT ${limit};
	`;

	return rows || [];
};

const getAuthSecret = () =>
	process.env.ADMIN_PASSWORD ||
	process.env.AUTH_SECRET ||
	process.env.NEXTAUTH_SECRET ||
	"itanz-admin-secret-2026";

export const createAdminToken = username => {
	const payload = {
		username: username || process.env.ADMIN_USERNAME || "admin",
		exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
	};
	const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
	const signature = crypto
		.createHmac("sha256", getAuthSecret())
		.update(data)
		.digest("base64url");
	return `${data}.${signature}`;
};

export const verifyAdminToken = token => {
	if (!token || typeof token !== "string") return null;
	const parts = token.split(".");
	if (parts.length !== 2) return null;
	const [data, signature] = parts;
	const expectedSignature = crypto
		.createHmac("sha256", getAuthSecret())
		.update(data)
		.digest("base64url");

	if (signature !== expectedSignature) return null;

	try {
		const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
		if (payload.exp && Date.now() > payload.exp) return null;
		return payload;
	} catch {
		return null;
	}
};

