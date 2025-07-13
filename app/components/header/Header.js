'use client';
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderDropdown from "./HeaderDropdown";

const Header = () => {

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
            <HeaderDropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
