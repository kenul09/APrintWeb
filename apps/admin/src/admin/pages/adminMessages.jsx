import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminMessages.module.css';
import { contactService } from '../lib/contactService';
import { useToast } from '../lib/ToastContext';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

export default function AdminMessages() {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    contactService
      .getAll({ page, limit: 10, search })
      .then(({ data, meta }) => {
        if (cancelled) return;
        setMessages(data);
        setMeta(meta);
      })
      .catch(() => {
        if (!cancelled) setError('Serverlə əlaqə qurmaq mümkün olmadı.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, search]);

  const markRead = async (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    try {
      await contactService.markRead(id);
    } catch (err) {
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  const markUnread = async (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: false } : m)));
    setSelected((prev) => (prev?.id === id ? { ...prev, isRead: false } : prev));
    try {
      await contactService.markUnread(id);
      toast.success('Mesaj oxunmamış kimi işarələndi.');
    } catch (err) {
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    setPendingDelete(null);
    try {
      await contactService.remove(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      if (selected?.id === id) setSelected(null);
      toast.success('Mesaj silindi.');
    } catch (err) {
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  const handleSelect = (m) => {
    setSelected(m);
    if (!m.isRead) markRead(m.id);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mesajlar</h1>
        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount} yeni</span>}
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Ad, email və ya mesaj üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.stateBox}>Yüklənir...</div>
      ) : error ? (
        <div className={styles.errorBox}>{error}</div>
      ) : messages.length === 0 ? (
        <div className={styles.stateBox}>Mesaj yoxdur</div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.list}>
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleSelect(m)}
                className={clsx(styles.messageCard, selected?.id === m.id && styles.messageCardActive)}
              >
                <div className={styles.cardTop}>
                  <span className={clsx(styles.senderName, !m.isRead && styles.senderNameUnread)}>{m.name}</span>
                  <span className={styles.date}>{formatDate(m.createdAt)}</span>
                </div>
                <div className={styles.preview}>
                  {!m.isRead && <span className={styles.unreadDot} aria-hidden="true" />}
                  <span className={styles.previewText}>{m.message}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.detail}>
            {selected ? (
              <div className={styles.detailCard}>
                <div className={styles.detailHeader}>
                  <div>
                    <h3 className={styles.detailName}>{selected.name}</h3>
                    <div className={styles.detailEmail}>{selected.email}</div>
                    {selected.phone && <div className={styles.detailEmail}>{selected.phone}</div>}
                  </div>
                  {selected.service && <span className={styles.serviceBadge}>{selected.service}</span>}
                </div>

                <div className={styles.messageBody}>{selected.message}</div>

                <div className={styles.actions}>
                  <a className={styles.btnReply} href={`mailto:${selected.email}`}>
                    Cavabla
                  </a>
                  {selected.isRead && (
                    <button className={styles.btnUnread} onClick={() => markUnread(selected.id)}>
                      Oxunmamış et
                    </button>
                  )}
                  <button className={styles.btnDelete} onClick={() => setPendingDelete(selected.id)}>
                    Sil
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>Mesaj seçin</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Bu mesajı silmək istədiyinizə əminsiniz?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
