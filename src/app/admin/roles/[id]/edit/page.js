import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Edit Role | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default async function AdminEditRolePage({ params }) {
	const { id } = await params;
	return <ItanzAdminDashboard section="roles" action="edit" recordId={id} />;
}
