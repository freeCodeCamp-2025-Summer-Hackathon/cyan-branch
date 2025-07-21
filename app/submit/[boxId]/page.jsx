import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export default async function SubmitPage({ params }) {
  const { boxId } = await params;

  const box = await prisma.box.findUnique({
    where: { id: boxId },
  });

  if (!box) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.form__container}>
        <h1 className={styles.title}>
          {box.name}
        </h1>
        <form className={styles.form} method="POST" action="/api/submissions">
          <input type="hidden" name="boxId" value={boxId} />
          <textarea className={styles.textarea} name="message" placeholder="Your feedback..." required />
          <button className={styles.button} type="submit">Submit Anonymously</button>
        </form>
      </div>
    </main>
  );
}
