import { requireAdmin } from "@/libs/itanzSupabase";

export async function GET(request) {
	try {
		const { admin, error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		return Response.json({ admin });
	} catch (error) {
		console.error("Admin me error:", error);
		return Response.json({ error: "Unable to verify admin." }, { status: 500 });
	}
}

