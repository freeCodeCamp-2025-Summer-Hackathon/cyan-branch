<<<<<<< HEAD
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import CreateBoxForm from '../components/dashboard/CreateBoxForm';
import DisplayOwnedBoxes from '../components/dashboard/DisplayOwnedBoxes';
=======
"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
>>>>>>> main

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
<<<<<<< HEAD
    if (status === 'unauthenticated') {
      // Redirect unauthenticated users to homepage, should probably redirect to a
      // login/signup page in the future
      router.push('/');
=======
    if (status === "unauthenticated") {
      // Prevent unregistered users from accessing admin dashboard
      signIn("google", { callbackUrl: "/dashboard" });
>>>>>>> main
    }
  }, [status, router]);

<<<<<<< HEAD
  if (status === 'loading') {
    return (
      <p className={`${styles.loading__p} ${styles.loading__dots}`}>Loading</p>
    );
=======
  if (status === "loading") {
    return <p>Loading...</p>;
>>>>>>> main
  }

  if (status === "authenticated") {
    return (
<<<<<<< HEAD
      <main className={styles.main}>
        <h1 className={styles.title}>Hi, {session?.user?.name ?? 'Guest'}.</h1>
        <div className={styles.content__container}>
          <CreateBoxForm />
          <DisplayOwnedBoxes session={session} />
        </div>
=======
      <main>
        <h1>Admin Dashboard</h1>
        <h2>
          Welcome
          {session?.user?.name ?? "Unknown User"}
        </h2>
>>>>>>> main
      </main>
    );
  }

<<<<<<< HEAD
=======
  // Fallback, can probably be improved to something in the future
>>>>>>> main
  return null;
}
