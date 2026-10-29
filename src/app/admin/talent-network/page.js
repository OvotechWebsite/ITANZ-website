import ItanzAdminDashboard from "@/components/sections/itanz/admin/ItanzAdminDashboard";

export const metadata = {
	title: "Talent Network | iTANZ Admin",
	robots: { index: false, follow: false },
};

export default function AdminTalentNetworkPage() {
	return <ItanzAdminDashboard section="talent" />;
}
