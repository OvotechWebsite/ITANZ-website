import { isNeonConfigured, saveTalentSubmission } from "@/libs/itanzNeon";
import {
	isSupabaseServiceConfigured,
	supabaseFetch,
	uploadSupabaseFile,
} from "@/libs/itanzSupabase";

const TALENT_TO_EMAIL = process.env.TALENT_TO_EMAIL || "talent@itanzgroup.com";
const RESEND_API_URL = "https://api.resend.com/emails";
const MAX_CV_SIZE = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

const escapeHtml = value =>
	String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");

const clean = value => String(value || "").trim();
const list = value => (Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean));

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

const buildTalentEmail = ({ fields, cvName }) => `
	<div style="margin:0;padding:0;background:#eef3f4;">
		<div style="max-width:760px;margin:0 auto;padding:34px 18px;font-family:Arial,sans-serif;color:#09272d;">
			<div style="overflow:hidden;border-radius:18px;background:#ffffff;box-shadow:0 18px 45px rgba(9,39,45,.10);">
				<div style="padding:30px 34px;background:#09272d;color:#ffffff;">
					<div style="margin:0 0 18px;font-size:22px;font-weight:800;letter-spacing:.02em;">iTANZ</div>
					<div style="display:inline-block;margin:0 0 12px;padding:6px 10px;border-radius:999px;background:#ddd62c;color:#09272d;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">Talent Network</div>
					<h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">New Talent Network Profile</h1>
					<p style="margin:12px 0 0;color:#d7e4e7;font-size:15px;line-height:1.6;">A candidate has submitted their profile through the iTANZ Careers page. The CV is attached.</p>
				</div>
				<div style="padding:30px 34px;">
					<div style="display:grid;gap:12px;">
						${buildFieldCards(fields)}
						${buildFieldCards([["CV Attachment", cvName]])}
					</div>
					<p style="margin:24px 0 0;color:#5b6b70;font-size:14px;line-height:1.6;">Reply directly to this email to contact the candidate using their submitted email address.</p>
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
		if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
			try {
				const subject = roleInterest
					? `New iTANZ Talent Network profile - ${fullName} / ${roleInterest}`
					: `New iTANZ Talent Network profile - ${fullName}`;

				await sendEmail({
					from: process.env.RESEND_FROM_EMAIL,
					to: [TALENT_TO_EMAIL],
					reply_to: email,
					subject,
					html: buildTalentEmail({ fields, cvName: cv.name }),
					text: fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n"),
					attachments: [
						{
							filename: cv.name,
							content: cvBuffer.toString("base64"),
						},
					],
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
