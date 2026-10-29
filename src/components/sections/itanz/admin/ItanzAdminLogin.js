"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOKEN_KEY = "itanz_admin_token";

const ItanzAdminLogin = () => {
	const router = useRouter();
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (window.localStorage.getItem(TOKEN_KEY)) {
			router.replace("/admin");
		}
	}, [router]);

	const handleSubmit = async event => {
		event.preventDefault();
		setIsSubmitting(true);
		setStatus({ type: "", message: "" });

		const formData = new FormData(event.currentTarget);

		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: formData.get("email"),
					password: formData.get("password"),
				}),
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.error || "Login failed.");
			}

			window.localStorage.setItem(TOKEN_KEY, result.accessToken);
			router.replace("/admin");
		} catch (error) {
			setStatus({
				type: "error",
				message: error?.message || "Unable to login right now.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="itanz-admin-shell itanz-admin-login-shell">
			<section className="itanz-admin-login-card">
				<img src="/images/logos/logo.webp" alt="iTANZ" />
				<span>Admin Console</span>
				<h1>Admin Login</h1>
				<p></p>
				<form onSubmit={handleSubmit}>
					<label>
						Email
						<input
							type="email"
							name="email"
							defaultValue="info@itanzgroup.com"
							required
						/>
					</label>
					<label>
						Password
						<input type="password" name="password" required />
					</label>
					<button className="itanz-admin-primary-btn" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</button>
				</form>
				{status.message ? (
					<p className={`itanz-form-status ${status.type}`}>{status.message}</p>
				) : null}
			</section>
		</main>
	);
};

export default ItanzAdminLogin;
