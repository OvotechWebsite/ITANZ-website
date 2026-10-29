import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Edit News | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default async function AdminEditNewsPage({ params }) {
	const { id } = await params;
	return <ItanzAdminDashboard section="content" action="edit" contentKind="news" recordId={id} />;
}
