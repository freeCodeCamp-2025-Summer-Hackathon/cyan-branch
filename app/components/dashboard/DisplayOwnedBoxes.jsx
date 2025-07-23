"use client";

import { useEffect, useState } from "react";
import BoxCard from "./BoxCard";
import styles from "./dashboard.module.css";

export default function DisplayOwnedBoxes({ session, status }) {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBoxes() {
      try {
        setLoading(true);
        setError(null);

        const boxRes = await fetch(`/api/boxes`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }

        const boxData = await boxRes.json();
        setBoxes(boxData);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    if (status !== "loading") {
      fetchBoxes();
    }
  }, [session?.user?.id, status]);

  if (loading || status === "loading") {
    return (
      <div className={styles.display__boxes__container}>
        <p className={styles.message__p}>Loading boxes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.display__boxes__container}>
        <p className={styles.message__p}>
          Error loading boxes:
          {error}
        </p>
      </div>
    );
  }

  if (boxes.length === 0) {
    return (
      <div className={styles.display__boxes__container}>
        <h2>Your Boxes</h2>
        <p className={styles.message__p}>You haven't created any boxes yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.display__boxes__container}>
      <h2>Your Boxes</h2>
      {boxes.map(box => (
        <BoxCard key={box.id} name={box.name} description={box.description} boxId={box.id} linkToken={box.link[0].token} />
      ))}
    </div>
  );
}
