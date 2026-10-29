import { requireAdmin, supabaseFetch } from "@/libs/itanzSupabase";

const clean = value => String(value || "").trim();

const slugify = value =>
	clean(value)
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const mapContentPayload = payload => {
	const status = payload.status === "published" ? "published" : "draft";

	return {
		type: clean(payload.type || "blog"),
		title: clean(payload.title),
		slug: slugify(payload.slug || payload.title),
		excerpt: clean(payload.excerpt),
		content: clean(payload.content),
		category: clean(payload.category),
		thumbnail_url: clean(payload.thumbnail_url),
		banner_url: clean(payload.banner_url),
		meta_title: clean(payload.meta_title || payload.title),
		meta_description: clean(payload.meta_description || payload.excerpt),
		status,
		published_at:
			status === "published"
				? payload.published_at || new Date().toISOString()
				: payload.published_at || null,
	};
};

export async function GET(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const rows = await supabaseFetch(
			"rest/v1/itanz_content_posts?select=*&order=created_at.desc&limit=150",
			{ service: true }
		);

		return Response.json({ rows });
	} catch (error) {
		console.error("Content admin error:", error);
		return Response.json({ error: "Unable to load content." }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const payload = mapContentPayload(await request.json());

		if (!payload.title || !payload.slug || !payload.type) {
			return Response.json(
				{ error: "Type, title and slug are required." },
				{ status: 400 }
			);
		}

		const rows = await supabaseFetch("rest/v1/itanz_content_posts?select=*", {
			method: "POST",
			service: true,
			body: payload,
			headers: { Prefer: "return=representation" },
		});

		return Response.json({ post: rows?.[0] });
	} catch (error) {
		console.error("Create content admin error:", error);
		return Response.json({ error: "Unable to create content." }, { status: 500 });
	}
}

export async function PATCH(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const body = await request.json();

		if (!body.id) {
			return Response.json({ error: "Content id is required." }, { status: 400 });
		}

		const payload = body.statusOnly
			? {
					status: body.status === "published" ? "published" : "draft",
					published_at:
						body.status === "published"
							? body.published_at || new Date().toISOString()
							: null,
			  }
			: mapContentPayload(body);
		const rows = await supabaseFetch(
			`rest/v1/itanz_content_posts?id=eq.${encodeURIComponent(body.id)}&select=*`,
			{
				method: "PATCH",
				service: true,
				body: payload,
				headers: { Prefer: "return=representation" },
			}
		);

		return Response.json({ post: rows?.[0] });
	} catch (error) {
		console.error("Update content admin error:", error);
		return Response.json({ error: "Unable to update content." }, { status: 500 });
	}
}

export async function DELETE(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const body = await request.json();

		if (!body.id) {
			return Response.json({ error: "Content id is required." }, { status: 400 });
		}

		await supabaseFetch(
			`rest/v1/itanz_content_posts?id=eq.${encodeURIComponent(body.id)}`,
			{
				method: "DELETE",
				service: true,
				headers: { Prefer: "return=minimal" },
			}
		);

		return Response.json({ ok: true });
	} catch (error) {
		console.error("Delete content admin error:", error);
		return Response.json({ error: "Unable to delete content." }, { status: 500 });
	}
}
