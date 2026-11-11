import { getContactSubmissions, isNeonConfigured } from "@/libs/itanzNeon";
import {
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
				const neonRows = await getContactSubmissions();
				if (Array.isArray(neonRows)) {
					for (const row of neonRows) {
						const key = `${row.email}_${row.created_at}_${row.name}`;
						if (!seenKeys.has(key)) {
							seenKeys.add(key);
							allRows.push(row);
						}
					}
				}
			} catch (neonError) {
				console.error("Neon contact submissions error:", neonError.message);
			}
		}

		if (isSupabaseServiceConfigured()) {
			try {
				const supaRows = await supabaseFetch(
					"rest/v1/itanz_contact_submissions?select=*&order=created_at.desc&limit=100",
					{ service: true }
				);
				if (Array.isArray(supaRows)) {
					for (const row of supaRows) {
						const key = `${row.email}_${row.created_at}_${row.name}`;
						if (!seenKeys.has(key)) {
							seenKeys.add(key);
							allRows.push(row);
						}
					}
				}
			} catch (supaError) {
				console.error("Supabase contact submissions error:", supaError.message);
			}
		}

		allRows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		return Response.json({ rows: allRows });
	} catch (error) {
		console.error("Contact submissions admin error:", error);
		return Response.json(
			{ error: "Unable to load contact submissions." },
			{ status: 500 }
		);
	}
}
