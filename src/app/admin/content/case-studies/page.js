import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Case Studies | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminCaseStudiesPage() {
	return <ItanzAdminDashboard section="content" contentKind="case-studies" />;
}
