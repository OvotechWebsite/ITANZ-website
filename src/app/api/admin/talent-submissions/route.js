import {
	createSupabaseSignedUrl,
	requireAdmin,
	supabaseFetch,
} from "@/libs/itanzSupabase";

export async function GET(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const rows = await supabaseFetch(
			"rest/v1/itanz_talent_submissions?select=*&order=created_at.desc&limit=100",
			{ service: true }
		);
		const rowsWithCvLinks = await Promise.all(
			(rows || []).map(async row => ({
				...row,
				cv_signed_url: await createSupabaseSignedUrl(row.cv_file_url),
			}))
		);

		return Response.json({ rows: rowsWithCvLinks });
	} catch (error) {
		console.error("Talent submissions admin error:", error);
		return Response.json(
			{ error: "Unable to load talent submissions." },
			{ status: 500 }
		);
	}
}
