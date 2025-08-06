import styles from "./publicCard.module.css";

export default function PublicCard({ submission }) {
  return (
    <li className={styles.card__container}>
      <p className={styles.submission}>{submission.message}</p>
      {submission?.response && (
        <p className={styles.response}>{submission.response}</p>
      )}
    </li>
  );
}
