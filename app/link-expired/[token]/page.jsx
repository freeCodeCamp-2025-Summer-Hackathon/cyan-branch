import Link from "next/link";
import styles from "./page.module.css";

export default function LinkExpiredPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.icon__container}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className={styles.title}>Link Expired</h1>
        <p className={styles.description}>
          This submission link has expired or has been disabled.
        </p>

        <p className={styles.description}>
          The link you're trying to access is no longer valid. Please contact the administrator for a new link.
        </p>

        <Link href="/" className={styles.button}>
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
