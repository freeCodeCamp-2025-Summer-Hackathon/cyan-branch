import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export default function HeaderDropdown() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSignOut = () => {
    setDropdownOpen(false);
    signOut("google", { callbackUrl: "/" });
  };

  return (
    <>
      {status === "authenticated"
        ? (
            <div className={styles.dropdown__container} ref={dropdownRef}>
              <button
                type="button"
                className={styles.dropdown__btn}
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {session?.user?.image
                  ? (
                      <Image
                        className={styles.profile__image}
                        src={session.user.image}
                        alt="User Google profile image"
                        width={32}
                        height={32}
                      />
                    )
                  : (
                      <Image
                        src="/images/header-dropdown/user-icon.svg"
                        alt="User Icon"
                        width={32}
                        height={32}
                      />
                    )}
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <ul className={styles.dropdown__list}>
                    <li>
                      <Link className={styles.dropdown__item} href="/dashboard">
                        Admin Dashboard
                      </Link>
                    </li>
                    <hr className={styles.dropdown__divider} />
                    <li>
                      <button
                        type="button"
                        className={styles.dropdown__item}
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )
        : (
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={styles.signIn__btn}
            >
              Sign in
            </button>
          )}
    </>
  );
}
