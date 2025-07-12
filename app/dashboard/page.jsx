'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import styles from './page.module.css';
import CreateBoxForm from '../components/dashboard/CreateBoxForm';
import DisplayOwnedBoxes from '../components/dashboard/DisplayOwnedBoxes';
import { Corben, Gentium_Book_Plus } from "next/font/google";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Prevent unregistered users from accessing admin dashboard
      signIn('google', { callbackUrl: '/dashboard' });
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Hi, {session?.user?.name ?? 'Guest'}.</h1>
        <div className={styles.content__container}>
          <CreateBoxForm />
          <DisplayOwnedBoxes session={session} />
        </div>
      </main>
    );
  }

  // Fallback, can probably be improved to something in the future
  return null;
}
