import { requireAdmin, supabaseFetch } from "@/libs/itanzSupabase";

export async function GET(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const rows = await supabaseFetch(
			"rest/v1/itanz_contact_submissions?select=*&order=created_at.desc&limit=100",
			{ service: true }
		);

		return Response.json({ rows });
	} catch (error) {
		console.error("Contact submissions admin error:", error);
		return Response.json(
			{ error: "Unable to load contact submissions." },
			{ status: 500 }
		);
	}
}

