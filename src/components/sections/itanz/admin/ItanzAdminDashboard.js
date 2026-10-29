"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "itanz_admin_token";

const emptyJobForm = {
	title: "",
	slug: "",
	category: "",
	location: "",
	work_type: "",
	experience_level: "",
	summary: "",
	responsibilities: "",
	requirements: "",
	sort_order: "0",
	is_active: true,
};

const emptyContentForm = {
	type: "blog",
	status: "draft",
	title: "",
	slug: "",
	category: "",
	excerpt: "",
	content: "",
	thumbnail_url: "",
	banner_url: "",
	meta_title: "",
	meta_description: "",
};

const contentSections = {
	blogs: { label: "Blogs", type: "blog", path: "/admin/content/blogs" },
	news: { label: "News", type: "news", path: "/admin/content/news" },
	"press-releases": { label: "Press Releases", type: "press_release", path: "/admin/content/press-releases" },
	"case-studies": { label: "Case Studies", type: "case_study", path: "/admin/content/case-studies" },
};

const adminLinks = [
	{ label: "Overview", href: "/admin", section: "overview" },
	{ label: "Contact", href: "/admin/contact-submissions", section: "contact" },
	{ label: "Talent", href: "/admin/talent-network", section: "talent" },
	{ label: "Open Roles", href: "/admin/roles", section: "roles" },
	{ label: "Blogs", href: "/admin/content/blogs", section: "blogs" },
	{ label: "News", href: "/admin/content/news", section: "news" },
	{ label: "Press Releases", href: "/admin/content/press-releases", section: "press-releases" },
	{ label: "Case Studies", href: "/admin/content/case-studies", section: "case-studies" },
];

const formatDate = value =>
	value
		? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
		: "-";

const slugify = value =>
	String(value || "")
		.trim()
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const listToText = value => (Array.isArray(value) ? value.join("\n") : value || "");

const jobToForm = job => ({
	title: job.title || "",
	slug: job.slug || "",
	category: job.category || "",
	location: job.location || "",
	work_type: job.work_type || job.workType || job.workModel || "",
	experience_level: job.experience_level || job.experienceLevel || job.level || "",
	summary: job.summary || job.description || "",
	responsibilities: listToText(job.responsibilities),
	requirements: listToText(job.requirements),
	sort_order: String(job.sort_order ?? job.sortOrder ?? 0),
	is_active: job.is_active ?? job.isActive ?? true,
});

const contentToForm = post => ({
	type: post.type || "blog",
	status: post.status || "draft",
	title: post.title || "",
	slug: post.slug || "",
	category: post.category || "",
	excerpt: post.excerpt || "",
	content: post.content || "",
	thumbnail_url: post.thumbnail_url || "",
	banner_url: post.banner_url || "",
	meta_title: post.meta_title || "",
	meta_description: post.meta_description || "",
});

const FieldValue = ({ label, value }) => (
	<div className="itanz-admin-field">
		<span>{label}</span>
		<strong>{Array.isArray(value) ? value.join(", ") : value || "-"}</strong>
	</div>
);

const HelperText = ({ children }) => <small className="itanz-admin-helper">{children}</small>;

const CharacterCounter = ({ value, ideal }) => (
	<small className="itanz-admin-counter">
		{String(value || "").length} characters{ideal ? ` · Ideal ${ideal}` : ""}
	</small>
);

const ImageUploadField = ({
	label,
	name,
	value,
	helper,
	isUploading,
	onTextChange,
	onUpload,
}) => (
	<div className="itanz-admin-upload-field">
		<label>
			{label}
			<input name={name} value={value} onChange={onTextChange} placeholder="Upload an image or paste a public image URL" />
			<HelperText>{helper}</HelperText>
		</label>
		<div className="itanz-admin-upload-row">
			<label className="itanz-admin-upload-btn">
				{isUploading ? "Uploading..." : "Upload Image"}
				<input
					type="file"
					accept="image/*"
					disabled={isUploading}
					onChange={event => onUpload(event, name)}
				/>
			</label>
			{value ? <a href={value} target="_blank" rel="noreferrer">Open image</a> : null}
		</div>
		{value ? (
			<div className="itanz-admin-image-preview">
				<img src={value} alt={`${label} preview`} />
			</div>
		) : null}
	</div>
);

