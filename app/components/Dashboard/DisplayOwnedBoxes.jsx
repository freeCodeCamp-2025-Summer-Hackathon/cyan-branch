'use client';

import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

export default function DisplayOwnedBoxes({ session }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    async function fetchBoxes() {
      const res = await fetch(`/api/boxes`);
      const data = await res.json();
      setBoxes(data);
    }

    if (session?.user?.id) {
      fetchBoxes();
    }
  }, [session?.user?.id]);

  return (
    <div className={styles.display__boxes__container}>
      <h2>Your Boxes</h2>
      {boxes.map((box) => (
        <p key={box.id}>{box.name}</p>
      ))}
    </div>
  );
}
