'use client';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { createBox } from '@/lib/createBox';

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
        <form action={createBox}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
          <button type="submit">Create box</button>
        </form>
      </main>
    );
  }

  // Fallback
  return null;
}