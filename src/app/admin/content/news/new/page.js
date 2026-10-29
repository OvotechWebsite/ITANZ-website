import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Add News | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewNewsPage() {
	return <ItanzAdminDashboard section="content" action="new" contentKind="news" />;
}
