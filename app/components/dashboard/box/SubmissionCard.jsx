import { updateSubmissionAction } from "@/lib/actions";
import styles from "./submission.module.css";

export default function SubmissionCard({ submission, toggleDropdown, dropdownOpenId }) {
  const boundAction = updateSubmissionAction.bind(null, submission.id);
  return (
    <li className={styles.card__container}>
      <div className={styles.card__content}>
        <p className={styles.message}>{submission.message}</p>
        <button className={styles.button} type="button" onClick={() => toggleDropdown(submission.id)}>Respond</button>
      </div>
      {submission.id === dropdownOpenId && (
        <form action={boundAction} className={styles.response__form}>
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
