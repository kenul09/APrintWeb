import { useEffect, useState } from "react";
import styles from "../styles/adminPortfolio.module.css";
import { portfolioService } from "../lib/portfolioService";

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", category: "", image: "" });

  useEffect(() => {
    portfolioService
      .getAll()
      .then(setItems)
      .catch(() => {});
  }, []);

  const addItem = async () => {
    if (!form.title || !form.category || !form.image) return;

    setError("");
    try {
      const item = await portfolioService.create(form);
      setItems([item, ...items]);
      setForm({ title: "", category: "", image: "" });
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Əlavə edilə bilmədi");
    }
  };

  const deleteItem = async (id) => {
    try {
      await portfolioService.remove(id);
      setItems(items.filter((i) => i.id !== id));
    } catch {
      // ignore
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Portfolio</h1>
          <p className={styles.subtitle}>Cəmi {items.length} iş</p>
        </div>

        <button className={styles.primaryButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Ləğv et" : "+ Yeni iş"}
        </button>
      </div>

      {showForm && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Yeni portfolio işi əlavə et</h3>

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Başlıq"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Kateqoriya"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Şəkil URL (https://...)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <button className={styles.primaryButton} onClick={addItem}>
              Əlavə et
            </button>
            <button className={styles.secondaryButton} onClick={() => setShowForm(false)}>
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.workCard}>
            <img
              className={styles.workImage}
              src={item.image}
              alt={item.title}
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
            <div className={styles.workBody}>
              <div className={styles.workTitle}>{item.title}</div>
              <div className={styles.workCategory}>{item.category}</div>
              <div className={styles.workActions}>
                <button className={styles.dangerButton} onClick={() => deleteItem(item.id)}>
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
