import styles from './dashboard.module.css';

// Used in DisplayOwnedBoxes.jsx to map user boxes in DB to displayed cards
export default function BoxCard({ name, description }) {
  return(
    <div className={styles.card__container}>
      <h3 className={styles.card__text}>{name}</h3>
      <p className={styles.card__text}>{description}</p>
    </div>
  )
}
