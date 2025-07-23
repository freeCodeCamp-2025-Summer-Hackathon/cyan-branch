import Link from "next/link";
import { createElement } from "react";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "../../styles/footer/SocialsIcon.module.css";

const iconNameMap = {
  discord: FaDiscord,
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

function SocialsIcon({ iconName }) {
  const icon = iconNameMap[iconName];
  return (
    <Link href={`https://${iconName}.com/freeCodeCamp`} className={styles.socials__icon}>
      {createElement(icon)}
    </Link>
  );
};

export default SocialsIcon;
