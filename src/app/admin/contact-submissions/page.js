import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Contact Submissions | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminContactSubmissionsPage() {
	return <ItanzAdminDashboard section="contact" />;
}
