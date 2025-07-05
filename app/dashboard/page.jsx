'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.name) {
      console.log('Logged in as: ', session.user.name);
    }
    console.log(session);
  }, [status, session]);

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <h2>Welcome {session?.user?.name ?? "Guest"}</h2>
    </main>
  );
}
