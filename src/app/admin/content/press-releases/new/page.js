import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Add Press Release | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewPressReleasePage() {
	return <ItanzAdminDashboard section="content" action="new" contentKind="press-releases" />;
}
