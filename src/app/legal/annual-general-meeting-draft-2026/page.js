import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { buildMetadata } from "@/libs/seo";
import styles from "./page.module.scss";

export const metadata = {
	...buildMetadata({
		title: "Annual General Meeting Draft 2026 | iTANZ Investor Relations",
		description: "The iTANZ Annual General Meeting Draft 2026 is not yet available.",
		path: "/legal/annual-general-meeting-draft-2026",
		image: "/images/investor-relations/investor-relations-hero.webp",
	}),
};

export default function AnnualGeneralMeetingDraft2026HoldingPage() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title="Annual General Meeting Draft 2026"
							text="Annual General Meeting Draft 2026"
							breadcrums={[{ name: "Investor Relations", path: "/investor-relations" }]}
							backgroundImage="/images/investor-relations/investor-relations-hero.webp"
						/>
						<section className={`itanz-legal-document-section section-gap ${styles.holdingSection}`}>
							<div className="container">
								<div className={styles.holdingContent}>
									<p className={styles.eyebrow}>Investor Relations</p>
									<h2>This document is not yet available.</h2>
									<p>Please check back after its official release.</p>
								</div>
							</div>
						</section>
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
