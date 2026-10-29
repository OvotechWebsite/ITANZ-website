import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Edit Blog | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default async function AdminEditBlogPage({ params }) {
	const { id } = await params;
	return <ItanzAdminDashboard section="content" action="edit" contentKind="blogs" recordId={id} />;
}
