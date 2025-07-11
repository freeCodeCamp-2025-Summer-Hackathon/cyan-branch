import styles from "../../styles/footer/Footer.module.css";
import SocialsIcon from "./SocialsIcon";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__socials}>
        <SocialsIcon />
        <SocialsIcon />
        <SocialsIcon />
        <SocialsIcon />
      </div>
    </footer>
  )
}

export default Footer
