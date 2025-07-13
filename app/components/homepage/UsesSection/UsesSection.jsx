import styles from "../../../styles/homepage/UsesSection/UsesSection.module.css";
import UsesItem from "./UsesItem";

function UsesSection() {
  return (
    <section className={styles.uses}>
      <UsesItem
        labelText="For your company"
        imgSrc="/images/pexels-fauxels-3184416.jpg"
      />

      <UsesItem
        labelText="For your school"
        imgSrc="/images/pexels-olly-789822.jpg"
      />

      <UsesItem
        labelText="For your community"
        imgSrc="/images/pexels-helenalopes-933964.jpg"
      />
    </section>
  );
}

export default UsesSection;
