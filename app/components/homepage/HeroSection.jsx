"use client";

import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import styles from "../../styles/homepage/HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__wrapper}>
        <h2 className={styles.hero__title}>Have your say</h2>
        <p className={styles.hero__body}>
          Get started by signing in with Google to create and manage anonymous suggestion boxes.
        </p>
        <GoogleButton className={styles.google__button} type="dark" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} />
      </div>
    </section>
  );
}

export default HeroSection;
