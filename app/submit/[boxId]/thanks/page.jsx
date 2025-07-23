import styles from "../page.module.css";

export default function ThanksPage() {
  return (
    <main className={styles.main}>
      <div className={styles.form__container}>
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.message__p}>Your feedback has been submitted successfully.</p>
      </div>
    </main>
  );
}
