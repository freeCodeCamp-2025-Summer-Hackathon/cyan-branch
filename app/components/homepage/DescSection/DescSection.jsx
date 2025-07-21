import styles from "../../../styles/homepage/DescSection/DescSection.module.css";
import DescFeature from "./DescFeature";
import items from "./DescItems.js";

function DescSection() {
  return (
    <section className={styles.description}>
      <h2 className={styles.description__title}>Describing how it works</h2>

      {items.map((item, i) => (
        <DescFeature
          key={`${i + 1}_${item.featName.slice(0, 5)}_${item.featName.slice(-1, -6)}`}
          num={i + 1}
          featName={item.featName}
          featDesc={item.featDesc}
          imgSrc={item.imgSrc}
          altText={item.altText}
          rtl={i % 2 === 1}
        />
      ))}
    </section>
  );
}

export default DescSection;
