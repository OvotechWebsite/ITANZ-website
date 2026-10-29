import { isSupabaseServiceConfigured, supabaseFetch } from "@/libs/itanzSupabase";

const CAMPAIGN_TO_EMAIL = process.env.CAMPAIGN_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "info@itanzgroup.com";
const RESEND_API_URL = "https://api.resend.com/emails";

const escapeHtml = value =>
	String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");

const clean = value => String(value || "").trim();
const parseEmailList = value =>
	String(value || "")
		.split(",")
		.map(email => email.trim())
		.filter(Boolean);

const humanizeKey = key =>
	key
		.replace(/\[\]$/, "")
		.replace(/^_/, "")
		.replace(/[-_]/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\b\w/g, char => char.toUpperCase());

const getCampaignName = pageUrl => {
	const url = clean(pageUrl).toLowerCase();

	if (url.includes("/leap5")) return "LEAP 2026";
	if (url.includes("/cloudflare")) return "Cloudflare";
	if (url.includes("/couchbase")) return "Couchbase";
	if (url.includes("/netsuite")) return "NetSuite";

	return "Campaign";
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

const buildCampaignEmail = ({ campaignName, fields }) => `
	<div style="margin:0;padding:0;background:#eef3f4;">
		<div style="max-width:760px;margin:0 auto;padding:34px 18px;font-family:Arial,sans-serif;color:#09272d;">
			<div style="overflow:hidden;border-radius:18px;background:#ffffff;box-shadow:0 18px 45px rgba(9,39,45,.10);">
				<div style="padding:30px 34px;background:#09272d;color:#ffffff;">
					<div style="margin:0 0 18px;font-size:22px;font-weight:800;letter-spacing:.02em;">iTANZ</div>
					<div style="display:inline-block;margin:0 0 12px;padding:6px 10px;border-radius:999px;background:#ddd62c;color:#09272d;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(campaignName)} Enquiry</div>
					<h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">New Campaign Enquiry</h1>
					<p style="margin:12px 0 0;color:#d7e4e7;font-size:15px;line-height:1.6;">A visitor submitted an enquiry from an iTANZ campaign landing page.</p>
				</div>
				<div style="padding:30px 34px;">
					<div style="display:grid;gap:12px;">
						${buildFieldCards(fields)}
					</div>
					<p style="margin:24px 0 0;color:#5b6b70;font-size:14px;line-height:1.6;">Reply directly to this email to respond to the visitor when an email address is available.</p>
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
		throw new Error(await response.text());
	}

	return response.json();
};

export async function POST(request) {
	try {
		const formData = await request.formData();
		const website = clean(formData.get("website"));

		if (website) {
			return Response.json({ ok: true, success: true });
		}

		if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
			return Response.json(
				{ ok: false, success: false, error: "Email service is not configured yet." },
				{ status: 500 }
			);
		}

		const pageUrl = clean(formData.get("page_url") || formData.get("source") || formData.get("source_page"));
		const campaignName = getCampaignName(pageUrl);
		const entries = [];
		const skipKeys = new Set(["website", "_subject", "_template", "_captcha", "recipient"]);

		for (const [key, value] of formData.entries()) {
			if (skipKeys.has(key) || typeof value !== "string") {
				continue;
			}

			entries.push([key, clean(value)]);
		}

		const groupedFields = entries.reduce((acc, [key, value]) => {
			const label = humanizeKey(key);
			acc[label] = acc[label] ? `${acc[label]}, ${value}` : value;
			return acc;
		}, {});

		const fields = Object.entries(groupedFields);
		const email =
			clean(formData.get("work_email")) ||
			clean(formData.get("workEmail")) ||
			clean(formData.get("email"));
		const fullName =
			[clean(formData.get("first_name")), clean(formData.get("last_name"))].filter(Boolean).join(" ") ||
			clean(formData.get("fullName")) ||
			clean(formData.get("name")) ||
			"Campaign visitor";
		const company = clean(formData.get("company_name") || formData.get("company"));
		const message =
			fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n") ||
			"Campaign enquiry received.";
		const subject = `New iTANZ ${campaignName} enquiry - ${fullName}`;

		if (!email) {
			return Response.json(
				{ ok: false, success: false, error: "Please provide your email address." },
				{ status: 400 }
			);
		}

		if (isSupabaseServiceConfigured()) {
			try {
				await supabaseFetch("rest/v1/itanz_contact_submissions", {
					method: "POST",
					service: true,
					body: {
						name: fullName,
						company,
						email,
						phone: clean(formData.get("whatsapp") || formData.get("phone")),
						region: "",
						solution: campaignName,
						industry: "",
						enquiry_type: "Campaign Enquiry",
						source_page: pageUrl || campaignName,
						message,
					},
				});
			} catch (error) {
				console.error("Unable to save campaign enquiry:", error.message);
			}
		}

		const ccEmails = parseEmailList(process.env.CONTACT_CC_EMAIL);

		await sendEmail({
			from: process.env.RESEND_FROM_EMAIL,
			to: [CAMPAIGN_TO_EMAIL],
			cc: ccEmails.length ? ccEmails : undefined,
			reply_to: email,
			subject,
			html: buildCampaignEmail({ campaignName, fields }),
			text: message,
		});

		return Response.json({ ok: true, success: true });
	} catch (error) {
		console.error("Campaign enquiry error:", error);
		return Response.json(
			{ ok: false, success: false, error: "Unable to send your enquiry right now." },
			{ status: 500 }
		);
	}
}
