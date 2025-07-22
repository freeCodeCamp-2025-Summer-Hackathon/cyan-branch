import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import styles from "../../styles/footer/SocialsIcon.module.css";

function SocialsIcon({ iconName, link }) {
  if (iconName === "facebook") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaFacebook />
      </Link>
    );
  }
  else if (iconName === "instagram") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaInstagram />
      </Link>
    );
  }
  else if (iconName === "youtube") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaYoutube />
      </Link>
    );
  }
  else if (iconName === "twitter") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaXTwitter />
      </Link>
    );
  }
  else if (iconName === "tiktok") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaTiktok />
      </Link>
    );
  }
  else if (iconName === "discord") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaDiscord />
      </Link>
    );
  }
  else if (iconName === "linkedin") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaLinkedin />
      </Link>
    );
  }
  else if (iconName === "github") {
    return (
      <Link href={link} className={styles.socials__icon}>
        <FaGithub />
      </Link>
    );
  }
};

export default SocialsIcon;
