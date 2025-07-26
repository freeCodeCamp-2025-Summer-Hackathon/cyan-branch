import styles from "./publicCard.module.css";

export default function PublicCard({ submission }) {
  return (
    <li className={styles.card__container}>
      <h3>{submission.message}</h3>
      <p className={styles.response}>
        {submission?.response ? submission.response : "No response yet"}
      </p>
    </li>
  );
}
