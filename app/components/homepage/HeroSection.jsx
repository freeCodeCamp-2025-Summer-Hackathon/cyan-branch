import Link from "next/link";
import styles from "../../styles/homepage/HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__wrapper}>
        <h2 className={styles.hero__title}>Have your say</h2>
        <p className={styles.hero__body}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <button href="#" className={styles.hero__link}>
          submit anonymously
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
