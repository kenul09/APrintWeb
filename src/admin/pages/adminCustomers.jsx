import styles from '../styles/adminCustomers.module.css';

const customers = [
  { id: 1, name: 'Əli Həsənov',    email: 'ali@gmail.com',   orders: 5, total: '375₼', date: 'Jan 2026' },
  { id: 2, name: 'Leyla Əliyeva',  email: 'leyla@gmail.com', orders: 3, total: '270₼', date: 'Feb 2026' },
  { id: 3, name: 'Murad Quliyev',  email: 'murad@gmail.com', orders: 8, total: '640₼', date: 'Dec 2025' },
  { id: 4, name: 'Nigar Hüseynova',email: 'nigar@gmail.com', orders: 2, total: '178₼', date: 'Mar 2026' },
  { id: 5, name: 'Tural Babayev',  email: 'tural@gmail.com', orders: 6, total: '480₼', date: 'Nov 2025' },
];

const AVATAR_CLASSES = ['avatarPurple', 'avatarPink', 'avatarBlue', 'avatarGreen', 'avatarAmber'];
const HEADERS = ['Ad Soyad', 'Email', 'Sifariş sayı', 'Ümumi', 'Qeydiyyat'];

export default function AdminCustomers() {
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Müştərilər</h1>
        <p className={styles.subtitle}>Cəmi {customers.length} müştəri</p>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              {HEADERS.map(h => (
                <th key={h} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} className={styles.tr}>

                {/* Name + Avatar */}
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <div className={`${styles.avatar} ${styles[AVATAR_CLASSES[i % AVATAR_CLASSES.length]]}`}>
                      {c.name[0]}
                    </div>
                    <span className={styles.customerName}>{c.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className={`${styles.td} ${styles.tdMuted}`}>{c.email}</td>

                {/* Orders count */}
                <td className={styles.td}>
                  <span className={styles.ordersBadge}>{c.orders}</span>
                </td>

                {/* Total */}
                <td className={styles.td}>
                  <span className={styles.total}>{c.total}</span>
                </td>

                {/* Date */}
                <td className={`${styles.td} ${styles.tdDate}`}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}