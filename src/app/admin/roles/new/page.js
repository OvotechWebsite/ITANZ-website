import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Add Role | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewRolePage() {
	return <ItanzAdminDashboard section="roles" action="new" />;
}
