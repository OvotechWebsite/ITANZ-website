import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ItanzCareersPage from "@/components/sections/itanz/ItanzCareersPage";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getPublishedCareers from "@/libs/getPublishedCareers";
import { buildMetadata } from "@/libs/seo";

export const metadata = buildMetadata({
	title: "Careers at iTANZ | Technology, Platform and Transformation Roles",
	description:
		"Explore careers at iTANZ across Oracle, NetSuite, Salesforce, integration, analytics, AI, project delivery and managed services.",
	path: "/careers",
	image: "/images/careers/hero-image.webp",
});

export const dynamic = "force-dynamic";

export default async function Careers() {
	const roles = await getPublishedCareers();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ItanzCareersPage roles={roles} />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
