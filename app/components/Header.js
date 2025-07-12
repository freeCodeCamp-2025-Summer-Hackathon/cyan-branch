"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import styles from "../styles/Header.module.css";

function Header() {
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <h1 className={styles.header__logoImage}>VoiceBox</h1>
        </Link>
      </div>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__navigation__list}>
          <li className={styles.header__navigation__listItem}>
            <Link href="#" className={styles.header__navigation__listItem__link}>
              submit
            </Link>
          </li>
          <li className={styles.header__navigation__listItem}>
            {/* <Link onClick={() => signIn('google')} className={styles.header__navigation__listItem__link}>
              admin
            </Link> */}
            {/* Updated Admin signIn button */}
            {status === "authenticated"
              ? (
                  <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className={styles.header__navigation__listItem__btn}>
                    sign out
                  </button>
                )
              : (
                  <button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className={styles.header__navigation__listItem__btn}>
                    admin
                  </button>
                )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
