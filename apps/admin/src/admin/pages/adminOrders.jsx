import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminOrders.module.css';
import { orderService, ORDER_STATUSES, orderStatusLabel } from '../lib/orderService';
import { useToast } from '../lib/ToastContext';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';

const TABLE_HEADERS = ['ID', 'Müştəri', 'Email', 'Telefon', 'Xidmət', 'Mesaj', 'Tarix', 'Status', 'Əməliyyat'];
const EMPTY_ORDER_FORM = { customerName: '', customerEmail: '', customerPhone: '', service: '', message: '', amount: '' };

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function AdminOrders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_ORDER_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const load = () => {
    setLoading(true);
    setError('');
    orderService
      .getAll({ page, limit: 10, search, status, sort })
      .then(({ data, meta }) => {
        setOrders(data);
        setMeta(meta);
      })
      .catch(() => setError('Serverlə əlaqə qurmaq mümkün olmadı.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search, status, sort]);

  const openNew = () => {
    setForm(EMPTY_ORDER_FORM);
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(EMPTY_ORDER_FORM);
    setFormError('');
  };

  const saveOrder = async () => {
    if (!form.customerName.trim() || !form.customerEmail.trim()) {
      setFormError('Müştəri adı və email tələb olunur');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      await orderService.create(form);
      toast.success('Sifariş uğurla yaradıldı.');
      closeForm();
      load();
    } catch (err) {
      setFormError(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (id, newStatus) => {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    try {
      await orderService.updateStatus(id, newStatus);
      toast.success('Sifariş statusu yeniləndi.');
      setSelected((prev) => (prev?.id === id ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      setOrders(previous);
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    setPendingDelete(null);
    try {
      await orderService.remove(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      if (selected?.id === id) setSelected(null);
      toast.success('Sifariş silindi.');
    } catch (err) {
      toast.error(err.message || 'Əməliyyat zamanı xəta baş verdi.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sifarişlər</h1>
          <p className={styles.subtitle}>Cəmi {meta.total} sifariş</p>
        </div>
        <button className={styles.newButton} onClick={showForm ? closeForm : openNew}>
          {showForm ? 'Ləğv et' : '+ Yeni sifariş'}
        </button>
      </div>

      {showForm && (
        <div className={styles.form}>
          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Müştəri adı"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Email"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Telefon"
              value={form.customerPhone}
              onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Xidmət"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Məbləğ"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Mesaj"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {formError && <p className={styles.error}>{formError}</p>}

          <div className={styles.formActions}>
            <button className={styles.newButton} onClick={saveOrder} disabled={saving}>
              {saving ? 'Saxlanılır...' : 'Əlavə et'}
            </button>
            <button className={styles.sortButton} onClick={closeForm}>
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Müştəri, email və ya xidmət üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={styles.sortButton} onClick={() => setSort((s) => (s === 'desc' ? 'asc' : 'desc'))}>
          Tarix: {sort === 'desc' ? 'Yeni → Köhnə' : 'Köhnə → Yeni'}
        </button>
      </div>

      <div className={styles.filters}>
        <button
          onClick={() => setStatus('')}
          className={clsx(styles.filterBtn, status === '' && styles.filterBtnActive)}
        >
          Hamısı
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={clsx(styles.filterBtn, status === s.value && styles.filterBtnActive)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.stateBox}>Yüklənir...</div>
        ) : error ? (
          <div className={styles.errorBox}>{error}</div>
        ) : orders.length === 0 ? (
          <div className={styles.stateBox}>Sifariş yoxdur</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadRow}>
                {TABLE_HEADERS.map((h) => (
                  <th key={h} className={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.orderId}>{o.id.slice(-8)}</span>
                  </td>
                  <td className={clsx(styles.td, styles.tdCustomer)}>{o.customer.name}</td>
                  <td className={clsx(styles.td, styles.tdMuted)}>{o.customer.email}</td>
                  <td className={clsx(styles.td, styles.tdMuted)}>{o.customer.phone || '—'}</td>
                  <td className={clsx(styles.td, styles.tdMuted)}>{o.service || '—'}</td>
                  <td className={clsx(styles.td, styles.tdMuted)}>
                    {o.message ? (o.message.length > 24 ? `${o.message.slice(0, 24)}…` : o.message) : '—'}
                  </td>
                  <td className={clsx(styles.td, styles.tdDate)}>{formatDate(o.createdAt)}</td>
                  <td className={styles.td}>
                    <span className={clsx(styles.badge, styles[`badge_${o.status}`])}>
                      {orderStatusLabel(o.status)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <select
                        value={o.status}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                        className={styles.select}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button className={styles.viewButton} onClick={() => setSelected(o)}>
                        Bax
                      </button>
                      <button className={styles.deleteButton} onClick={() => setPendingDelete(o.id)}>
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

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.title} style={{ fontSize: '1.4rem' }}>
                Sifariş detalları
              </h3>
              <button className={styles.modalClose} onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Müştəri</span>
              <span className={styles.modalValue}>{selected.customer.name}</span>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Email</span>
              <span className={styles.modalValue}>{selected.customer.email}</span>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Telefon</span>
              <span className={styles.modalValue}>{selected.customer.phone || '—'}</span>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Xidmət</span>
              <span className={styles.modalValue}>{selected.service || '—'}</span>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Tarix</span>
              <span className={styles.modalValue}>{formatDate(selected.createdAt)}</span>
            </div>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>Status</span>
              <select
                value={selected.status}
                onChange={(e) => changeStatus(selected.id, e.target.value)}
                className={styles.select}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            {selected.message && <div className={styles.modalMessage}>{selected.message}</div>}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Sifarişi silmək istədiyinizə əminsiniz?"
        message="Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
