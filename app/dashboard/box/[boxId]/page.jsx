"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import SubmissionCard from "@/app/components/dashboard/box/SubmissionCard";
import LinkManager from "@/app/components/dashboard/LinkManager";
import { useFetchBox } from "@/app/hooks/useFetchBox";
import styles from "./page.module.css";

export default function BoxPage({ params }) {
  const { data: session, status } = useSession();
  const { box, submissions, links, loading, error } = useFetchBox(params, session, status);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  // Used to toggle view response text area on submission card component (SubmissionCard.jsx)
  function toggleDropdown(id) {
    setDropdownOpenId((prevId) => {
      const newId = prevId === id ? null : id;
      return newId;
    });
  }

  if (loading || status === "loading") {
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
      <Link className={styles.dashboard__link} href="/dashboard">Back to dashboard</Link>
      <div className={styles.box__container}>
        <h1 className={styles.title}>{box.name}</h1>
        <p className={styles.description}>{box.description}</p>
        <Link className={styles.dashboard__link} href={`/box/${box.id}`}>Go to Public Response Page</Link>

        {/* Link Management Section */}
        {session?.user?.id && (
          <LinkManager boxId={box.id} links={links} />
        )}

        {/* Submissions Section */}
        {submissions.length > 0
          ? (
              <div className={styles.submissions}>
                <h2>Submissions</h2>
                <ul className={styles.submissions__list}>
                  {submissions.map(submission => (
                    <SubmissionCard
                      className={styles.submission}
                      key={submission.id}
                      submission={submission}
                      toggleDropdown={toggleDropdown}
                      dropdownOpenId={dropdownOpenId}
                    />
                  ))}
                </ul>
              </div>
            )
          : (
              session?.user?.id && (
                <div className={styles.no__submissions}>
                  <p className={styles.message__p}>No submissions found for this box.</p>
                </div>
              )
            )}
      </div>
    </main>
  );
}
