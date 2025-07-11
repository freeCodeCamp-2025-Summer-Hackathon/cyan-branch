'use client';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { createBox } from '@/lib/createBox';
import styles from './CreateBoxForm.module.css';

export default function CreateBoxForm() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/dashboard' });
    }
  }, [status]);

  if (status === 'authenticated') {
    return (
      <div className={styles.create__box__container}>
        <h2>Create New Box</h2>
        <form action={createBox} className={styles.create__box__form}>
          <div className={styles.input__group}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Team Feedback"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.input__group}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="e.g. A place for submitting anonymous suggestions"
              rows={3}
              className={styles.textarea}
            ></textarea>
          </div>

          <button type="submit" className={styles.button}>
            Create Box
          </button>
        </form>
      </div>
    );
  }

  // Fallback
  return null;
}
