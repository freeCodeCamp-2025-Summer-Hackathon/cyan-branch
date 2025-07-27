"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderDropdown from "./HeaderDropdown";
import ThemeSwitchBtn from "./ThemeSwitchBtn";

function Header() {
  // Retrieve the current theme, i.e. dark vs. light mode
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <h1 className={styles.header__logoImage}>VoiceBox</h1>
        </Link>
      </div>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__navigation__list}>
          <ThemeSwitchBtn
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
          />
          <li className={styles.header__navigation__listItem}>
            <HeaderDropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
