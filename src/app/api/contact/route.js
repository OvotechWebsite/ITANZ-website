import { isSupabaseServiceConfigured, supabaseFetch } from "@/libs/itanzSupabase";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@itanzgroup.com";
const RESEND_API_URL = "https://api.resend.com/emails";

const parseEmailList = value =>
	String(value || "")
		.split(",")
		.map(email => email.trim())
		.filter(Boolean);

const escapeHtml = value =>
	String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");

const clean = value => String(value || "").trim();
const cleanSelect = value => {
	const nextValue = clean(value);
	return nextValue.startsWith("Select ") ? "" : nextValue;
};

const buildFieldCards = fields =>
	fields
		.map(
			([label, value]) => `
				<div style="padding:14px 16px;border:1px solid #dfe6e8;border-radius:10px;background:#ffffff;">
					<div style="margin:0 0 4px;color:#5b6b70;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(label)}</div>
					<div style="color:#09272d;font-size:15px;font-weight:600;line-height:1.45;">${escapeHtml(value || "-")}</div>
				</div>`
		)
		.join("");

const buildBrandedEmail = ({ eyebrow, title, intro, fields, footer }) => `
	<div style="margin:0;padding:0;background:#eef3f4;">
		<div style="max-width:760px;margin:0 auto;padding:34px 18px;font-family:Arial,sans-serif;color:#09272d;">
			<div style="overflow:hidden;border-radius:18px;background:#ffffff;box-shadow:0 18px 45px rgba(9,39,45,.10);">
				<div style="padding:30px 34px;background:#09272d;color:#ffffff;">
					<div style="margin:0 0 18px;font-size:22px;font-weight:800;letter-spacing:.02em;">iTANZ</div>
					<div style="display:inline-block;margin:0 0 12px;padding:6px 10px;border-radius:999px;background:#ddd62c;color:#09272d;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(eyebrow)}</div>
					<h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">${escapeHtml(title)}</h1>
					<p style="margin:12px 0 0;color:#d7e4e7;font-size:15px;line-height:1.6;">${escapeHtml(intro)}</p>
				</div>
				<div style="padding:30px 34px;">
					<div style="display:grid;gap:12px;">
						${buildFieldCards(fields)}
					</div>
					<p style="margin:24px 0 0;color:#5b6b70;font-size:14px;line-height:1.6;">${escapeHtml(footer)}</p>
				</div>
				<div style="padding:18px 34px;background:#f7fafb;border-top:1px solid #e2eaec;color:#5b6b70;font-size:12px;line-height:1.5;">
					iTANZ Technologies<br />
					Enterprise technology, integration, analytics and managed capability.
				</div>
			</div>
		</div>
	</div>`;

const sendEmail = async emailPayload => {
	const response = await fetch(RESEND_API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(emailPayload),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return response.json();
};

export async function POST(request) {
	try {
		const payload = await request.json();
		const {
			name,
			company,
			email,
			phone,
			region,
			solution,
			custom_solution: customSolution,
			industry,
			message,
			consent,
			enquiry_type: enquiryType,
			source_page: sourcePage,
			website,
		} = payload || {};
		const cleanedRegion = cleanSelect(region);
		const cleanedSolution =
			cleanSelect(solution) === "Other"
				? clean(customSolution)
				: cleanSelect(solution);
		const cleanedIndustry = cleanSelect(industry);

		if (website) {
			return Response.json({ ok: true });
		}

		if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
			return Response.json(
				{ error: "Email service is not configured yet." },
				{ status: 500 }
			);
		}

		if (!clean(name) || !clean(company) || !clean(email) || !clean(message)) {
			return Response.json(
				{ error: "Please complete all required fields." },
				{ status: 400 }
			);
		}

		if (cleanSelect(solution) === "Other" && !clean(customSolution)) {
			return Response.json(
				{ error: "Please specify the solution you want to discuss." },
				{ status: 400 }
			);
		}

		if (!consent) {
			return Response.json(
				{ error: "Please confirm consent before submitting." },
				{ status: 400 }
			);
		}

		const fields = [
			["Name", name],
			["Company", company],
			["Email", email],
			["Phone", phone],
			["Region", cleanedRegion],
			["Solution", cleanedSolution],
			["Industry", cleanedIndustry],
			["Enquiry Type", enquiryType],
			["Source Page", sourcePage],
			["Message", message],
		];

		const subject = `New iTANZ website enquiry${cleanedSolution ? ` - ${cleanedSolution}` : ""}`;
		const html = buildBrandedEmail({
			eyebrow: "Website Enquiry",
			title: "New iTANZ Website Enquiry",
			intro:
				"A new enquiry has been submitted through the iTANZ website. The visitor context and form details are below.",
			fields,
			footer:
				"Reply directly to this email to respond to the visitor using their submitted email address.",
		});
		const text = fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");
		const ccEmails = parseEmailList(process.env.CONTACT_CC_EMAIL);

		if (isSupabaseServiceConfigured()) {
			try {
				await supabaseFetch("rest/v1/itanz_contact_submissions", {
					method: "POST",
					service: true,
					body: {
						name: clean(name),
						company: clean(company),
						email: clean(email),
						phone: clean(phone),
						region: cleanedRegion,
						solution: cleanedSolution,
						custom_solution: clean(customSolution),
						industry: cleanedIndustry,
						enquiry_type: clean(enquiryType),
						source_page: clean(sourcePage),
						message: clean(message),
					},
				});
			} catch (error) {
				console.error("Unable to save contact submission:", error.message);
			}
		}

		try {
			await sendEmail({
				from: process.env.RESEND_FROM_EMAIL,
				to: [CONTACT_TO_EMAIL],
				cc: ccEmails.length ? ccEmails : undefined,
				reply_to: email,
				subject,
				html,
				text,
			});

			await sendEmail({
				from: process.env.RESEND_FROM_EMAIL,
				to: [email],
				reply_to: CONTACT_TO_EMAIL,
				subject: "Thank you for contacting iTANZ",
				html: buildBrandedEmail({
					eyebrow: "Thank You",
					title: "Thank you for contacting iTANZ",
					intro: `Hi ${name}, we have received your enquiry. An iTANZ team member will review it and respond as soon as possible.`,
					fields: [
						["Company", company],
						["Solution", cleanedSolution],
						["Industry", cleanedIndustry],
						["Enquiry Type", enquiryType],
						["Message", message],
					],
					footer:
						"This confirmation is for your records. You do not need to submit the form again.",
				}),
				text: [
					`Hi ${name},`,
					"",
					"Thank you for your enquiry. We have received your message and an iTANZ team member will review it and respond as soon as possible.",
					"",
					"Your enquiry summary:",
					`Company: ${company || "-"}`,
					`Solution: ${cleanedSolution || "-"}`,
					`Industry: ${cleanedIndustry || "-"}`,
					`Enquiry Type: ${enquiryType || "-"}`,
					`Message: ${message || "-"}`,
					"",
					"Regards,",
					"iTANZ Technologies",
				].join("\n"),
			});
		} catch (error) {
			console.error("Resend email failed:", error.message);
			return Response.json(
				{ error: "Unable to send the enquiry right now." },
				{ status: 502 }
			);
		}

		return Response.json({ ok: true });
	} catch (error) {
		console.error("Contact form error:", error);
		return Response.json(
			{ error: "Something went wrong while sending the enquiry." },
			{ status: 500 }
		);
	}
}
