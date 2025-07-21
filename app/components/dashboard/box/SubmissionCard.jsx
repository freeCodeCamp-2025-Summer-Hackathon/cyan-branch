import styles from "./submission.module.css";

export default function SubmissionCard({ submission, toggleDropdown, dropdownOpenId }) {
  return (
    <li className={styles.card__container}>
      <div className={styles.card__content}>
        <p className={styles.message}>{submission.message}</p>
        <button className={styles.button} type="button" onClick={() => toggleDropdown(submission.id)}>Respond</button>
      </div>
      {submission.id === dropdownOpenId && (
        <form className={styles.response__form} action="">
          <textarea
            className={styles.textarea}
            name="response"
            id="response"
            placeholder="Your response to the suggestion above"
            rows={3}
          >
          </textarea>
          <button type="submit" className={styles.button}>
            Add Response
          </button>
        </form>
      )}
    </li>
  );
}
