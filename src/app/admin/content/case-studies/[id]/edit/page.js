import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Edit Case Study | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default async function AdminEditCaseStudyPage({ params }) {
	const { id } = await params;
	return <ItanzAdminDashboard section="content" action="edit" contentKind="case-studies" recordId={id} />;
}
