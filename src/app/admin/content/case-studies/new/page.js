import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Add Case Study | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminNewCaseStudyPage() {
	return <ItanzAdminDashboard section="content" action="new" contentKind="case-studies" />;
}
