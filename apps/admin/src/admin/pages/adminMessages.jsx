import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminMessages.module.css';
import { contactService } from '../lib/contactService';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then(setMessages)
      .catch(() => {});
  }, []);

  const markRead = async (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    try {
      await contactService.markRead(id);
    } catch {
      // ignore — local optimistic state already reflects the intent
    }
  };

  const del = async (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    try {
      await contactService.remove(id);
    } catch {
      // ignore
    }
  };

  const handleSelect = (m) => {
    setSelected(m);
    if (!m.isRead) markRead(m.id);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Mesajlar</h1>
        {unreadCount > 0 && (
          <span className={styles.unreadBadge}>{unreadCount} yeni</span>
        )}
      </div>

      <div className={styles.grid}>

        {/* Message list */}
        <div className={styles.list}>
          {messages.map(m => (
            <div
              key={m.id}
              onClick={() => handleSelect(m)}
              className={clsx(
                styles.messageCard,
                selected?.id === m.id && styles.messageCardActive
              )}
            >
              <div className={styles.cardTop}>
                <span className={clsx(styles.senderName, !m.isRead && styles.senderNameUnread)}>
                  {m.name}
                </span>
                <span className={styles.date}>{formatDate(m.createdAt)}</span>
              </div>
              <div className={styles.preview}>
                {!m.isRead && <span className={styles.unreadDot} aria-hidden="true" />}
                <span className={styles.previewText}>{m.message}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div className={styles.detail}>
          {selected ? (
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <div>
                  <h3 className={styles.detailName}>{selected.name}</h3>
                  <div className={styles.detailEmail}>{selected.email}</div>
                </div>
                {selected.service && <span className={styles.serviceBadge}>{selected.service}</span>}
              </div>

              <div className={styles.messageBody}>
                {selected.message}
              </div>

              <div className={styles.actions}>
                <button className={styles.btnReply}>
                  Cavabla
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => del(selected.id)}
                >
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
    </div>
  );
}
