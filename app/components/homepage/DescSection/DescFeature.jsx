import Image from "next/image";
import styles from "../../../styles/homepage/DescSection/DescFeature.module.css";

function DescFeature({ num, featName, featDesc, imgSrc, altText, rtl }) {
  /**
   * num: number
   * featName: string
   * featDesc: string
   * imgSrc: string, in actuality an image URL
   * altText: string
   * rtl: boolean
   */

  return (
    <div className={styles.description__content}>
      <div className={
        rtl ? styles.description__content__header__container__rtl : styles.description__content__header__container
      }
      >
        <p className={styles.description__content__number}>
          {[num.toString(), "."].join("")}
        </p>
        <h3 className={styles.description__content__title}>
          {featName}
        </h3>
      </div>
      <div
        className={[
          styles.description__content__body__container,
          rtl ? styles.rtl : "",
        ].join(" ")}
      >
        <p className={styles.description__content__body}>
          {featDesc}
        </p>
        <Image
          className={styles.description__content__image}
          src={imgSrc}
          alt={altText}
          width="300"
          height="200"
        />
      </div>
    </div>
  );
}

export default DescFeature;
