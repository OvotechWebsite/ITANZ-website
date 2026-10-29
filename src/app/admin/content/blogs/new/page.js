import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Add Blog | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewBlogPage() {
	return <ItanzAdminDashboard section="content" action="new" contentKind="blogs" />;
}
