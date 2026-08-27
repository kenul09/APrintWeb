import { useEffect, useState } from "react";
import styles from "../styles/adminProducts.module.css";
import { productService } from "../lib/productService";
import { useToast } from "../lib/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

const EMPTY_FORM = { name: "", price: "", category: "Çap", description: "", image: "" };

export default function AdminProducts() {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const load = () => {
    setLoading(true);
    setError("");
    productService
      .getAll({ search })
      .then(setProducts)
      .catch(() => setError("Serverlə əlaqə qurmaq mümkün olmadı."))
      .finally(() => setLoading(false));
  };

  useEffect(load, [search]);

  const openNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price || "",
      category: product.category,
      description: product.description || "",
      image: product.image || "",
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const saveProduct = async () => {
    if (!form.name.trim()) {
      setFormError("Məhsul adı tələb olunur");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      if (editingId) {
        await productService.update(editingId, form);
        toast.success("Məhsul yeniləndi.");
      } else {
        await productService.create(form);
        toast.success("Məhsul uğurla əlavə edildi.");
      }
      closeForm();
      load();
    } catch (err) {
      setFormError(err.message || "Əməliyyat zamanı xəta baş verdi.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id) => {
    const product = products.find((p) => p.id === id);
    const previous = products;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
    try {
      await productService.update(id, { isActive: !product.isActive });
      toast.success("Status yeniləndi.");
    } catch (err) {
      setProducts(previous);
      toast.error(err.message || "Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    setPendingDelete(null);
    try {
      await productService.remove(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Məhsul silindi.");
    } catch (err) {
      toast.error(err.message || "Əməliyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Məhsullar</h1>
          <p className={styles.subtitle}>Cəmi {products.length} məhsul</p>
        </div>

        <button className={styles.primaryButton} onClick={showForm ? closeForm : openNew}>
          {showForm ? "Ləğv et" : "+ Yeni məhsul"}
        </button>
      </div>

      {showForm && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{editingId ? "Məhsulu redaktə et" : "Yeni məhsul əlavə et"}</h3>

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Məhsul adı"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className={styles.input}
              placeholder="Qiymət"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <select
              className={styles.input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Çap">Çap</option>
              <option value="Reklam">Reklam</option>
            </select>

            <input
              className={styles.input}
              placeholder="Şəkil URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <input
              className={styles.input}
              placeholder="Təsvir"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {formError && <p className={styles.error}>{formError}</p>}

          <div className={styles.formActions}>
            <button className={styles.primaryButton} onClick={saveProduct} disabled={saving}>
              {saving ? "Saxlanılır..." : editingId ? "Yadda saxla" : "Əlavə et"}
            </button>

            <button className={styles.secondaryButton} onClick={closeForm}>
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Məhsul adı və ya kateqoriya üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.stateBox}>Yüklənir...</div>
        ) : error ? (
          <div className={styles.errorBox}>{error}</div>
        ) : products.length === 0 ? (
          <div className={styles.stateBox}>Məhsul yoxdur</div>
        ) : (
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

                  <td className={styles.price}>{product.price || "—"}</td>

                  <td>
                    <span className={product.isActive ? styles.active : styles.inactive}>
                      {product.isActive ? "Aktiv" : "Deaktiv"}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <button className={styles.secondaryButton} onClick={() => openEdit(product)}>
                        Redaktə et
                      </button>

                      <button className={styles.warningButton} onClick={() => toggleActive(product.id)}>
                        Status
                      </button>

                      <button className={styles.dangerButton} onClick={() => setPendingDelete(product.id)}>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Bu məhsulu silmək istədiyinizə əminsiniz?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
