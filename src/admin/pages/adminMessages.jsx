'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminMessages.module.css';

const initial = [
  { id: 1, name: 'Əli Həsənov',   email: 'ali@gmail.com',   service: 'Flayer',     message: '500 ədəd A4 flayer lazımdır. Qiymət necədir?',       date: '11 Mar', read: false },
  { id: 2, name: 'Leyla Əliyeva', email: 'leyla@gmail.com', service: 'Banner',     message: '3x1 metr banner istəyirəm. Neçə günə hazır olar?',   date: '10 Mar', read: false },
  { id: 3, name: 'Murad Quliyev', email: 'murad@gmail.com', service: 'Vizit kart', message: 'Şirkətimiz üçün 200 ədəd vizit kart lazımdır.',       date: '9 Mar',  read: true  },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(initial);
  const [selected, setSelected] = useState(null);

  const markRead = (id) =>
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));

  const del = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleSelect = (m) => {
    setSelected(m);
    markRead(m.id);
  };

  const unreadCount = messages.filter(m => !m.read).length;

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
                <span className={clsx(styles.senderName, !m.read && styles.senderNameUnread)}>
                  {m.name}
                </span>
                <span className={styles.date}>{m.date}</span>
              </div>
              <div className={styles.preview}>
                {!m.read && <span className={styles.unreadDot} aria-hidden="true" />}
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
                <span className={styles.serviceBadge}>{selected.service}</span>
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