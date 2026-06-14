import { useState } from "react";
import styles from "../styles/adminProducts.module.css";

const initial = [
  { id: 1, title: "Flayer", price: "15₼", icon: "🗞️", category: "Çap", active: true },
  { id: 2, title: "Banner", price: "45₼", icon: "🎌", category: "Reklam", active: true },
  { id: 3, title: "Roll-up", price: "89₼", icon: "📜", category: "Reklam", active: true },
  { id: 4, title: "Vizit kart", price: "25₼", icon: "💳", category: "Çap", active: true },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    icon: "🖨️",
    category: "Çap",
  });

  const addProduct = () => {
    if (!form.title || !form.price) return;

    setProducts([
      ...products,
      {
        ...form,
        id: Date.now(),
        active: true,
      },
    ]);

    setForm({
      title: "",
      price: "",
      icon: "🖨️",
      category: "Çap",
    });

    setShowForm(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleActive = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Məhsullar</h1>
          <p className={styles.subtitle}>
            Cəmi {products.length} məhsul
          </p>
        </div>

        <button
          className={styles.primaryButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Ləğv et" : "+ Yeni məhsul"}
        </button>
      </div>

      {showForm && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            Yeni məhsul əlavə et
          </h3>

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Məhsul adı"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <input
              className={styles.input}
              placeholder="Qiymət"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            <input
              className={styles.input}
              placeholder="İkon"
              value={form.icon}
              onChange={(e) =>
                setForm({
                  ...form,
                  icon: e.target.value,
                })
              }
            />

            <select
              className={styles.input}
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option value="Çap">Çap</option>
              <option value="Reklam">Reklam</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button
              className={styles.primaryButton}
              onClick={addProduct}
            >
              Əlavə et
            </button>

            <button
              className={styles.secondaryButton}
              onClick={() => setShowForm(false)}
            >
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Məhsul</th>
              <th>Kateqoriya</th>
              <th>Qiymət</th>
              <th>Status</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productInfo}>
                    <div className={styles.productIcon}>
                      {product.icon}
                    </div>

                    <span>{product.title}</span>
                  </div>
                </td>

                <td>{product.category}</td>

                <td className={styles.price}>
                  {product.price}
                </td>

                <td>
                  <span
                    className={
                      product.active
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    {product.active
                      ? "Aktiv"
                      : "Deaktiv"}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.warningButton}
                      onClick={() =>
                        toggleActive(product.id)
                      }
                    >
                      Status
                    </button>

                    <button
                      className={styles.dangerButton}
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}