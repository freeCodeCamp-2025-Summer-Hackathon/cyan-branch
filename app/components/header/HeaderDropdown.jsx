import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import styles from './Header.module.css';

export default function HeaderDropdown() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <div>
          <Image
            // className={styles.}
            src={session?.user?.image}
            alt="User Google profile image"
            width={24}
            height={24}
          />
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={styles.header__navigation__listItem__btn}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className={styles.header__navigation__listItem__btn}
        >
          <Image
            src="/images/user-icon.svg"
            alt="User Icon"
            width={24}
            height={24}
          />
        </button>
      )}
    </>
  );
}
