import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Press Releases | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminPressReleasesPage() {
	return <ItanzAdminDashboard section="content" contentKind="press-releases" />;
}
