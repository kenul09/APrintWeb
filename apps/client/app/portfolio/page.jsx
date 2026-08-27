"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import WorkCard from "@/components/portfolio/WorkCard";
import { useI18n } from '@/components/i18n/I18nProvider';
import { portfolioService } from "@/lib/api/portfolioService";

const MOBILE_PAGE_SIZE = 4;

function getPaginationRange(current, total) {
  const delta = 1;
  const range = [];
  const withDots = [];
  let last;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last !== undefined) {
      if (i - last === 2) withDots.push(last + 1);
      else if (i - last > 2) withDots.push("...");
    }
    withDots.push(i);
    last = i;
  }

  return withDots;
}

export default function Portfolio() {
  const { t } = useI18n();
  const [works, setWorks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState(t('portfolio.all'));
  const [page, setPage] = useState(1);
  const [heroRef, heroIn] = useInView(0.1);
  const gridRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    portfolioService
      .getAll()
      .then((data) => {
        if (cancelled) return;
        setWorks(data);
        setStatus(data.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(works.map((w) => w.category))];
    return [t('portfolio.all'), ...unique];
  }, [t, works]);

  const filteredWorks = filter === t('portfolio.all') ? works : works.filter((w) => w.category === filter);

  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / MOBILE_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * MOBILE_PAGE_SIZE,
    currentPage * MOBILE_PAGE_SIZE
  );

  function selectCategory(category) {
    setFilter(category);
    setPage(1);
  }

  function goToPage(next) {
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        color: "var(--foreground)",
        fontFamily: '"DM Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .portfolio-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding-bottom: 100px;
        }

        .portfolio-grid-mobile {
          display: none;
        }

        .portfolio-pagination {
          display: none;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
          padding-bottom: 72px;
        }

        .portfolio-page-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 10px;
          border-radius: 10px;
          border: 1px solid rgba(var(--ink-rgb),0.08);
          background: rgba(var(--ink-rgb),0.04);
          color: rgba(var(--ink-rgb),0.6);
          font-family: "DM Sans", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .portfolio-page-btn:hover:not(:disabled) {
          color: var(--foreground);
          border-color: rgba(139,92,246,0.4);
        }

        .portfolio-page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .portfolio-page-btn-active,
        .portfolio-page-btn-active:hover {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: #fff;
          border-color: transparent;
        }

        .portfolio-page-dots {
          color: rgba(var(--ink-rgb),0.3);
          padding: 0 2px;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .portfolio-wrap {
            padding: 0 20px;
          }

          .portfolio-hero {
            padding: 112px 0 56px !important;
          }

          .portfolio-grid-desktop {
            display: none;
          }

          .portfolio-grid-mobile {
            display: grid;
            grid-template-columns: 1fr;
            padding-bottom: 32px;
          }

          .portfolio-pagination {
            display: flex;
          }

          .portfolio-filters {
            margin-bottom: 28px !important;
            flex-wrap: wrap !important;
            row-gap: 8px !important;
          }

          .portfolio-filters button {
            padding: 7px 14px !important;
            font-size: 0.72rem !important;
          }
        }
      `}</style>

      <div className="portfolio-wrap">
        <section ref={heroRef} className="portfolio-hero" style={{ padding: "120px 0 72px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
              transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(var(--ink-rgb),0.4)",
              }}
            >
              {t('portfolio.badge')}
            </span>
          </div>

          <h1
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(4rem, 9vw, 7rem)",
              fontWeight: 500,
              lineHeight: 0.92,
              marginBottom: 24,
              transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(30px)",
            }}
          >
              <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              {t('portfolio.title')}
            </span>
          </h1>

          <p
            style={{
              color: "rgba(var(--ink-rgb),0.35)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              maxWidth: 400,
              fontWeight: 300,
              transition: "opacity 0.9s 0.35s, transform 0.9s 0.35s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {t('portfolio.intro')}
          </p>
        </section>

        <div
          className="portfolio-filters"
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap",
            transition: "opacity 0.9s 0.4s, transform 0.9s 0.4s",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              style={{
                background:
                  filter === category
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : "rgba(var(--ink-rgb),0.04)",
                color: filter === category ? "#fff" : "rgba(var(--ink-rgb),0.4)",
                border:
                  filter === category
                    ? "1px solid transparent"
                    : "1px solid rgba(var(--ink-rgb),0.08)",
                borderRadius: "10px",
                padding: "9px 22px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.8rem",
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                backdropFilter: "blur(10px)",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {status === "loading" && (
          <p style={{ color: "rgba(var(--ink-rgb),0.4)", paddingBottom: 48 }}>Yüklənir…</p>
        )}
        {status === "error" && (
          <p style={{ color: "rgba(var(--ink-rgb),0.4)", paddingBottom: 48 }}>
            Portfolio yüklənə bilmədi. Bir az sonra yenidən cəhd edin.
          </p>
        )}
        {status === "empty" && (
          <p style={{ color: "rgba(var(--ink-rgb),0.4)", paddingBottom: 48 }}>Hələ heç bir iş əlavə olunmayıb.</p>
        )}

        {status === "ready" && (
          <>
            <section className="portfolio-grid portfolio-grid-desktop">
              {filteredWorks.map((work, i) => (
                <WorkCard key={work.id} work={work} delay={i * 0.08} />
              ))}
            </section>

            <section ref={gridRef} className="portfolio-grid portfolio-grid-mobile">
              {paginatedWorks.map((work, i) => (
                <WorkCard key={work.id} work={work} delay={i * 0.06} forceVisible />
              ))}
            </section>
          </>
        )}

        {totalPages > 1 && (
          <nav className="portfolio-pagination" aria-label="Səhifələmə">
            <button
              type="button"
              className="portfolio-page-btn"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Əvvəlki səhifə"
            >
              ‹
            </button>

            {getPaginationRange(currentPage, totalPages).map((item, idx) =>
              item === "..." ? (
                <span key={`dots-${idx}`} className="portfolio-page-dots">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={`portfolio-page-btn ${currentPage === item ? "portfolio-page-btn-active" : ""}`}
                  onClick={() => goToPage(item)}
                  aria-current={currentPage === item ? "page" : undefined}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              className="portfolio-page-btn"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Növbəti səhifə"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
