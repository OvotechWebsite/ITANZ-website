const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_PUBLISHABLE_KEY =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
			return Response.json(
				{ error: "Supabase is not configured yet." },
				{ status: 500 }
			);
		}

		if (!email || !password) {
			return Response.json(
				{ error: "Please enter email and password." },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${SUPABASE_URL}/auth/v1/token?grant_type=password`,
			{
				method: "POST",
				headers: {
					apikey: SUPABASE_PUBLISHABLE_KEY,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		const result = await response.json();

		if (!response.ok) {
			return Response.json(
				{ error: result?.error_description || result?.msg || "Login failed." },
				{ status: 401 }
			);
		}

		return Response.json({
			accessToken: result.access_token,
			refreshToken: result.refresh_token,
			user: result.user,
		});
	} catch (error) {
		console.error("Admin login error:", error);
		return Response.json({ error: "Unable to login right now." }, { status: 500 });
	}
}

