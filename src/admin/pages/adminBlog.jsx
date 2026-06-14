'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/adminBlog.module.css';

const initial = [
  { id: 1, title: 'Effektiv flayer dizaynının sirləri',    date: '10 Mar 2026', published: true  },
  { id: 2, title: 'Vizit kart üçün ən yaxşı kağız növləri', date: '5 Mar 2026',  published: true  },
  { id: 3, title: 'Banner ölçüləri: Hansını seçməli?',      date: '1 Mar 2026',  published: false },
];

export default function AdminBlog() {
  const [posts, setPosts]       = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]       = useState('');
  const [focused, setFocused]   = useState(false);

  const addPost = () => {
    if (!title.trim()) return;
    setPosts(prev => [...prev, { id: Date.now(), title, date: '20 Mar 2026', published: false }]);
    setTitle('');
    setShowForm(false);
  };

  const toggle = (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p));
  const del    = (id) => setPosts(prev => prev.filter(p => p.id !== id));

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <button
          onClick={() => setShowForm(v => !v)}
          className={clsx(styles.btnNew, showForm && styles.btnNewCancel)}
        >
          {showForm ? 'Ləğv et' : '+ Yeni post'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={styles.form}>
          <input
            className={clsx(styles.input, focused && styles.inputFocused)}
            placeholder="Post başlığı..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <div className={styles.formActions}>
            <button className={styles.btnAdd} onClick={addPost}>Əlavə et</button>
            <button className={styles.btnCancel} onClick={() => setShowForm(false)}>Ləğv et</button>
          </div>
        </div>
      )}

      {/* Post list */}
      <div className={styles.list}>
        {posts.map(p => (
          <div key={p.id} className={styles.postCard}>
            <div className={styles.postInfo}>
              <div className={styles.postTitle}>{p.title}</div>
              <div className={styles.postDate}>{p.date}</div>
            </div>

            <div className={styles.postActions}>
              <span className={clsx(styles.statusBadge, p.published ? styles.statusPublished : styles.statusDraft)}>
                {p.published ? 'Yayımlandı' : 'Draft'}
              </span>
              <button className={styles.btnToggle} onClick={() => toggle(p.id)}>
                {p.published ? 'Gizlət' : 'Yayımla'}
              </button>
              <button className={styles.btnDelete} onClick={() => del(p.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}