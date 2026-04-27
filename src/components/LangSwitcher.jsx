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

  const current = i18n.language?.split("-")[0];
  const activeLang =
    langs.find((l) => l.code === current) || langs[0];

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);

    try {
      localStorage.setItem("lang", lng);
    } catch {}

    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <style>{`
        .lang-wrap {
          position: relative;
        }

        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          color: #fff;
          cursor: pointer;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }

        .dropdown {
          position: absolute;
          top: 120%;
          right: 0;
          background: rgba(10,10,15,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 6px;
          min-width: 100px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          animation: fadeIn 0.2s ease;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: 0.2s;
        }

        .item:hover {
          background: rgba(255,255,255,0.06);
        }

        .lang-item-active {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: #fff;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="lang-wrap" ref={ref}>
        <button
          className="lang-btn"
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <span>{activeLang.flag}</span>
          <span>{activeLang.label}</span>
        </button>

        {open && (
          <div className="dropdown">
            {langs.map((lng) => (
              <div
                key={lng.code}
                onClick={() => changeLang(lng.code)}
                className={`item ${
                  current === lng.code ? "lang-item-active" : ""
                }`}
              >
                <span>{lng.flag}</span>
                <span>{lng.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
