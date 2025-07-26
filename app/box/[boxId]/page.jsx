"use client";

import { useEffect, useState } from "react";
import PublicCard from "@/app/components/box/PublicCard";
import styles from "./page.module.css";

export default function PublicBoxPage({ params }) {
  const [box, setBox] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        setError(null);

        const { boxId } = await params;

        const boxRes = await fetch(`/api/boxes/${boxId}`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }

        const boxData = await boxRes.json();
        setBox(boxData);

        const submissionRes = await fetch(`/api/submissions/${boxId}`);
        if (!submissionRes.ok) {
          throw new Error(`Failed to fetch submissions: ${submissionRes.status}`);
        }

        const submissionData = await submissionRes.json();
        setSubmissions(submissionData);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [params]);

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
              (
                <div className={styles.no__submissions}>
                  <p className={styles.message__p}>No submissions found for this box.</p>
                </div>
              )
            )}
      </div>
    </main>
  );
}
