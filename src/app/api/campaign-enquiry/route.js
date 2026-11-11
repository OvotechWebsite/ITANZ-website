import { isNeonConfigured, saveContactSubmission } from "@/libs/itanzNeon";
import { isSupabaseServiceConfigured, supabaseFetch } from "@/libs/itanzSupabase";
import {
	buildBrandedEmail,
	isResendConfigured,
	NOTIFICATION_EMAIL,
	parseEmailList,
	sendEmail,
} from "@/libs/itanzEmail";

const clean = value => String(value || "").trim();

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
	if (url.includes("/companyprofile")) return "LEAP 2026 Leadership";

	return "Campaign";
};

export async function POST(request) {
	try {
		const formData = await request.formData();
		const website = clean(formData.get("website"));

		if (website) {
			return Response.json({ ok: true, success: true });
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

		if (!email) {
			return Response.json(
				{ ok: false, success: false, error: "Please provide your email address." },
				{ status: 400 }
			);
		}

		// 1. Save to Neon PostgreSQL
		if (isNeonConfigured()) {
			try {
				await saveContactSubmission({
					name: fullName,
					company,
					email,
					phone: clean(formData.get("whatsapp") || formData.get("phone")),
					region: "",
					solution: campaignName,
					custom_solution: "",
					industry: "",
					enquiry_type: `Campaign (${campaignName})`,
					source_page: pageUrl || campaignName,
					message,
				});
			} catch (error) {
				console.error("Unable to save campaign enquiry to Neon:", error.message);
			}
		}

		// 2. Save to Supabase (if configured)
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
						enquiry_type: `Campaign (${campaignName})`,
						source_page: pageUrl || campaignName,
						message,
					},
				});
			} catch (error) {
				console.error("Unable to save campaign enquiry to Supabase:", error.message);
			}
		}

		// 3. Send email notifications via Resend (if configured)
		if (isResendConfigured()) {
			try {
				const ccEmails = parseEmailList(process.env.CONTACT_CC_EMAIL);
				const subject = `[New Campaign Enquiry] ${campaignName} - ${fullName} (${company || "N/A"})`;
				const html = buildBrandedEmail({
					eyebrow: `${campaignName} Enquiry`,
					title: `New Campaign Enquiry: ${campaignName}`,
					intro: `A new enquiry has been submitted from the iTANZ ${campaignName} campaign page. Details are below:`,
					fields: [
						["Campaign", campaignName],
						["Full Name", fullName],
						["Email", email],
						["Company", company || "-"],
						["Source URL", pageUrl || "-"],
						...fields.filter(([k]) => !["Full Name", "Email", "Company", "Page Url"].includes(k)),
					],
					footer: "Reply directly to this email to respond to the visitor using their submitted email address.",
				});

				// Notification to iTANZ Team (info@itanzgroup.com)
				await sendEmail({
					to: [NOTIFICATION_EMAIL],
					cc: ccEmails.length ? ccEmails : undefined,
					reply_to: email,
					subject,
					html,
					text: message,
				});
			} catch (error) {
				console.warn("Campaign email notification failed:", error.message);
			}
		}

		return Response.json({ ok: true, success: true });
	} catch (error) {
		console.error("Campaign enquiry error:", error);
		return Response.json(
			{ ok: false, success: false, error: "Unable to send your enquiry right now." },
			{ status: 500 }
		);
	}
}
