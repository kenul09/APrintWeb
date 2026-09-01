import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/adminPortfolio.module.css";
import { portfolioService } from "../lib/portfolioService";
import { useToast } from "../lib/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

const EMPTY_FORM = { title: "", category: "", image: "", description: "", isPublished: true };
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB, matches the backend upload limit

// Bootstrap suggestions for an empty database (first item ever added would
// otherwise have no suggestions at all). Matches category names already used
// elsewhere in the app: "Çap"/"Reklam" from prisma/seed.ts's product seed;
// "Promo"/"Kataloq"/"Vizitkart"/"Banner"/"Flayer"/"Broşür"/"Etiket"/"Stiker"/
// "Roll-up"/"Firma blankları"/"Qutu"/"Təqvim"/"Sertifikat" derived from
// apps/client/data/products.js's categoryGroups; "Digər" as an explicit
// catch-all. "Kataloq" is also already a real, live portfolio category.
const DEFAULT_CATEGORIES = [
  "Çap", "Reklam", "Promo", "Kataloq", "Vizitkart", "Banner", "Flayer",
  "Broşür", "Etiket", "Stiker", "Roll-up", "Kart", "Qutu",
  "Təqvim", "Sertifikat", "Menu",
];

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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const objectUrlRef = useRef(null);

  // The categories suggested in the combobox: a small bootstrap default set
  // (see DEFAULT_CATEGORIES above) merged with the real, distinct values
  // already used by existing portfolio records (captured from the
  // unfiltered list so an active search doesn't shrink the options). The
  // field itself is still free text — this list is suggestions, not a
  // closed set of allowed values. Deliberately does NOT include whatever is
  // currently typed in form.category — that would make the dropdown "suggest"
  // back the exact text you just typed as if it were a real option.
  const [knownCategories, setKnownCategories] = useState([]);
  const categoryOptions = useMemo(() => {
    const set = new Set([...DEFAULT_CATEGORIES, ...knownCategories]);
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [knownCategories]);

  // Custom combobox for the category field: native <input list>+<datalist>
  // can't be styled or positioned (it's browser/OS chrome), so this is a
  // small self-contained open/filter/select state instead.
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const categoryBoxRef = useRef(null);
  const filteredCategoryOptions = useMemo(() => {
    const query = form.category.trim().toLowerCase();
    if (!query) return categoryOptions;
    return categoryOptions.filter((c) => c.toLowerCase().includes(query));
  }, [categoryOptions, form.category]);

  // Clamped rather than reset via an effect: filteredCategoryOptions shrinks
  // as the user types, so the raw index can point past the end of the list.
  const activeIndex = Math.min(highlightedIndex, Math.max(filteredCategoryOptions.length - 1, 0));

  useEffect(() => {
    if (!categoryMenuOpen) return;
    const onClickOutside = (e) => {
      if (categoryBoxRef.current && !categoryBoxRef.current.contains(e.target)) {
        setCategoryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [categoryMenuOpen]);

  const selectCategory = (category) => {
    setForm((prev) => ({ ...prev, category }));
    setCategoryMenuOpen(false);
  };

  const handleCategoryKeyDown = (e) => {
    if (!categoryMenuOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setCategoryMenuOpen(true);
      return;
    }
    if (!categoryMenuOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(Math.min(activeIndex + 1, filteredCategoryOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (filteredCategoryOptions[activeIndex]) {
        e.preventDefault();
        selectCategory(filteredCategoryOptions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setCategoryMenuOpen(false);
    }
  };

  const releasePreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => releasePreview, []);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const load = () => {
    setLoading(true);
    setError("");
    portfolioService
      .getAll({ search })
      .then((data) => {
        setItems(data);
        if (!search) {
          setKnownCategories([...new Set(data.map((i) => i.category))]);
        }
      })
      .catch(() => setError("Serverlə əlaqə qurmaq mümkün olmadı."))
      .finally(() => setLoading(false));
  };

  useEffect(load, [search]);

  const openNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    releasePreview();
    setImageFile(null);
    setImagePreview("");
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
    releasePreview();
    setImageFile(null);
    setImagePreview(item.image || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    releasePreview();
    setImageFile(null);
    setImagePreview("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFormError("Yalnız PNG və JPG/JPEG formatlı şəkillərə icazə verilir.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFormError("Şəkil 5MB-dan böyük ola bilməz.");
      return;
    }

    setFormError("");
    releasePreview();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImageFile(file);
    setImagePreview(url);
  };

  const saveItem = async () => {
    if (!form.title.trim() || !form.category.trim()) {
      setFormError("Başlıq və kateqoriya tələb olunur");
      return;
    }
    if (!imageFile && !form.image) {
      setFormError("Şəkil seçilməlidir");
      return;
    }

    setFormError("");
    let imageUrl = form.image;

    if (imageFile) {
      setUploading(true);
      try {
        imageUrl = await portfolioService.uploadImage(imageFile);
      } catch (err) {
        setFormError(err.message || "Şəkil yüklənə bilmədi.");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    setSaving(true);
    try {
      const payload = { ...form, image: imageUrl };
      if (editingId) {
        await portfolioService.update(editingId, payload);
        toast.success("İş yeniləndi.");
      } else {
        await portfolioService.create(payload);
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
            <div className={styles.formField}>
              <label htmlFor="portfolio-title" className={styles.fieldLabel}>Başlıq</label>
              <input
                id="portfolio-title"
                className={styles.input}
                placeholder="Məs: Vizit kartlar"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="portfolio-category" className={styles.fieldLabel}>Kateqoriya</label>
              <div className={styles.comboboxWrapper} ref={categoryBoxRef}>
                <input
                  id="portfolio-category"
                  className={styles.input}
                  placeholder="Kateqoriya seçin və ya yazın"
                  value={form.category}
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                    setHighlightedIndex(0);
                  }}
                  onFocus={() => setCategoryMenuOpen(true)}
                  onClick={() => setCategoryMenuOpen(true)}
                  onKeyDown={handleCategoryKeyDown}
                  autoComplete="off"
                />
                {categoryMenuOpen && (
                  <div className={styles.comboboxPanel} role="listbox">
                    {filteredCategoryOptions.length === 0 ? (
                      <div className={styles.comboboxEmpty}>Uyğun kateqoriya yoxdur — yeni ad yazıla bilər</div>
                    ) : (
                      filteredCategoryOptions.map((category, index) => (
                        <div
                          key={category}
                          role="option"
                          aria-selected={category === form.category}
                          className={[
                            styles.comboboxOption,
                            index === activeIndex ? styles.comboboxOptionHighlighted : "",
                            category === form.category ? styles.comboboxOptionSelected : "",
                          ].filter(Boolean).join(" ")}
                          onMouseDown={(e) => e.preventDefault()}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => selectCategory(category)}
                        >
                          {category}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formField}>
              <span className={styles.fieldLabel}>Şəkil seç</span>
              <label htmlFor="portfolio-image-input" className={styles.fileInputButton}>
                {imageFile ? imageFile.name : "PNG/JPG faylı seç"}
              </label>
              <input
                id="portfolio-image-input"
                className={styles.fileInputHidden}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                disabled={uploading || saving}
              />
              {imagePreview && (
                <img className={styles.filePreview} src={imagePreview} alt="Önizləmə" />
              )}
            </div>
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
            <button className={styles.primaryButton} onClick={saveItem} disabled={saving || uploading}>
              {uploading ? "Şəkil yüklənir..." : saving ? "Saxlanılır..." : editingId ? "Yadda saxla" : "Əlavə et"}
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
