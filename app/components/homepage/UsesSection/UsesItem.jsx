import styles from "../../../styles/homepage/UsesSection/UsesItem.module.css";
import Image from "next/image";

const UsesItem = (props) => {
  return (
    <div className={styles.uses_container}>
      <h3 className={styles.uses__title}>{props.labelText}</h3>
      <Image
        className={styles.uses__image}
        src={props.imgSrc}
        alt=""
        width="300"
        height="200"
      />
    </div>
  )
}

export default UsesItem
