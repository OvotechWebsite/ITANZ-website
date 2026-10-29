import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Open Roles | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminRolesPage() {
	return <ItanzAdminDashboard section="roles" />;
}
