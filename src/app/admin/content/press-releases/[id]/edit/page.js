import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Edit Press Release | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default async function AdminEditPressReleasePage({ params }) {
	const { id } = await params;
	return <ItanzAdminDashboard section="content" action="edit" contentKind="press-releases" recordId={id} />;
}
