import Link from "next/link";
import styles from "./page.module.css";

export default function LinkNotFoundPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.icon__container}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className={styles.title}>Link Not Found</h1>
        <p className={styles.description}>
          The submission link you're looking for doesn't exist.
        </p>
        <p className={styles.message}>
          The link may have been deleted or you may have entered an incorrect URL.
        </p>
        <Link href="/" className={styles.button}>
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
