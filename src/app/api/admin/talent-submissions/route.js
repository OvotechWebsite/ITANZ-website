import { getTalentSubmissions, isNeonConfigured } from "@/libs/itanzNeon";
import {
	createSupabaseSignedUrl,
	isSupabaseServiceConfigured,
	requireAdmin,
	supabaseFetch,
} from "@/libs/itanzSupabase";

export async function GET(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const allRows = [];
		const seenKeys = new Set();

		if (isNeonConfigured()) {
			try {
				const neonRows = await getTalentSubmissions();
				if (Array.isArray(neonRows)) {
					for (const row of neonRows) {
						const key = `${row.email}_${row.created_at}_${row.full_name}`;
						if (!seenKeys.has(key)) {
							seenKeys.add(key);
							allRows.push(row);
						}
					}
				}
			} catch (neonError) {
				console.error("Neon talent submissions error:", neonError.message);
			}
		}

		if (isSupabaseServiceConfigured()) {
			try {
				const supaRows = await supabaseFetch(
					"rest/v1/itanz_talent_submissions?select=*&order=created_at.desc&limit=100",
					{ service: true }
				);
				if (Array.isArray(supaRows)) {
					for (const row of supaRows) {
						const key = `${row.email}_${row.created_at}_${row.full_name}`;
						if (!seenKeys.has(key)) {
							seenKeys.add(key);
							allRows.push(row);
						}
					}
				}
			} catch (supaError) {
				console.error("Supabase talent submissions error:", supaError.message);
			}
		}

		allRows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		const rowsWithCvLinks = await Promise.all(
			allRows.map(async row => ({
				...row,
				cv_signed_url: row.cv_file_url?.startsWith("http")
					? row.cv_file_url
					: await createSupabaseSignedUrl(row.cv_file_url),
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
