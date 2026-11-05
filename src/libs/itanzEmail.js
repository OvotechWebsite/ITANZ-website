const RESEND_API_URL = "https://api.resend.com/emails";

export const getResendApiKey = () =>
	process.env.RESEND_API_KEY ||
	process.env.Resend_API_KEY ||
	process.env.resend_api_key ||
	"";

export const getResendFromEmail = () =>
	process.env.RESEND_FROM_EMAIL ||
	process.env.Resend_FROM_EMAIL ||
	process.env.resend_from_email ||
	"iTANZ <info@itanzgroup.com>";

export const NOTIFICATION_EMAIL =
	process.env.CONTACT_TO_EMAIL || "info@itanzgroup.com";

export const isResendConfigured = () => Boolean(getResendApiKey());

export const parseEmailList = value =>
	String(value || "")
		.split(",")
		.map(email => email.trim())
		.filter(Boolean);

export const escapeHtml = value =>
	String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");

export const buildFieldCards = fields =>
	fields
		.filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
		.map(
			([label, value]) => `
				<div style="padding:14px 16px;border:1px solid #dfe6e8;border-radius:10px;background:#ffffff;margin-bottom:8px;">
					<div style="margin:0 0 4px;color:#5b6b70;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(label)}</div>
					<div style="color:#09272d;font-size:15px;font-weight:600;line-height:1.45;word-break:break-word;">${escapeHtml(value)}</div>
				</div>`
		)
		.join("");

export const buildBrandedEmail = ({ eyebrow, title, intro, fields, footer, alertNotice }) => `
	<div style="margin:0;padding:0;background:#eef3f4;font-family:Arial,sans-serif;">
		<div style="max-width:720px;margin:0 auto;padding:32px 16px;color:#09272d;">
			<div style="overflow:hidden;border-radius:16px;background:#ffffff;box-shadow:0 12px 40px rgba(9,39,45,.08);">
				<div style="padding:28px 32px;background:#09272d;color:#ffffff;">
					<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
						<span style="font-size:22px;font-weight:800;letter-spacing:.03em;color:#ffffff;">iTANZ</span>
						<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:#ddd62c;color:#09272d;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(eyebrow || "Website Notification")}</span>
					</div>
					<h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(title)}</h1>
					${intro ? `<p style="margin:10px 0 0;color:#d7e4e7;font-size:14px;line-height:1.6;">${escapeHtml(intro)}</p>` : ""}
				</div>
				${alertNotice ? `
				<div style="padding:14px 32px;background:#fff8e1;border-bottom:1px solid #ffe082;color:#8d6e63;font-size:13px;line-height:1.5;">
					${alertNotice}
				</div>` : ""}
				<div style="padding:28px 32px;">
					<div style="display:block;">
						${buildFieldCards(fields || [])}
					</div>
					${footer ? `<p style="margin:24px 0 0;color:#5b6b70;font-size:13px;line-height:1.6;">${escapeHtml(footer)}</p>` : ""}
				</div>
				<div style="padding:16px 32px;background:#f7fafb;border-top:1px solid #e2eaec;color:#7a8a8e;font-size:12px;line-height:1.5;">
					<strong>iTANZ Technologies Limited</strong> &middot; Official Website Notification System<br />
					Delivering enterprise technology, analytics and managed digital capability.
				</div>
			</div>
		</div>
	</div>`;

export const sendEmail = async ({
	from,
	to,
	cc,
	bcc,
	reply_to,
	subject,
	html,
	text,
	attachments,
}) => {
	const apiKey = getResendApiKey();
	if (!apiKey) {
		console.warn("Resend email skipped: RESEND_API_KEY is not configured.");
		return { ok: false, skipped: true, error: "API key missing" };
	}

	const fromAddress = from || getResendFromEmail();
	const toAddresses = Array.isArray(to) ? to.filter(Boolean) : [to].filter(Boolean);

	if (!toAddresses.length) {
		console.warn("Resend email skipped: No recipient address specified.");
		return { ok: false, skipped: true, error: "Recipient missing" };
	}

	const payload = {
		from: fromAddress,
		to: toAddresses,
		subject,
		html,
		text: text || "",
	};

	if (reply_to) payload.reply_to = reply_to;
	if (cc && cc.length) payload.cc = cc;
	if (bcc && bcc.length) payload.bcc = bcc;
	if (attachments && attachments.length) payload.attachments = attachments;

	try {
		const response = await fetch(RESEND_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const result = await response.json().catch(() => null);

		if (!response.ok) {
			const errorMsg = result?.message || result?.error || `HTTP ${response.status}`;
			console.error("Resend API rejected email:", errorMsg, { to: toAddresses, subject });
			return { ok: false, error: errorMsg, status: response.status };
		}

		return { ok: true, id: result?.id };
	} catch (networkError) {
		console.error("Resend fetch network error:", networkError.message);
		return { ok: false, error: networkError.message };
	}
};
