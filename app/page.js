import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import SocialIcons from "./components/footer/SocialIcons";

export default function Home() {
  return (
    <>
      <main>
        <article>
          <section className={styles.hero}>
            <div className={styles.hero__wrapper}>
              <h2 className={styles.hero__title}>Have your say</h2>
              <p className={styles.hero__body}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              <Link href="#" className={styles.hero__link}>
                submit anonymously
              </Link>
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={styles.description}>
            <h2 className={styles.desciption__title}>Describing how it works</h2>

            <div className={styles.description__content}>
              <div className={styles.description__content__header__container}>
                <p className={styles.description__content__number}>1.</p>
                <h3 className={styles.description__content__title}>Admin signup/login</h3>
              </div>
              <div className={styles.description__content__body__container}>
                <p className={styles.description__content__body}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi maiores vel rem ut quaerat id laudantium dignissimos similique earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae reiciendis deleniti alias qui quis dignissimos, tenetur blanditiis nostrum illum doloremque.</p>
                <Image className={styles.description__content__image} src="/images/pexels-buro-millennial-636760-1438081.jpg" alt="" width="300" height="200" />
              </div>
            </div>

            <div className={styles.description__content}>
              <div className={styles.description__content__header__container}>
                <p className={styles.description__content__number}>2.</p>
                <h3 className={styles.description__content__title}>Create suggestion box (name, description, etc)</h3>
              </div>
              <div className={[styles.description__content__body__container, styles.rtl].join(" ")}>
                <p className={styles.description__content__body}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi maiores vel rem ut quaerat id laudantium dignissimos similique earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <Image className={styles.description__content__image} src="/images/pexels-dvaughnbell-2068664.jpg" alt="" width="300" height="200" />
              </div>
            </div>

            <div className={styles.description__content}>
              <div className={styles.description__content__header__container}>
                <p className={styles.description__content__number}>3.</p>
                <h3 className={styles.description__content__title}>Generate shareable URL for submissions</h3>
              </div>
              <div className={styles.description__content__body__container}>
                <p className={styles.description__content__body}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi maiores vel rem ut quaerat id laudantium dignissimos similique earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae reiciendis deleniti alias qui quis dignissimos, tenetur blanditiis nostrum illum doloremque.</p>
                <Image className={styles.description__content__image} src="/images/pexels-pixabay-327533.jpg" alt="" width="300" height="200" />
              </div>
            </div>

            <div className={styles.description__content}>
              <div className={styles.description__content__header__container}>
                <p className={styles.description__content__number}>4.</p>
                <h3 className={styles.description__content__title}>View all owned boxes</h3>
              </div>
              <div className={[styles.description__content__body__container, styles.rtl].join(" ")}>
                <p className={styles.description__content__body}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi maiores vel rem ut quaerat id laudantium dignissimos similique earum.</p>
                <Image className={styles.description__content__image} src="/images/pexels-pixabay-327533.jpg" alt="" width="300" height="200" />
              </div>
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={styles.uses}>
            <div className={styles.uses_container}>
              <h3 className={styles.uses__title}>For your company</h3>
              <Image className={styles.uses__image} src="/images/pexels-fauxels-3184416.jpg" alt="" width="300" height="200" />
            </div>

            <div className={styles.uses_container}>
              <h3 className={styles.uses__title}>For your school</h3>
              <Image className={styles.uses__image} src="/images/pexels-olly-789822.jpg" alt="" width="300" height="200" />
            </div>

            <div className={styles.uses_container}>
              <h3 className={styles.uses__title}>For your community</h3>
              <Image className={styles.uses__image} src="/images/pexels-helenalopes-933964.jpg" alt="" width="300" height="200" />
            </div>
          </section>
        </article>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer__socials}>
          <i className={styles.footer__socials__icon}>
            <SocialIcons iconName={"linkedin"} link={"https://linkedin.com"} />
          </i>
          <i className={styles.footer__socials__icon}>
            <SocialIcons iconName={"github"} link={"https://github.com"} />
          </i>
          <i className={styles.footer__socials__icon}>
            <SocialIcons iconName={"discord"} link={"https://discord.com"} />
          </i>
        </div>
      </footer>
    </>
  );
}
