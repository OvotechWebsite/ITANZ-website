import { isNeonConfigured, saveTalentSubmission } from "@/libs/itanzNeon";
import {
	isSupabaseServiceConfigured,
	supabaseFetch,
	uploadSupabaseFile,
} from "@/libs/itanzSupabase";
import {
	buildBrandedEmail,
	isResendConfigured,
	NOTIFICATION_EMAIL,
	sendEmail,
} from "@/libs/itanzEmail";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

const clean = value => String(value || "").trim();
const list = value => (Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean));

export async function POST(request) {
	try {
		const formData = await request.formData();
		const website = clean(formData.get("website"));

		if (website) {
			return Response.json({ ok: true, success: true });
		}

		const fullName = clean(formData.get("full_name"));
		const roleInterest = clean(formData.get("role_interest"));
		const sourcePage = clean(formData.get("source_page"));
		const email = clean(formData.get("email"));
		const phone = clean(formData.get("phone"));
		const currentCity = clean(formData.get("current_city"));
		const currentCountry = clean(formData.get("current_country"));
		const currentLocation = [currentCity, currentCountry].filter(Boolean).join(", ");
		const linkedin = clean(formData.get("linkedin"));
		const areas = list(formData.getAll("area_interest"));
		const experienceLevel = clean(formData.get("experience_level"));
		const opportunityType = clean(formData.get("opportunity_type"));
		const workLocation = clean(formData.get("work_location"));
		const portfolio = clean(formData.get("portfolio"));
		const impact = clean(formData.get("impact"));
		const consentValue = clean(formData.get("consent")).toLowerCase();
		const consent = ["on", "true", "yes", "1"].includes(consentValue);
		const cv = formData.get("cv");

		if (!fullName || !email || !phone || !currentCity || !currentCountry) {
			return Response.json(
				{ error: "Please complete all required Step 1 fields." },
				{ status: 400 }
			);
		}

		if (!areas.length || !experienceLevel || !opportunityType || !workLocation) {
			return Response.json(
				{ error: "Please complete all required Step 2 fields." },
				{ status: 400 }
			);
		}

		if (!cv || typeof cv === "string" || !cv.size) {
			return Response.json({ error: "Please upload your CV." }, { status: 400 });
		}

		if (cv.size > MAX_CV_SIZE) {
			return Response.json(
				{ error: "Your CV must be 5 MB or smaller." },
				{ status: 400 }
			);
		}

		const cvExtension = `.${String(cv.name || "").split(".").pop()}`.toLowerCase();
		const isTypeAllowed =
			ALLOWED_CV_TYPES.includes(cv.type) ||
			ALLOWED_CV_EXTENSIONS.includes(cvExtension);

		if (!isTypeAllowed) {
			return Response.json(
				{ error: "Please upload a PDF or Word document (.pdf, .doc, .docx)." },
				{ status: 400 }
			);
		}

		if (!consent) {
			return Response.json(
				{ error: "Please confirm your consent before submitting." },
				{ status: 400 }
			);
		}

		const fields = [
			["Full Name", fullName],
			["Target Role / Focus", roleInterest || "Open Candidate Profile"],
			["Source Page", sourcePage || "Careers / Talent Network"],
			["Email", email],
			["Phone", phone],
			["Current Location", currentLocation],
			["LinkedIn Profile", linkedin],
			["Area of Interest", areas.join(", ")],
			["Experience Level", experienceLevel],
			["Opportunity Type", opportunityType],
			["Preferred Work Location", workLocation],
			["Portfolio / GitHub / Website", portfolio],
			["Impact Interest", impact],
		];
		let cvFileUrl = "";
		let cvBuffer;

		if (isSupabaseServiceConfigured()) {
			try {
				cvFileUrl = await uploadSupabaseFile({
					file: cv,
					folder: "talent-cvs",
				});
			} catch (error) {
				console.error("Unable to upload CV to Supabase:", error.message);
			}
		}

		cvBuffer = Buffer.from(await cv.arrayBuffer());

		// 1. Save to Neon PostgreSQL
		if (isNeonConfigured()) {
			try {
				await saveTalentSubmission({
					full_name: fullName,
					email,
					phone,
					city: currentCity,
					country: currentCountry,
					linkedin_url: linkedin,
					areas_of_interest: areas,
					experience_level: experienceLevel,
					opportunity_type: opportunityType,
					preferred_locations: [workLocation].filter(Boolean),
					portfolio_url: portfolio,
					impact_statement: impact,
					cv_file_url: cvFileUrl || cv?.name || "CV-attached-in-email.pdf",
					source_page: sourcePage,
				});
			} catch (error) {
				console.error("Unable to save talent submission to Neon:", error.message);
			}
		}

		// 2. Save to Supabase (if configured)
		if (isSupabaseServiceConfigured()) {
			try {
				await supabaseFetch("rest/v1/itanz_talent_submissions", {
					method: "POST",
					service: true,
					body: {
						full_name: fullName,
						email,
						phone,
						city: currentCity,
						country: currentCountry,
						linkedin_url: linkedin,
						areas_of_interest: areas,
						experience_level: experienceLevel,
						opportunity_type: opportunityType,
						preferred_locations: [workLocation].filter(Boolean),
						portfolio_url: portfolio,
						impact_statement: impact,
						cv_file_url: cvFileUrl,
						source_page: sourcePage,
					},
				});
			} catch (error) {
				console.error("Unable to save talent submission:", error.message);
			}
		}

		// 3. Send email notifications via Resend (if configured)
		if (isResendConfigured()) {
			try {
				const subject = roleInterest
					? `[New Talent Application] ${roleInterest} - ${fullName}`
					: `[New Talent Network Profile] ${fullName}`;

				const talentRecipients = [NOTIFICATION_EMAIL];
				if (process.env.TALENT_TO_EMAIL && !talentRecipients.includes(process.env.TALENT_TO_EMAIL)) {
					talentRecipients.push(process.env.TALENT_TO_EMAIL);
				}

				const html = buildBrandedEmail({
					eyebrow: "Careers & Talent Network",
					title: `New Candidate Profile: ${fullName}`,
					intro: "A candidate has submitted their profile through the iTANZ Careers portal. The CV is attached to this email.",
					fields: [
						...fields,
						["CV Attached", cv?.name || "Candidate CV"],
					],
					footer: "Reply directly to this email to contact the candidate using their submitted email address.",
				});

				// Notification to info@itanzgroup.com with CV attached
				await sendEmail({
					to: talentRecipients,
					reply_to: email,
					subject,
					html,
					text: fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n"),
					attachments: cvBuffer
						? [
								{
									filename: cv.name || "Candidate-CV.pdf",
									content: cvBuffer.toString("base64"),
								},
						  ]
						: undefined,
				});
			} catch (error) {
				console.warn("Talent email notification failed:", error.message);
			}
		}

		return Response.json({ ok: true, success: true });
	} catch (error) {
		console.error("Talent network form error:", error);
		return Response.json(
			{ error: "Unable to submit your profile right now." },
			{ status: 500 }
		);
	}
}
