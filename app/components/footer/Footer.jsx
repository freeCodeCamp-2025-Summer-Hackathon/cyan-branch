import styles from "../../styles/footer/Footer.module.css";
import SocialsIcon from "./SocialsIcon";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__socials}>
        <SocialsIcon iconName="github" />
        <SocialsIcon iconName="linkedin" />
        <SocialsIcon iconName="youtube" />
      </div>
    </footer>
  );
}

export default Footer;
