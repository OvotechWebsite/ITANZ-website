import { createAdminToken } from "@/libs/itanzNeon";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_PUBLISHABLE_KEY =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export async function POST(request) {
	try {
		const body = await request.json();
		const username = String(body.username || body.email || "").trim();
		const password = String(body.password || "");

		if (!username || !password) {
			return Response.json(
				{ error: "Please enter username and password." },
				{ status: 400 }
			);
		}

		const ADMIN_USER = process.env.ADMIN_USERNAME;
		const ADMIN_PASS = process.env.ADMIN_PASSWORD;

		// 1. Check against ADMIN_USERNAME and ADMIN_PASSWORD from environment variables
		if (ADMIN_USER && ADMIN_PASS) {
			const isUserMatch =
				username.toLowerCase() === String(ADMIN_USER).trim().toLowerCase();
			const isPassMatch = password === String(ADMIN_PASS).trim();

			if (isUserMatch && isPassMatch) {
				const accessToken = createAdminToken(ADMIN_USER);
				return Response.json({
					accessToken,
					refreshToken: accessToken,
					user: {
						id: "admin-env",
						email: ADMIN_USER,
						username: ADMIN_USER,
						user_metadata: { name: "Administrator" },
					},
				});
			}

			// If credentials don't match env variables and Supabase is not configured, reject immediately
			if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
				return Response.json(
					{ error: "Invalid username or password." },
					{ status: 401 }
				);
			}
		}

		// 2. Fallback to Supabase if configured
		if (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
			const response = await fetch(
				`${SUPABASE_URL}/auth/v1/token?grant_type=password`,
				{
					method: "POST",
					headers: {
						apikey: SUPABASE_PUBLISHABLE_KEY,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email: username, password }),
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
		}

		return Response.json(
			{ error: "Admin credentials are not configured yet." },
			{ status: 500 }
		);
	} catch (error) {
		console.error("Admin login error:", error);
		return Response.json({ error: "Unable to login right now." }, { status: 500 });
	}
}
