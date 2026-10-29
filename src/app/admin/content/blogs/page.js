import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Blogs | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
	return <ItanzAdminDashboard section="content" contentKind="blogs" />;
}
