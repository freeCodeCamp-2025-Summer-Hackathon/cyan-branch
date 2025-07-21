import styles from "./submission.module.css";

export default function SubmissionCard({ message }) {
  return (
    <li className={styles.card__container}>
      <div className={styles.card__content}>
        <p className={styles.message}>{message}</p>
        <button className={styles.respond__button} type="button">Respond</button>
      </div>
      <form className={styles.response__form} action="">
        <textarea className={styles.textarea} name="response"></textarea>
      </form>
    </li>
  );
}
