"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function BoxPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [box, setBox] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const { boxId } = await params;

        const boxRes = await fetch(`/api/boxes/${boxId}`);
        if (!boxRes.ok) {
          if (boxRes.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }
        const boxData = await boxRes.json();
        setBox(boxData);

        if (session?.user?.id) {
          const submissionsRes = await fetch(`/api/submissions/${boxId}`);
          if (submissionsRes.ok) {
            const submissionsData = await submissionsRes.json();
            setSubmissions(submissionsData);
          }
        }
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    if (status !== "loading")
      fetchData();
  }, [params, session?.user?.id, status, router]);

  if (loading || status === "loading") {
    return (
      <main className={styles.main}>
        <div className={styles.box__container}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.box__container}>
          <p>
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
          <p>Box not found</p>
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
                {submissions.map(submission => (
                  <div key={submission.id} className={styles.submission}>
                    <p>{submission.message}</p>
                  </div>
                ))}
              </div>
            )
          : (
              session?.user?.id && (
                <div className={styles.noSubmissions}>
                  <p>No submissions found for this box.</p>
                </div>
              )
            )}
      </div>
    </main>
  );
}