const getContentRoute = form => {
	if (!form.slug) return "A public URL will appear after adding a slug.";
	if (form.type === "case_study") return `/case-studies/${form.slug}`;
	if (form.type === "blog") return `/insights/blogs/${form.slug}`;
	return `/insights/newsroom/${form.slug}`;
};

const SubmissionList = ({ rows, type }) => {
	if (!rows.length) return <p className="itanz-admin-empty">No submissions yet.</p>;

	return (
		<div className="itanz-admin-records">
			{rows.map(row => (
				<article key={row.id} className="itanz-admin-record">
					<div className="itanz-admin-record-head">
						<div>
							<span>{formatDate(row.created_at)}</span>
							<h3>{type === "talent" ? row.full_name : row.name}</h3>
						</div>
						<a href={`mailto:${row.email}`}>{row.email}</a>
					</div>
					<div className="itanz-admin-grid">
						{type === "talent" ? (
							<>
								<FieldValue label="Phone" value={row.phone} />
								<FieldValue label="Location" value={[row.city, row.country].filter(Boolean).join(", ")} />
								<FieldValue label="Areas" value={row.areas_of_interest} />
								<FieldValue label="Experience" value={row.experience_level} />
								<FieldValue label="Opportunity" value={row.opportunity_type} />
								<FieldValue label="Preferred Location" value={row.preferred_locations} />
								<FieldValue label="Portfolio" value={row.portfolio_url} />
								<FieldValue label="Source" value={row.source_page} />
								{row.cv_signed_url ? (
									<div className="itanz-admin-field">
										<span>CV</span>
										<a href={row.cv_signed_url} target="_blank" rel="noreferrer">View CV</a>
									</div>
								) : (
									<FieldValue label="CV Storage Path" value={row.cv_file_url} />
								)}
								<FieldValue label="Impact" value={row.impact_statement} />
							</>
						) : (
							<>
								<FieldValue label="Company" value={row.company} />
								<FieldValue label="Phone" value={row.phone} />
								<FieldValue label="Region" value={row.region} />
								<FieldValue label="Solution" value={row.solution} />
								<FieldValue label="Industry" value={row.industry} />
								<FieldValue label="Enquiry Type" value={row.enquiry_type} />
								<FieldValue label="Source" value={row.source_page} />
								<FieldValue label="Message" value={row.message} />
							</>
						)}
					</div>
				</article>
			))}
		</div>
	);
};

