"use client";

import PublicCard from "@/app/components/box/PublicCard";
import { useFetchSubmissions } from "@/app/hooks/useFetchSubmissions";
import styles from "./page.module.css";

export default function PublicBoxPage({ params }) {
  const { box, submissions, loading, error } = useFetchSubmissions(params);

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.box__container}>
          <p className={`${styles.message__p} ${styles.loading__dots}`}>Loading</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.box__container}>
          <p className={styles.message__p}>
            Error:
            {" "}
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!box) {
    return (
      <main className={styles.main}>
        <div className={styles.box__container}>
          <p className={styles.message__p}>Box not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.box__container}>
        <h1 className={styles.title}>{box.name}</h1>
        <p className={styles.description}>{box.description}</p>

        {submissions.length > 0
          ? (
              <div className={styles.submissions}>
                <h2>Submissions</h2>
                <ul>
                  {submissions.map(submission => (
                    <PublicCard
                      className={styles.submission}
                      key={submission.id}
                      submission={submission}
                    />
                  ))}
                </ul>
              </div>
            )
          : (
              <div className={styles.no__submissions}>
                <p className={styles.message__p}>No submissions found for this box.</p>
              </div>
            )}
      </div>
    </main>
  );
}
