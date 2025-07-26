import Link from "next/link";
import { useState } from "react";
import styles from "./dashboard.module.css";

export default function BoxCard({ boxId, name, description, linkToken }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const shareableLink = `${window.location.origin}/voice-${linkToken}`;
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
    catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={styles.card__container}>
      <Link href={`/dashboard/box/${boxId}`} className={styles.card__link_area}>
        <div className={styles.card__text__container}>
          <h3 className={styles.card__text}>{name}</h3>
          <p className={styles.card__text}>{description}</p>
        </div>
      </Link>
      <button type="button" onClick={handleCopyLink} className={styles.copy__button}>
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
