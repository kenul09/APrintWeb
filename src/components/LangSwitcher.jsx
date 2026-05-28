import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const langs = [
    { code: "az", label: "AZ", flag: "🇦🇿" },
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "ru", label: "RU", flag: "🇷🇺" },
  ];

  // ✅ FIX: split("-")[0] ilə normalize — "az-AZ" → "az"
  const current = (i18n.language || "az").split("-")[0];
  const activeLang = langs.find((l) => l.code === current) ?? langs[0];

  const changeLang = (lng) => {
    // ✅ FIX: changeLanguage Promise-dir, await etmək lazım deyil amma
    //         React-ın re-render etməsi üçün düzgün çağırılır
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("lang", lng);
    } catch {
      // localStorage mövcud olmaya bilər (SSR, private browsing)
    }
    setOpen(false);
  };

  // ✅ FIX: Kənar kliklərə korrekt reaksiya
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <>
      <style>{`
        .lang-wrap {
          position: relative;
          z-index: 201;
        }

        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 11px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          font-family: "DM Sans", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          transition: border-color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .lang-btn:hover {
          border-color: rgba(139,92,246,0.5);
          background: rgba(139,92,246,0.1);
          color: #fff;
        }

        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: rgba(10, 10, 16, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 6px;
          min-width: 110px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          animation: langFadeIn 0.18s ease;
        }

        @keyframes langFadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        .lang-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px;
          border-radius: 9px;
          cursor: pointer;
          font-family: "DM Sans", sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          transition: background 0.15s, color 0.15s;
          user-select: none;
        }

        .lang-item:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
        }

        /* ✅ Aktiv dil — gradient highlight */
        .lang-item.lang-active {
          background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2));
          color: #fff;
          font-weight: 700;
        }

        .lang-item .lang-flag {
          font-size: 1rem;
          line-height: 1;
        }
      `}</style>

      <div className="lang-wrap" ref={ref}>
        <button
          className="lang-btn"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select language"
        >
          <span className="lang-flag">{activeLang.flag}</span>
          <span>{activeLang.label}</span>
          <span style={{ opacity: 0.5, fontSize: "0.6rem" }}>▾</span>
        </button>

        {open && (
          <div className="lang-dropdown" role="listbox">
            {langs.map((lng) => (
              <div
                key={lng.code}
                role="option"
                aria-selected={current === lng.code}
                onClick={() => changeLang(lng.code)}
                className={`lang-item${current === lng.code ? " lang-active" : ""}`}
              >
                <span className="lang-flag">{lng.flag}</span>
                <span>{lng.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}