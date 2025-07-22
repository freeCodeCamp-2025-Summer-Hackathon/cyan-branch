import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6';

function SocialIcon ({ iconName, link }){
  if (iconName === "facebook") {
    return (
      <Link href={link}>
        <FaFacebook />
      </Link>
    );
  } 
  else if (iconName === "instagram") {
    return (
      <Link href={link}>
        <FaInstagram />
      </Link>
    );
  } else if (iconName === "youtube") {
    return (
      <Link href={link}>
        <FaYoutube />
      </Link>
    );
  } 
  else if (iconName === "twitter") {
    return (
      <Link href={link}>
        <FaXTwitter />
      </Link>
    );
  } 
  else if (iconName === "tiktok") {
    return (
      <Link href={link}>
        <FaTiktok />
      </Link>
    );
  } 
  else if (iconName === "discord") {
    return (
      <Link href={link}>
        <FaDiscord />
      </Link>
    );
  } 
  else if (iconName === "linkedin") {
    return (
      <Link href={link}>
        <FaLinkedin />
      </Link>
    );
  } 
  else if (iconName === "github") {
    return (
      <Link href={link}>
        <FaGithub />
      </Link>
    );
  }
};

export default SocialIcon;
