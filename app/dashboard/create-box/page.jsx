'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function CreateBoxPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/dashboard' });
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'authenticated') {
    return (
      <main>
        <h1>Create New Box</h1>
      </main>
    );
  }

  // Fallback
  return null;
}