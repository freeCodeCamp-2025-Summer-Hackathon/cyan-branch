import Footer from "./components/footer/Footer";
import DescSection from "./components/homepage/DescSection/DescSection";
import HeroSection from "./components/homepage/HeroSection";
import UsesSection from "./components/homepage/UsesSection/UsesSection";
import styles from "./page.module.css";

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
