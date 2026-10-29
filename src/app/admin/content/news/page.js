import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "News | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewsPage() {
	return <ItanzAdminDashboard section="content" contentKind="news" />;
}
