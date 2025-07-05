import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1 className={styles.header__logoImage}>VoiceBox</h1>
      </div>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__navigation__list}>
          <li className={styles.header__navigation__listItem}>
            <Link href="#" className={styles.header__navigation__listItem__link}>
              submit
            </Link>
          </li>
          <li className={styles.header__navigation__listItem}>
            <Link href="#" className={styles.header__navigation__listItem__link}>
              admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
