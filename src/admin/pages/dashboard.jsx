import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>
          Xoş gəldiniz, Admin! Bugünkü statistika.
        </p>
      </div>
    </div>
  );
}