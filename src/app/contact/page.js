import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzContactPage from "@/components/sections/itanz/ItanzContactPage";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: "Contact iTANZ | Book a Consultation or Product Demo",
	description:
		"Contact iTANZ to book a consultation, request a product demo, reach regional offices or send investor enquiries.",
	path: "/contact",
	image: "/images/company/global-presence-hero.webp",
});

export default function Contact() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzContactPage />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
