const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_PUBLISHABLE_KEY =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || "";
const SUPABASE_BUCKET = process.env.SUPABASE_RECEIPTS_BUCKET || "itanz-uploads";
const SUPABASE_MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || SUPABASE_BUCKET;

const trimSlashes = value => String(value || "").replace(/^\/+|\/+$/g, "");

export const isSupabaseConfigured = () =>
	Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

export const isSupabaseServiceConfigured = () =>
	Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);

export const normalizeJob = job => ({
	id: job.id,
	slug: job.slug,
	title: job.title,
	iconName: job.icon_name || job.iconName || "tji-manage",
	location: job.location || "Global / Hybrid",
	category: job.category || "Technology",
	need: job.need || job.status_label || "Talent Pool",
	workModel: job.work_model || job.workModel || job.work_type || "Hybrid",
	level: job.level || job.experience_level || "Mid Level",
	summary: job.summary || job.description || "",
	responsibilities: job.responsibilities || [],
	requirements: job.requirements || [],
	isActive: job.is_active ?? job.isActive ?? true,
	sortOrder: job.sort_order ?? job.sortOrder ?? 0,
	datePosted: job.created_at || job.datePosted,
});

export const normalizeJobs = jobs =>
	(jobs || []).map(normalizeJob).sort((a, b) => a.sortOrder - b.sortOrder);

const getHeaders = ({ service = false, accessToken, contentType = true } = {}) => {
	const apiKey = service ? SUPABASE_SECRET_KEY : SUPABASE_PUBLISHABLE_KEY;
	const headers = {
		apikey: apiKey,
		Authorization: `Bearer ${accessToken || apiKey}`,
	};

	if (contentType) {
		headers["Content-Type"] = "application/json";
	}

	return headers;
};

export const supabaseFetch = async (
	path,
	{
		method = "GET",
		body,
		service = false,
		accessToken,
		headers = {},
		signal,
		timeoutMs,
	} = {}
) => {
	if (!SUPABASE_URL || !(service ? SUPABASE_SECRET_KEY : SUPABASE_PUBLISHABLE_KEY)) {
		throw new Error("Supabase is not configured.");
	}

	const requestTimeout = timeoutMs ?? (method === "GET" ? 12000 : 0);
	const requestSignal = signal ||
		(requestTimeout > 0 ? AbortSignal.timeout(requestTimeout) : undefined);
	const response = await fetch(`${SUPABASE_URL}/${trimSlashes(path)}`, {
		method,
		headers: {
			...getHeaders({ service, accessToken }),
			...headers,
		},
		body: body === undefined ? undefined : JSON.stringify(body),
		cache: "no-store",
		signal: requestSignal,
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Supabase request failed.");
	}

	if (response.status === 204) {
		return null;
	}

	const text = await response.text();
	return text ? JSON.parse(text) : null;
};

export const getAdminFromToken = async accessToken => {
	if (!accessToken || !isSupabaseServiceConfigured()) {
		return null;
	}

	const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
		headers: {
			apikey: SUPABASE_PUBLISHABLE_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
		cache: "no-store",
	});

	if (!userResponse.ok) {
		return null;
	}

	const user = await userResponse.json();
	const email = String(user?.email || "").toLowerCase();

	if (!email) {
		return null;
	}

	const admins = await supabaseFetch(
		`rest/v1/itanz_admin_users?select=id,email,name,is_active&email=eq.${encodeURIComponent(email)}&is_active=eq.true&limit=1`,
		{ service: true }
	);

	return admins?.[0] || null;
};

export const requireAdmin = async request => {
	const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
	const admin = await getAdminFromToken(token);

	if (!admin) {
		return { admin: null, error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
	}

	return { admin, token };
};

export const getSupabasePublicUrl = (objectPath, bucket = SUPABASE_MEDIA_BUCKET) => {
	if (!SUPABASE_URL || !objectPath || !bucket) {
		return "";
	}

	return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${trimSlashes(objectPath)}`;
};

export const uploadSupabaseFile = async ({
	file,
	folder = "uploads",
	bucket = SUPABASE_BUCKET,
}) => {
	if (!bucket || !isSupabaseServiceConfigured()) {
		return "";
	}

	const safeName = String(file.name || "upload")
		.replace(/[^a-zA-Z0-9._-]+/g, "-")
		.replace(/-+/g, "-");
	const objectPath = `${trimSlashes(folder)}/${Date.now()}-${safeName}`;
	const response = await fetch(
		`${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`,
		{
			method: "PUT",
			headers: {
				apikey: SUPABASE_SECRET_KEY,
				Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
				"Content-Type": file.type || "application/octet-stream",
				"x-upsert": "false",
			},
			body: Buffer.from(await file.arrayBuffer()),
		}
	);

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Unable to upload file to Supabase.");
	}

	return objectPath;
};

export const createSupabaseSignedUrl = async (objectPath, expiresIn = 3600) => {
	if (!objectPath || !SUPABASE_BUCKET || !isSupabaseServiceConfigured()) {
		return "";
	}

	const response = await fetch(
		`${SUPABASE_URL}/storage/v1/object/sign/${SUPABASE_BUCKET}/${trimSlashes(objectPath)}`,
		{
			method: "POST",
			headers: {
				apikey: SUPABASE_SECRET_KEY,
				Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ expiresIn }),
			cache: "no-store",
		}
	);

	if (!response.ok) {
		return "";
	}

	const result = await response.json();
	return result?.signedURL ? `${SUPABASE_URL}/storage/v1${result.signedURL}` : "";
};
