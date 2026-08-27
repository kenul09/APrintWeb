import { useEffect, useState } from "react";
import styles from "../styles/adminPortfolio.module.css";
import { portfolioService } from "../lib/portfolioService";
import { useToast } from "../lib/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

const EMPTY_FORM = { title: "", category: "", image: "", description: "", isPublished: true };

export default function AdminPortfolio() {
  const toast = useToast();
  const [items, setItems] = useState([]);
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
    portfolioService
      .getAll({ search })
      .then(setItems)
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

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description || "",
      isPublished: item.isPublished,
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

  const saveItem = async () => {
    if (!form.title.trim() || !form.category.trim() || !form.image.trim()) {
      setFormError("Başlıq, kateqoriya və şəkil tələb olunur");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      if (editingId) {
        await portfolioService.update(editingId, form);
        toast.success("İş yeniləndi.");
      } else {
        await portfolioService.create(form);
        toast.success("İş uğurla əlavə edildi.");
      }
      closeForm();
      load();
    } catch (err) {
      setFormError(err.message || "Əməliyyat zamanı xəta baş verdi.");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (item) => {
    const previous = items;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, isPublished: !i.isPublished } : i)));
    try {
      await portfolioService.update(item.id, { isPublished: !item.isPublished });
      toast.success(item.isPublished ? "Gizlədildi." : "Yayımlandı.");
    } catch (err) {
      setItems(previous);
      toast.error(err.message || "Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    setPendingDelete(null);
    try {
      await portfolioService.remove(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("İş silindi.");
    } catch (err) {
      toast.error(err.message || "Əməliyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Portfolio</h1>
          <p className={styles.subtitle}>Cəmi {items.length} iş</p>
        </div>

        <button className={styles.primaryButton} onClick={showForm ? closeForm : openNew}>
          {showForm ? "Ləğv et" : "+ Yeni iş"}
        </button>
      </div>

      {showForm && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{editingId ? "İşi redaktə et" : "Yeni portfolio işi əlavə et"}</h3>

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

          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "0.85rem", opacity: 0.7 }}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Görünən (published)
          </label>

          {formError && <p className={styles.error}>{formError}</p>}

          <div className={styles.formActions}>
            <button className={styles.primaryButton} onClick={saveItem} disabled={saving}>
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
          placeholder="Başlıq və ya kateqoriya üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.stateBox}>Yüklənir...</div>
      ) : error ? (
        <div className={styles.errorBox}>{error}</div>
      ) : items.length === 0 ? (
        <div className={styles.stateBox}>Portfolio işi yoxdur</div>
      ) : (
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
                <span className={`${styles.statusChip} ${item.isPublished ? styles.statusPublished : styles.statusDraft}`}>
                  {item.isPublished ? "Görünən" : "Gizli"}
                </span>
                <div className={styles.workActions}>
                  <button className={styles.secondaryButton} onClick={() => openEdit(item)}>
                    Redaktə et
                  </button>
                  <button className={styles.warningButton} onClick={() => toggleVisibility(item)}>
                    {item.isPublished ? "Gizlət" : "Göstər"}
                  </button>
                  <button className={styles.dangerButton} onClick={() => setPendingDelete(item.id)}>
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Bu işi silmək istədiyinizə əminsiniz?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
