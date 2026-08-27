import { useEffect, useState } from "react";
import styles from "../styles/adminProducts.module.css";
import { productService } from "../lib/productService";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Çap",
  });

  useEffect(() => {
    productService
      .getAll()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const addProduct = async () => {
    if (!form.name) return;

    setError("");
    try {
      const product = await productService.create(form);
      setProducts([product, ...products]);
      setForm({ name: "", price: "", category: "Çap" });
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Məhsul əlavə edilə bilmədi");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.remove(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      // ignore — list simply won't update
    }
  };

  const toggleActive = async (id) => {
    const product = products.find((p) => p.id === id);
    try {
      const updated = await productService.update(id, { isActive: !product.isActive });
      setProducts(products.map((p) => (p.id === id ? updated : p)));
    } catch {
      // ignore
    }
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
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
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

          {error && <p className={styles.error}>{error}</p>}

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
                    <div className={styles.productIcon}>🖨️</div>

                    <span>{product.name}</span>
                  </div>
                </td>

                <td>{product.category}</td>

                <td className={styles.price}>
                  {product.price || "—"}
                </td>

                <td>
                  <span
                    className={
                      product.isActive
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    {product.isActive
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
