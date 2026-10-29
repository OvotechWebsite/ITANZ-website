import {
	getSupabasePublicUrl,
	isSupabaseServiceConfigured,
	requireAdmin,
	uploadSupabaseFile,
} from "@/libs/itanzSupabase";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

export async function POST(request) {
	try {
		const { error } = await requireAdmin(request);

		if (error) {
			return error;
		}

		const formData = await request.formData();

		if (!isSupabaseServiceConfigured()) {
			return Response.json({ error: "Media storage is not configured. Please paste an image URL directly." }, { status: 400 });
		}
		const file = formData.get("file");
		const usage = String(formData.get("usage") || "media")
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, "-");

		if (!file || typeof file === "string") {
			return Response.json({ error: "Image file is required." }, { status: 400 });
		}

		if (!String(file.type || "").startsWith("image/")) {
			return Response.json({ error: "Only image uploads are supported." }, { status: 400 });
		}

		if (file.size > MAX_IMAGE_SIZE) {
			return Response.json(
				{ error: "Image must be 1MB or smaller." },
				{ status: 400 }
			);
		}

		const objectPath = await uploadSupabaseFile({
			file,
			folder: `content/${usage}`,
		});

		if (!objectPath) {
			return Response.json({ error: "Unable to upload image." }, { status: 500 });
		}

		return Response.json({
			objectPath,
			url: getSupabasePublicUrl(objectPath),
		});
	} catch (error) {
		console.error("Admin media upload error:", error);
		return Response.json({ error: "Unable to upload image." }, { status: 500 });
	}
}
