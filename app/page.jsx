import styles from "./page.module.css";
import HeroSection from "./components/homepage/HeroSection";
import DescSection from "./components/homepage/DescSection/DescSection";
import UsesSection from "./components/homepage/UsesSection/UsesSection";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>
      <main>
        <article>
          <HeroSection />
          <hr className={styles.divider} />
          <DescSection />
          <hr className={styles.divider} />
          <UsesSection />
        </article>
      </main>
      <Footer />
    </>
  );
}
