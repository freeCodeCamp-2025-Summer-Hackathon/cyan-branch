"use client";

import useFetchBox from "@/app/_utils/useFetchBox";
import useFetchSubmissions from "@/app/_utils/useFetchSubmissions";
import styles from "./page.module.css";

export default function PublicDashboard({ status, boxId }) {
  const { box, loading: boxLoading, error: boxError } = useFetchBox(status, boxId);
  const { submissions, loading: subsLoading, error: subsError } = useFetchSubmissions(status, boxId);

  if (boxLoading || subsLoading || status === "loading") {
    return (
      <div className={styles.display__boxes__container}>
        <p className={styles.message__p}>Loading box and submissions...</p>
      </div>
    );
  };

  if (boxError) {
    return (
      <div className={styles.display__boxes__container}>
        <p className={styles.message__p}>
          Error loading box:
          {boxError}
        </p>
      </div>
    );
  };

  if (subsError) {
    return (
      <div className={styles.display__boxes__container}>
        <p className={styles.message__p}>
          Error loading submissions:
          {subsError}
        </p>
      </div>
    );
  };

  if (!box) {
    return (
      <div className={styles.display__boxes__container}>
        <h2>{box.name}</h2>
        <p className={styles.message__p}>This box doesn't exist.</p>
      </div>
    );
  };

  if (!submissions) {
    return (
      <div className={styles.display__boxes__container}>
        <h2>{box.name}</h2>
        <p className={styles.message__p}>This box doesn't have any submissions yet.</p>
      </div>
    );
  };

  return (
    <div className={styles.card__text__container}>
      <h2 className={styles.card__text}>{box.name}</h2>
      <p className={styles.card__text}>{box.description}</p>
    </div>
  );
};
