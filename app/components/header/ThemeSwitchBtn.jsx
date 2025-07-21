"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitchBtn.module.css";

export default function ThemeSwitchBtn({ resolvedTheme, setTheme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function mount() {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setMounted(true);
    }

    mount();
  }, []);

  if (!mounted)
    return null;

  return (
    <li className={styles.theme__listItem}>
      <div className={styles.theme__container}>
        <div
          className={styles.theme__slider}
          style={{
            transform: resolvedTheme === "light"
              ? "translateX(0)"
              : "translateX(100%)",
          }}
        >
          <button
            className={styles.theme__clicker}
            type="button"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          />
        </div>
      </div>
    </li>
  );
}
