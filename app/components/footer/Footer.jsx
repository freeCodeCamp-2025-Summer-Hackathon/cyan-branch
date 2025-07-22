import styles from "../../styles/footer/Footer.module.css";
import SocialsIcon from "./SocialsIcon";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__socials}>
        <SocialsIcon iconName="github" link="https://github.com/freecodecamp" />
        <SocialsIcon iconName="linkedin" link="https://linkedin.com/freecodecamp" />
        <SocialsIcon iconName="youtube" link="https://youtube.com/freecodecamp" />
      </div>
    </footer>
  );
}

export default Footer;
