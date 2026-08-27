import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminBlog.module.css';
import { blogService } from '../lib/blogService';
import { useToast } from '../lib/ToastContext';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';

const EMPTY_FORM = { title: '', excerpt: '', content: '', image: '', isPublished: false };

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function AdminBlog() {
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const load = () => {
    setLoading(true);
    setError('');
    blogService
      .getAll({ page, limit: 10, search })
      .then(({ data, meta }) => {
        setPosts(data);
        setMeta(meta);
      })
      .catch(() => setError('Serverlə əlaqə qurmaq mümkün olmadı.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);

  const openNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      image: post.image || '',
      isPublished: post.isPublished,
    });
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
  };

  const savePost = async () => {
    if (!form.title.trim()) {
      setFormError('Başlıq tələb olunur');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      if (editingId) {
        await blogService.update(editingId, form);
        toast.success('Post yeniləndi.');
      } else {
        await blogService.create(form);
        toast.success('Post əlavə edildi.');
      }
      closeForm();
      load();
    } catch (err) {
      setFormError(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post) => {
    const previous = posts;
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, isPublished: !p.isPublished } : p)));
    try {
      await blogService.update(post.id, { isPublished: !post.isPublished });
      toast.success(post.isPublished ? 'Post gizlədildi.' : 'Post yayımlandı.');
    } catch (err) {
      setPosts(previous);
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    setPendingDelete(null);
    try {
      await blogService.remove(id);
      toast.success('Post silindi.');
      load();
    } catch (err) {
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <button onClick={showForm ? closeForm : openNew} className={clsx(styles.btnNew, showForm && styles.btnNewCancel)}>
          {showForm ? 'Ləğv et' : '+ Yeni post'}
        </button>
      </div>

      {showForm && (
        <div className={styles.form}>
          <input
            className={styles.input}
            placeholder="Post başlığı..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className={styles.input}
            placeholder="Qısa məzmun (excerpt)..."
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <input
            className={styles.input}
            placeholder="Şəkil URL (https://...)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <textarea
            className={styles.textarea}
            placeholder="Məzmun..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Dərhal yayımla
          </label>

          {formError && <p className={styles.error}>{formError}</p>}

          <div className={styles.formActions}>
            <button className={styles.btnAdd} onClick={savePost} disabled={saving}>
              {saving ? 'Saxlanılır...' : editingId ? 'Yadda saxla' : 'Əlavə et'}
            </button>
            <button className={styles.btnCancel} onClick={closeForm}>
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Başlıq üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.stateBox}>Yüklənir...</div>
      ) : error ? (
        <div className={styles.errorBox}>{error}</div>
      ) : posts.length === 0 ? (
        <div className={styles.stateBox}>Blog yazısı yoxdur</div>
      ) : (
        <div className={styles.list}>
          {posts.map((p) => (
            <div key={p.id} className={styles.postCard}>
              <div className={styles.postInfo}>
                <div className={styles.postTitle}>{p.title}</div>
                <div className={styles.postDate}>{formatDate(p.createdAt)}</div>
              </div>

              <div className={styles.postActions}>
                <span className={clsx(styles.statusBadge, p.isPublished ? styles.statusPublished : styles.statusDraft)}>
                  {p.isPublished ? 'Yayımlandı' : 'Draft'}
                </span>
                <button className={styles.btnToggle} onClick={() => openEdit(p)}>
                  Redaktə et
                </button>
                <button className={styles.btnToggle} onClick={() => togglePublish(p)}>
                  {p.isPublished ? 'Gizlət' : 'Yayımla'}
                </button>
                <button className={styles.btnDelete} onClick={() => setPendingDelete(p.id)}>
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Bu bloq yazısını silmək istədiyinizə əminsiniz?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
