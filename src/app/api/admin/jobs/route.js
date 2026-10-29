import { isSupabaseServiceConfigured, normalizeJobs, requireAdmin, supabaseFetch } from "@/libs/itanzSupabase";

const parseList = value =>
	String(value || "")
		.split("\n")
		.map(item => item.trim())
		.filter(Boolean);

const clean = value => String(value || "").trim();

const slugify = value =>
	clean(value)
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const mapJobPayload = payload => ({
	title: clean(payload.title),
	slug: slugify(payload.slug || payload.title),
	category: clean(payload.category),
	location: clean(payload.location),
	work_type: clean(payload.work_type),
	experience_level: clean(payload.experience_level),
	summary: clean(payload.summary),
	description: clean(payload.description || payload.summary),
	responsibilities: Array.isArray(payload.responsibilities)
		? payload.responsibilities
		: parseList(payload.responsibilities),
	requirements: Array.isArray(payload.requirements)
		? payload.requirements
		: parseList(payload.requirements),
	is_active: payload.is_active ?? true,
	sort_order: Number(payload.sort_order || 0),
});

export async function GET(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		if (!isSupabaseServiceConfigured()) {
			return Response.json({ rows: [], rawRows: [] });
		}

		const rows = await supabaseFetch(
			"rest/v1/itanz_jobs?select=*&order=sort_order.asc,created_at.desc",
			{ service: true }
		);

		return Response.json({ rows: normalizeJobs(rows), rawRows: rows });
	} catch (error) {
		console.error("Jobs admin error:", error);
		return Response.json({ error: "Unable to load jobs." }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const payload = mapJobPayload(await request.json());

		if (!payload.title || !payload.slug) {
			return Response.json(
				{ error: "Job title is required." },
				{ status: 400 }
			);
		}

		if (!isSupabaseServiceConfigured()) {
			return Response.json({ rows: [], rawRows: [] });
		}

		const rows = await supabaseFetch("rest/v1/itanz_jobs?select=*", {
			method: "POST",
			service: true,
			body: payload,
			headers: { Prefer: "return=representation" },
		});

		return Response.json({ job: normalizeJobs(rows)[0] });
	} catch (error) {
		console.error("Create job admin error:", error);
		return Response.json({ error: "Unable to create job." }, { status: 500 });
	}
}

export async function PATCH(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const body = await request.json();
		const id = body.id;

		if (!id) {
			return Response.json({ error: "Job id is required." }, { status: 400 });
		}

		const payload = body.toggleOnly
			? { is_active: Boolean(body.is_active) }
			: mapJobPayload(body);
		if (!isSupabaseServiceConfigured()) {
			return Response.json({ rows: [], rawRows: [] });
		}

		const rows = await supabaseFetch(
			`rest/v1/itanz_jobs?id=eq.${encodeURIComponent(id)}&select=*`,
			{
				method: "PATCH",
				service: true,
				body: payload,
				headers: { Prefer: "return=representation" },
			}
		);

		return Response.json({ job: normalizeJobs(rows)[0] });
	} catch (error) {
		console.error("Update job admin error:", error);
		return Response.json({ error: "Unable to update job." }, { status: 500 });
	}
}

export async function DELETE(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const body = await request.json();
		const id = body.id;

		if (!id) {
			return Response.json({ error: "Job id is required." }, { status: 400 });
		}

		if (!isSupabaseServiceConfigured()) {
			return Response.json({ ok: true });
		}

		await supabaseFetch(
			`rest/v1/itanz_jobs?id=eq.${encodeURIComponent(id)}`,
			{
				method: "DELETE",
				service: true,
				headers: { Prefer: "return=minimal" },
			}
		);

		return Response.json({ ok: true });
	} catch (error) {
		console.error("Delete job admin error:", error);
		return Response.json({ error: "Unable to delete job." }, { status: 500 });
	}
}