const AdminTable = ({ columns, rows, emptyText }) => (
	<div className="itanz-admin-table-wrap">
		<table className="itanz-admin-table">
			<thead>
				<tr>
					{columns.map(column => (
						<th key={column.key}>{column.label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.length ? (
					rows.map(row => (
						<tr key={row.id}>
							{columns.map(column => (
								<td key={column.key}>{column.render(row)}</td>
							))}
						</tr>
					))
				) : (
					<tr>
						<td colSpan={columns.length}>{emptyText}</td>
					</tr>
				)}
			</tbody>
		</table>
	</div>
);

const ItanzAdminDashboard = ({ section = "overview", action = "list", contentKind = "", recordId = "" }) => {
	const router = useRouter();
	const [token, setToken] = useState("");
	const [admin, setAdmin] = useState(null);
	const [contactRows, setContactRows] = useState([]);
	const [talentRows, setTalentRows] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [contentRows, setContentRows] = useState([]);
	const [jobForm, setJobForm] = useState(emptyJobForm);
	const [contentForm, setContentForm] = useState({ ...emptyContentForm, type: contentSections[contentKind]?.type || "blog" });
	const [contentSlugTouched, setContentSlugTouched] = useState(false);
	const [uploadingImage, setUploadingImage] = useState("");
	const [deleteDialog, setDeleteDialog] = useState(null);
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isLoading, setIsLoading] = useState(true);

	const currentContent = contentSections[contentKind];
	const isRoleForm = section === "roles" && action !== "list";
	const isContentForm = section === "content" && action !== "list";
	const editingJobId = isRoleForm && action === "edit" ? recordId : "";
	const editingContentId = isContentForm && action === "edit" ? recordId : "";

	const headers = useMemo(() => ({
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	}), [token]);

	const adminFetch = async path => {
		const response = await fetch(path, { headers, cache: "no-store" });
		const result = await response.json();
		if (!response.ok) throw new Error(result?.error || "Admin request failed.");
		return result;
	};

	const loadDashboard = async nextToken => {
		try {
			const nextHeaders = { Authorization: `Bearer ${nextToken}`, "Content-Type": "application/json" };
			const meResponse = await fetch("/api/admin/me", { headers: nextHeaders, cache: "no-store" });
			const me = await meResponse.json();
			if (!meResponse.ok) throw new Error(me?.error || "Unauthorized");

			setAdmin(me.admin);
			const [contact, talent, jobRows, content] = await Promise.all([
				fetch("/api/admin/contact-submissions", { headers: nextHeaders }).then(res => res.json()),
				fetch("/api/admin/talent-submissions", { headers: nextHeaders }).then(res => res.json()),
				fetch("/api/admin/jobs", { headers: nextHeaders }).then(res => res.json()),
				fetch("/api/admin/content", { headers: nextHeaders }).then(res => res.json()),
			]);

			setContactRows(contact.rows || []);
			setTalentRows(talent.rows || []);
			setJobs(jobRows.rows || []);
			setContentRows(content.rows || []);
		} catch (error) {
			window.localStorage.removeItem(TOKEN_KEY);
			router.replace("/admin/login");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const storedToken = window.localStorage.getItem(TOKEN_KEY);
		if (!storedToken) {
			router.replace("/admin/login");
			return;
		}
		setToken(storedToken);
		loadDashboard(storedToken);
	}, []);

	useEffect(() => {
		if (isLoading) return;

		if (isRoleForm) {
			if (editingJobId) {
				const job = jobs.find(item => String(item.id) === String(editingJobId));
				if (job) setJobForm(jobToForm(job));
			} else {
				setJobForm(emptyJobForm);
			}
		}

		if (isContentForm) {
			if (editingContentId) {
				const post = contentRows.find(item => String(item.id) === String(editingContentId));
				if (post) {
					setContentForm(contentToForm(post));
					setContentSlugTouched(true);
				}
			} else {
				setContentForm({ ...emptyContentForm, type: currentContent?.type || "blog" });
				setContentSlugTouched(false);
			}
		}
	}, [isLoading, section, action, contentKind, recordId, jobs, contentRows]);

	const logout = () => {
		window.localStorage.removeItem(TOKEN_KEY);
		router.replace("/admin/login");
	};

	const handleJobChange = event => {
		const { checked, name, type, value } = event.target;
		setJobForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
	};

	const handleContentChange = event => {
		const { name, value } = event.target;
		setContentForm(prev => ({
			...prev,
			[name]: value,
			...(name === "title" && !contentSlugTouched && !editingContentId ? { slug: slugify(value) } : {}),
		}));
		if (name === "slug") setContentSlugTouched(true);
	};

	const uploadContentImage = async (event, fieldName) => {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) {
			return;
		}

		setUploadingImage(fieldName);
		setStatus({ type: "", message: "" });

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("usage", fieldName === "thumbnail_url" ? "thumbnail" : "banner");

			const response = await fetch("/api/admin/media", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.error || "Unable to upload image.");
			}

			setContentForm(prev => ({
				...prev,
				[fieldName]: result.url,
			}));
			setStatus({ type: "success", message: "Image uploaded successfully." });
		} catch (error) {
			setStatus({ type: "error", message: error?.message || "Unable to upload image." });
		} finally {
			setUploadingImage("");
		}
	};

	const saveJob = async event => {
		event.preventDefault();
		setStatus({ type: "", message: "" });
		try {
			const response = await fetch("/api/admin/jobs", {
				method: editingJobId ? "PATCH" : "POST",
				headers,
				body: JSON.stringify({ ...jobForm, id: editingJobId || undefined }),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result?.error || "Unable to save role.");
			setStatus({ type: "success", message: editingJobId ? "Role updated successfully." : "Role created successfully." });
			router.push("/admin/roles");
		} catch (error) {
			setStatus({ type: "error", message: error?.message || "Unable to save role." });
		}
	};

	const saveContent = async event => {
		event.preventDefault();
		setStatus({ type: "", message: "" });
		const submitterValue = event.nativeEvent?.submitter?.value;
		const nextStatus = ["published", "draft"].includes(submitterValue) ? submitterValue : contentForm.status;

		try {
			const response = await fetch("/api/admin/content", {
				method: editingContentId ? "PATCH" : "POST",
				headers,
				body: JSON.stringify({
					...contentForm,
					status: nextStatus,
					type: currentContent?.type || contentForm.type,
					id: editingContentId || undefined,
				}),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result?.error || "Unable to save content.");
			setStatus({ type: "success", message: editingContentId ? "Content updated successfully." : "Content created successfully." });
			router.push(currentContent?.path || "/admin/content/blogs");
		} catch (error) {
			setStatus({ type: "error", message: error?.message || "Unable to save content." });
		}
	};

	const refreshJobs = async () => {
		const nextJobs = await adminFetch("/api/admin/jobs");
		setJobs(nextJobs.rows || []);
	};

	const refreshContent = async () => {
		const nextContent = await adminFetch("/api/admin/content");
		setContentRows(nextContent.rows || []);
	};

	const toggleJob = async job => {
		try {
			await fetch("/api/admin/jobs", {
				method: "PATCH",
				headers,
				body: JSON.stringify({ id: job.id, is_active: !job.isActive, toggleOnly: true }),
			});
			await refreshJobs();
		} catch (error) {
			setStatus({ type: "error", message: "Unable to update role status." });
		}
	};

	const toggleContentStatus = async post => {
		try {
			const nextStatus = post.status === "published" ? "draft" : "published";
			await fetch("/api/admin/content", {
				method: "PATCH",
				headers,
				body: JSON.stringify({ id: post.id, status: nextStatus, statusOnly: true }),
			});
			await refreshContent();
		} catch (error) {
			setStatus({ type: "error", message: "Unable to update content status." });
		}
	};

	const openDeleteDialog = ({ type, item }) => {
		setDeleteDialog({
			type,
			id: item.id,
			title: item.title,
			description: type === "job"
				? "This will permanently remove this role from the website and admin dashboard."
				: "This will permanently remove this content item from the website and admin dashboard.",
		});
	};

	const confirmDelete = async () => {
		const isJob = deleteDialog?.type === "job";
		if (!deleteDialog) return;
		try {
			const response = await fetch(isJob ? "/api/admin/jobs" : "/api/admin/content", {
				method: "DELETE",
				headers,
				body: JSON.stringify({ id: deleteDialog.id }),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result?.error || "Unable to delete record.");
			if (isJob) await refreshJobs();
			else await refreshContent();
			setDeleteDialog(null);
			setStatus({ type: "success", message: "Record deleted successfully." });
		} catch (error) {
			setStatus({ type: "error", message: error?.message || "Unable to delete record." });
		}
	};

	const filteredContent = currentContent ? contentRows.filter(post => post.type === currentContent.type) : contentRows;
	const contentCounts = Object.values(contentSections).map(item => ({
		...item,
		count: contentRows.filter(post => post.type === item.type).length,
		published: contentRows.filter(post => post.type === item.type && post.status === "published").length,
	}));
	const contactColumns = [
		{ key: "date", label: "Date", render: row => formatDate(row.created_at) },
		{ key: "name", label: "Name", render: row => <strong>{row.name || "-"}</strong> },
		{ key: "email", label: "Email", render: row => <a href={`mailto:${row.email}`}>{row.email}</a> },
		{ key: "company", label: "Company", render: row => row.company || "-" },
		{ key: "solution", label: "Solution", render: row => row.solution || "-" },
		{ key: "source", label: "Source", render: row => row.source_page || "-" },
	];
	const talentColumns = [
		{ key: "date", label: "Date", render: row => formatDate(row.created_at) },
		{ key: "name", label: "Name", render: row => <strong>{row.full_name || "-"}</strong> },
		{ key: "email", label: "Email", render: row => <a href={`mailto:${row.email}`}>{row.email}</a> },
		{ key: "location", label: "Location", render: row => [row.city, row.country].filter(Boolean).join(", ") || "-" },
		{ key: "experience", label: "Experience", render: row => row.experience_level || "-" },
		{
			key: "cv",
			label: "CV",
			render: row => row.cv_signed_url ? <a href={row.cv_signed_url} target="_blank" rel="noreferrer">View CV</a> : "-",
		},
	];
	const roleColumns = [
		{ key: "title", label: "Role", render: job => <strong>{job.title}</strong> },
		{ key: "category", label: "Category", render: job => job.category || "-" },
		{ key: "location", label: "Location", render: job => job.location || "-" },
		{ key: "level", label: "Level", render: job => job.level || "-" },
		{ key: "status", label: "Status", render: job => job.isActive ? "Active" : "Inactive" },
		{
			key: "actions",
			label: "Actions",
			render: job => (
				<div className="itanz-admin-record-actions">
					<Link href={`/admin/roles/${job.id}/edit`}>Edit</Link>
					<button type="button" onClick={() => toggleJob(job)}>{job.isActive ? "Deactivate" : "Activate"}</button>
					<button className="danger" type="button" onClick={() => openDeleteDialog({ type: "job", item: job })}>Delete</button>
				</div>
			),
		},
	];
	const contentColumns = [
		{ key: "title", label: "Title", render: post => <strong>{post.title}</strong> },
		{ key: "slug", label: "Slug", render: post => post.slug || "-" },
		{ key: "category", label: "Category", render: post => post.category || "-" },
		{ key: "status", label: "Status", render: post => post.status || "-" },
		{ key: "published", label: "Published", render: post => formatDate(post.published_at) },
		{
			key: "actions",
			label: "Actions",
			render: post => (
				<div className="itanz-admin-record-actions">
					<Link href={`${currentContent?.path}/${post.id}/edit`}>Edit</Link>
					<button type="button" onClick={() => toggleContentStatus(post)}>{post.status === "published" ? "Move to Draft" : "Publish"}</button>
					<button className="danger" type="button" onClick={() => openDeleteDialog({ type: "content", item: post })}>Delete</button>
				</div>
			),
		},
	];
	const pageTitle = section === "overview" ? "Overview" : section === "contact" ? "Contact submissions" : section === "talent" ? "Talent network" : section === "roles" ? "Open roles" : currentContent?.label || "Content";

	if (isLoading) {
		return (
			<main className="itanz-admin-shell">
				<p className="itanz-admin-empty">Loading dashboard...</p>
			</main>
		);
	}

	return (
		<main className="itanz-admin-shell">
			<aside className="itanz-admin-sidebar">
				<div className="itanz-admin-brand">
					<img src="/images/logos/logo.webp" alt="iTANZ" />
					<span>Admin</span>
				</div>
				<nav className="itanz-admin-tabs" aria-label="Admin dashboard navigation">
					{adminLinks.map(link => (
						<Link key={link.href} className={section === link.section || contentKind === link.section ? "active" : ""} href={link.href}>
							{link.label}
						</Link>
					))}
				</nav>
				<div className="itanz-admin-user">
					<span>{admin?.email}</span>
					<button type="button" onClick={logout}>Logout</button>
				</div>
			</aside>

			<section className="itanz-admin-main">
				<header className="itanz-admin-header">
					<div>
						<span>Website Dashboard</span>
						<h1>{pageTitle}</h1>
					</div>
					<div className="itanz-admin-counts">
						<span>{contactRows.length} contact</span>
						<span>{talentRows.length} talent</span>
						<span>{jobs.length} roles</span>
						<span>{contentRows.length} content</span>
					</div>
				</header>

				{status.message ? <p className={`itanz-form-status ${status.type}`}>{status.message}</p> : null}

				{section === "overview" ? (
					<section className="itanz-admin-panel">
						<div className="itanz-admin-overview-grid">
							<FieldValue label="Contact Submissions" value={contactRows.length} />
							<FieldValue label="Talent Profiles" value={talentRows.length} />
							<FieldValue label="Active Roles" value={jobs.filter(job => job.isActive).length} />
							<FieldValue label="Published Content" value={contentRows.filter(post => post.status === "published").length} />
						</div>
						<div className="itanz-admin-records">
							<article className="itanz-admin-record">
								<div className="itanz-admin-record-head">
									<div>
										<span>Content Library</span>
										<h3>Publishing Overview</h3>
									</div>
								</div>
								<div className="itanz-admin-grid">
									{contentCounts.map(item => (
										<FieldValue key={item.type} label={item.label} value={`${item.published}/${item.count} published`} />
									))}
								</div>
							</article>
							<article className="itanz-admin-record">
								<div className="itanz-admin-record-head">
									<div>
										<span>Recent Activity</span>
										<h3>Latest Contact Submissions</h3>
									</div>
									<Link href="/admin/contact-submissions">View all</Link>
								</div>
								<SubmissionList rows={contactRows.slice(0, 3)} type="contact" />
							</article>
						</div>
					</section>
				) : null}

				{section === "contact" ? (
					<AdminTable columns={contactColumns} rows={contactRows} emptyText="No contact submissions yet." />
				) : null}
				{section === "talent" ? (
					<AdminTable columns={talentColumns} rows={talentRows} emptyText="No talent profiles yet." />
				) : null}

				{section === "roles" && action === "list" ? (
					<section className="itanz-admin-panel">
						<div className="itanz-admin-list-toolbar">
							<div>
								<h2>Open Roles</h2>
								<p>Manage the career roles shown on the website.</p>
							</div>
							<Link className="itanz-admin-primary-btn" href="/admin/roles/new">Add Role</Link>
						</div>
						<AdminTable columns={roleColumns} rows={jobs} emptyText="No roles yet." />
					</section>
				) : null}

				{isRoleForm ? (
					<section className="itanz-admin-panel">
						<form className="itanz-admin-job-form itanz-admin-form-page" onSubmit={saveJob}>
							<div className="itanz-admin-form-head">
								<div>
									<span>Open Roles</span>
									<h2>{editingJobId ? "Edit Role" : "Add Role"}</h2>
									<p>{editingJobId ? "Update this role across the careers page." : "Create a new role for the careers page."}</p>
								</div>
								<Link href="/admin/roles">Cancel</Link>
							</div>
							<label>Title<input name="title" value={jobForm.title} onChange={handleJobChange} required /></label>
							<label>Slug<input name="slug" value={jobForm.slug} onChange={handleJobChange} placeholder="auto from title if blank" /></label>
							<label>Category<input name="category" value={jobForm.category} onChange={handleJobChange} /></label>
							<label>Location<input name="location" value={jobForm.location} onChange={handleJobChange} /></label>
							<label>Work Type<input name="work_type" value={jobForm.work_type} onChange={handleJobChange} /></label>
							<label>Experience Level<input name="experience_level" value={jobForm.experience_level} onChange={handleJobChange} /></label>
							<label>Sort Order<input name="sort_order" type="number" value={jobForm.sort_order} onChange={handleJobChange} /></label>
							<label>Summary<textarea name="summary" value={jobForm.summary} onChange={handleJobChange} required /></label>
							<label>Responsibilities<textarea name="responsibilities" value={jobForm.responsibilities} onChange={handleJobChange} placeholder="One item per line" /></label>
							<label>Requirements<textarea name="requirements" value={jobForm.requirements} onChange={handleJobChange} placeholder="One item per line" /></label>
							<label className="itanz-admin-checkbox"><input type="checkbox" name="is_active" checked={jobForm.is_active} onChange={handleJobChange} />Active</label>
							<button className="itanz-admin-primary-btn" type="submit">{editingJobId ? "Update Role" : "Add Role"}</button>
						</form>
					</section>
				) : null}

				{section === "content" && action === "list" ? (
					<section className="itanz-admin-panel">
						<div className="itanz-admin-list-toolbar">
							<div>
								<h2>{currentContent?.label}</h2>
								<p>Manage {currentContent?.label?.toLowerCase()} shown on the website.</p>
							</div>
							<Link className="itanz-admin-primary-btn" href={`${currentContent?.path}/new`}>Add {currentContent?.label}</Link>
						</div>
						<AdminTable columns={contentColumns} rows={filteredContent} emptyText="No content yet." />
					</section>
				) : null}

				{isContentForm ? (
					<section className="itanz-admin-panel">
						<form className="itanz-admin-job-form itanz-admin-form-page itanz-admin-content-form" onSubmit={saveContent}>
							<div className="itanz-admin-form-head">
								<div>
									<span>{currentContent?.label}</span>
									<h2>{editingContentId ? "Edit Content" : "Add Content"}</h2>
									<p>{editingContentId ? "Update this website content item." : "Create a website content item."}</p>
								</div>
								<Link href={currentContent?.path || "/admin/content/blogs"}>Cancel</Link>
							</div>
							<section className="itanz-admin-form-card">
								<div className="itanz-admin-form-card-head"><span>Content Basics</span><p>Set where this item appears and how it is identified.</p></div>
								<div className="itanz-admin-form-grid">
									<label>Type<input value={currentContent?.label || contentForm.type} readOnly /></label>
									<label>Category<input name="category" value={contentForm.category} onChange={handleContentChange} placeholder="Corporate News, Press Release, Strategy..." /></label>
									<label className="wide">Title<input name="title" value={contentForm.title} onChange={handleContentChange} required /></label>
									<label className="wide">Slug<input name="slug" value={contentForm.slug} onChange={handleContentChange} placeholder="auto from title if blank" /><HelperText>Used in the public URL. Leave untouched while adding to auto-generate from title.</HelperText></label>
								</div>
								<div className="itanz-admin-url-preview"><span>Public URL</span><strong>{getContentRoute(contentForm)}</strong></div>
							</section>
							<section className="itanz-admin-form-card">
								<div className="itanz-admin-form-card-head"><span>Summary & Body</span><p>Write the content shown on listing and detail pages.</p></div>
								<label>Excerpt<textarea name="excerpt" value={contentForm.excerpt} onChange={handleContentChange} required /><HelperText>Short summary for cards, previews and fallback meta description.</HelperText></label>
								<label>Content<textarea className="itanz-admin-editor" name="content" value={contentForm.content} onChange={handleContentChange} placeholder={"Use paragraphs for normal text.\nUse ## Heading for sections.\nUse - bullet for lists."} required /></label>
								<div className="itanz-admin-format-guide"><strong>Formatting guide</strong><span>## The Problem</span><span>- Bullet point</span><span>Blank lines are okay.</span></div>
							</section>
							<section className="itanz-admin-form-card">
								<div className="itanz-admin-form-card-head"><span>Media</span><p>Upload images for listing cards and detail page hero banners.</p></div>
								<div className="itanz-admin-media-note">
									<strong>Before uploading</strong>
									<span>1. Convert the image to WEBP at <a href="https://pixelied.com/convert" target="_blank" rel="noreferrer">pixelied.com/convert</a>.</span>
									<span>2. Compress the WEBP at <a href="https://tinypng.com/" target="_blank" rel="noreferrer">tinypng.com</a>.</span>
									<span>3. Upload the final image here. Maximum file size: 1MB.</span>
								</div>
								<div className="itanz-admin-form-grid">
									<ImageUploadField
										label="Thumbnail Image"
										name="thumbnail_url"
										value={contentForm.thumbnail_url}
										helper="Used on cards and listing pages. WEBP preferred, maximum 1MB."
										isUploading={uploadingImage === "thumbnail_url"}
										onTextChange={handleContentChange}
										onUpload={uploadContentImage}
									/>
									<ImageUploadField
										label="Banner Image"
										name="banner_url"
										value={contentForm.banner_url}
										helper="Used as the detail page hero image. Wide WEBP images under 1MB work best."
										isUploading={uploadingImage === "banner_url"}
										onTextChange={handleContentChange}
										onUpload={uploadContentImage}
									/>
								</div>
							</section>
							<section className="itanz-admin-form-card">
								<div className="itanz-admin-form-card-head"><span>SEO</span><p>Control how this page appears in search previews.</p></div>
								<label>Meta Title<input name="meta_title" value={contentForm.meta_title} onChange={handleContentChange} /><CharacterCounter value={contentForm.meta_title} ideal="50-60" /></label>
								<label>Meta Description<textarea name="meta_description" value={contentForm.meta_description} onChange={handleContentChange} /><CharacterCounter value={contentForm.meta_description} ideal="140-160" /></label>
							</section>
							<section className="itanz-admin-publish-bar">
								<div><span>Publishing</span><strong>{contentForm.status === "published" ? "Ready to publish" : "Saved as draft"}</strong><p>Save privately as a draft, or publish immediately to the website.</p></div>
								<div className="itanz-admin-publish-actions">
									<button className="itanz-admin-secondary-btn" type="submit" value="draft">Save Draft</button>
									<button className="itanz-admin-primary-btn" type="submit" value="published">{editingContentId ? "Update & Publish" : "Publish"}</button>
								</div>
							</section>
						</form>
					</section>
				) : null}
			</section>

			{deleteDialog ? (
				<div className="itanz-admin-modal" role="dialog" aria-modal="true" aria-labelledby="itanz-delete-title">
					<div className="itanz-admin-modal-card">
						<span>Confirm Delete</span>
						<h2 id="itanz-delete-title">Delete &ldquo;{deleteDialog.title}&rdquo;?</h2>
						<p>{deleteDialog.description} This action cannot be undone.</p>
						<div className="itanz-admin-modal-actions">
							<button type="button" onClick={() => setDeleteDialog(null)}>Cancel</button>
							<button className="danger" type="button" onClick={confirmDelete}>Delete Permanently</button>
						</div>
					</div>
				</div>
			) : null}
		</main>
	);
};

export default ItanzAdminDashboard;
