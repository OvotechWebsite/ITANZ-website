import styles from "./loading.module.scss";
import Image from "next/image";

const Loading = () => (
	<div className={styles.routeLoading} role="status" aria-live="polite">
		<div className={styles.routeLoadingInner}>
			<Image
				className={styles.logo}
				src="/images/logos/logo.webp"
				alt="iTANZ"
				width={180}
				height={65}
				priority
			/>
			<span className={styles.spinner} aria-hidden="true" />
			<p className={styles.label}>Loading page...</p>
		</div>
	</div>
);

export default Loading;
