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
const cleanSelect = value => {
	const nextValue = clean(value);
	return nextValue.startsWith("Select ") ? "" : nextValue;
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
			return Response.json({ ok: true, success: true });
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
			["Enquiry Type", clean(enquiryType) || "Website Contact"],
			["Full Name", clean(name)],
			["Email", clean(email)],
			["Company", clean(company)],
			["Phone Number", clean(phone) || "-"],
			["Region", cleanedRegion || "-"],
			["Solution", cleanedSolution || "-"],
			["Industry", cleanedIndustry || "-"],
			["Source Page", clean(sourcePage) || "/contact"],
			["Message", clean(message)],
		];

		// 1. Save to Neon PostgreSQL
		if (isNeonConfigured()) {
			try {
				await saveContactSubmission({
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
				});
			} catch (error) {
				console.error("Unable to save contact submission to Neon:", error.message);
			}
		}

		// 2. Save to Supabase (if configured)
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
						industry: cleanedIndustry,
						enquiry_type: clean(enquiryType),
						source_page: clean(sourcePage),
						message: clean(message),
					},
				});
			} catch (error) {
				console.error("Unable to save contact submission to Supabase:", error.message);
			}
		}

		// 3. Send email notifications via Resend (if configured)
		if (isResendConfigured()) {
			try {
				const enquiryHeading = enquiryType || (cleanedSolution ? `${cleanedSolution} Enquiry` : "Website Enquiry");
				const subject = `[New Website Enquiry] ${enquiryHeading} - ${name} (${company || "N/A"})`;
				const html = buildBrandedEmail({
					eyebrow: "Website Enquiry",
					title: `New Enquiry: ${enquiryHeading}`,
					intro:
						"A new visitor enquiry has been submitted through the iTANZ website. Details are below:",
					fields,
					footer:
						"Reply directly to this email to respond to the visitor using their submitted email address.",
				});
				const text = fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");
				const ccEmails = parseEmailList(process.env.CONTACT_CC_EMAIL);

				// Notification to iTANZ Team (info@itanzgroup.com)
				await sendEmail({
					to: [NOTIFICATION_EMAIL],
					cc: ccEmails.length ? ccEmails : undefined,
					reply_to: email,
					subject,
					html,
					text,
				});
			} catch (error) {
				console.warn("Resend email notification failed:", error.message);
			}
		}

		return Response.json({ ok: true, success: true });
	} catch (error) {
		console.error("Contact form error:", error);
		return Response.json(
			{ error: "Something went wrong while sending the enquiry." },
			{ status: 500 }
		);
	}
}
