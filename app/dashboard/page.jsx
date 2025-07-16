"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateBoxForm from "../components/dashboard/CreateBoxForm";
import DisplayOwnedBoxes from "../components/dashboard/DisplayOwnedBoxes";
import styles from "./page.module.css";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect unauthenticated users to homepage, should probably redirect to a
      // login/signup page in the future
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <p className={`${styles.loading__p} ${styles.loading__dots}`}>Loading</p>
    );
  }

  if (status === "authenticated") {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hi,&nbsp;
          {session?.user?.name ?? "Guest"}
          .
        </h1>
        <div className={styles.content__container}>
          <CreateBoxForm />
          <DisplayOwnedBoxes session={session} status={status} />
        </div>
      </main>
    );
  }

  return null;
}
