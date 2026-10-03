"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StatGrid from "@/components/common/StatGrid";
import PartnerLogo from "@/components/common/PartnerLogo";
import { partners } from "@/data/partners";
import { useInView } from "@/hooks/useInView";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useI18n } from '@/components/i18n/I18nProvider';
import { CUSTOMER_COUNT, PRODUCT_COUNT } from "@/data/siteStats";
import { resolveImageSrc } from "@/components/portfolio/WorkCard";
import { portfolioService } from "@/lib/api/portfolioService";

// Hero visual — one main photo with a smaller photo and a stat card
// floating over it. Real work from public/portfolio.
const heroMainShot = {
  src: "/portfolio/4c42233b-2f06-468c-b8c8-b1d6d8783487.png",
  alt: "Star Kosmetoloji salonunun girişində roll-up stend",
};

const heroSmallShot = {
  src: "/portfolio/Ab8b38d0f0d1b48f78286655b1a0e1b25i.png",
  alt: "Fusion Club üçün hazırlanmış vizit kartlar",
};

// Homepage preview of the Portfolio page — same data source
// (portfolioService → GET /api/portfolio). There's no "featured" flag on
// portfolio items, so it shows the newest ones.
const RECENT_WORKS_COUNT = 3;

export default function Home() {
  const { t, tList } = useI18n();
  const typed = useTypewriter(tList('hero.words'));
  const [recentWorks, setRecentWorks] = useState([]);

  useEffect(() => {
    let cancelled = false;
    portfolioService
      .getAll()
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;
        const newest = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((work) => ({ ...work, src: resolveImageSrc(work.image, work.title) }))
          .filter((work) => work.src)
          .slice(0, RECENT_WORKS_COUNT);
        setRecentWorks(newest);
      })
      // The preview is optional — if the API is down the section just
      // stays hidden; the Portfolio page shows its own error state.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const [partnersRef, partnersIn] = useInView();

  const marqueeItems = [...partners, ...partners];

  return (
    <div
      style={{
        background: "var(--color-bg)",
        minHeight: "100vh",
        color: "var(--color-text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Two-column hero. The fixed header overlays the page, so its height
           is added to the top padding to keep the hero clear of the navbar. */
        .hero-section {
          padding-top: calc(var(--header-height) + clamp(2rem, 4vw, 3.5rem));
          padding-bottom: clamp(2rem, 4vw, 3rem);
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .hero-section {
            grid-template-columns: 1.1fr 0.9fr;
            align-items: center;
            gap: clamp(2rem, 5vw, 5rem);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 9rem;
          margin-bottom: 1.25rem;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--color-accent-soft);
          color: var(--color-accent);
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.4;
          white-space: nowrap;
        }

        .hero-badge-dot { font-size: 0.6em; }

        .cursor { display: inline-block; width: 2px; height: 1em; background: var(--color-accent); margin-left: 1px; vertical-align: -0.15em; animation: blink 0.9s infinite; }

        .hero-section .hero-title {
          margin: 0;
          font-size: clamp(2.75rem, 5.5vw, 5.5rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .hero-title span { display: block; }

        .hero-desc {
          margin: 1.25rem 0 0;
          max-width: 480px;
          color: var(--color-text-muted);
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 12px; }

        /* Hero visual: main photo top-left, small photo bottom-right and a
           stat card top-right, both overlapping the main photo. All pieces
           are positioned in % of the box, so it scales as one unit. */
        @keyframes heroFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroRise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .hero-visual {
          position: relative;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 1 / 1.05;
          justify-self: center;
        }

        @media (min-width: 1024px) {
          .hero-visual { max-width: 560px; justify-self: end; }
        }

        .hero-main {
          position: absolute;
          top: 0;
          left: 0;
          width: 72%;
          height: 88%;
          border-radius: 20px;
          overflow: hidden;
          animation: heroFade 0.6s ease-out both;
        }

        .hero-main .hero-img { object-fit: cover; transition: transform 0.4s ease; }
        .hero-main:hover .hero-img { transform: scale(1.02); }

        .hero-small {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 42%;
          aspect-ratio: 4 / 3;
          border: 6px solid var(--color-bg);
          border-radius: 16px;
          overflow: hidden;
          background: var(--color-bg);
          animation: heroRise 0.6s ease-out 0.15s both;
        }

        .hero-small .hero-img { object-fit: cover; }

        /* Outer wrapper does the entrance; the card itself floats, so the two
           transform animations never fight over the same element. */
        .hero-stat-wrap {
          position: absolute;
          top: 9%;
          right: 6%;
          animation: heroRise 0.6s ease-out 0.3s both;
        }

        .hero-stat {
          padding: 12px 16px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          animation: heroFloat 6s ease-in-out 0.9s infinite;
        }

        :root:not([data-theme='light']) .hero-stat { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }

        .hero-stat-num { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
        .hero-stat-label { font-size: 0.8125rem; color: var(--color-text-muted); white-space: nowrap; }

        @media (max-width: 767px) {
          .hero-visual { max-width: none; }
          .hero-small { width: 45%; }
          .hero-stat { padding: 10px 12px; }
          .hero-stat-num { font-size: 1.25rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor,
          .hero-main,
          .hero-small,
          .hero-stat-wrap,
          .hero-stat { animation: none; }
          .hero-main .hero-img { transition: none; }
          .hero-main:hover .hero-img { transform: none; }
        }

        /* Recent work grid */
        .works { margin-bottom: clamp(3rem, 6vw, 5rem); }

        .works-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .works-title { margin: 0; font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; }

        .works-link { color: var(--color-accent); text-decoration: none; font-weight: 500; white-space: nowrap; }
        .works-link:hover { text-decoration: underline; text-underline-offset: 4px; }

        /* One row of 3; below 768px it becomes a swipeable strip. */
        .works-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        @media (max-width: 767px) {
          .works-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            /* Bleed to the screen edge so cards scroll edge-to-edge, while the
               first card still starts on the container edge. */
            margin-inline: calc(-1 * var(--container-pad));
            padding-inline: var(--container-pad);
            scroll-padding-inline: var(--container-pad);
          }
          .works-grid::-webkit-scrollbar { display: none; }
          .works-grid .work-card { flex: 0 0 80%; scroll-snap-align: start; }
        }

        .work-card { display: block; color: var(--color-text); text-decoration: none; }

        .work-media { position: relative; aspect-ratio: 4 / 3; border-radius: 16px; overflow: hidden; }
        .work-media .work-img { object-fit: cover; transition: transform 0.4s ease; }
        .work-card:hover .work-img { transform: scale(1.03); }

        .work-name { margin-top: 0.75rem; font-weight: 500; line-height: 1.3; }
        .work-cat { margin-top: 0.125rem; font-size: 0.875rem; color: var(--color-text-muted); }

        .marquee-shell { border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); overflow: hidden; position: relative; background: var(--color-bg); max-width: 100%; }
        .marquee-track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-pill { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 36px 48px; }

        .marquee-logo-wrap {
          position: relative;
          width: 150px;
          height: 150px;
          min-width: 150px;
          min-height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 26px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          transition: transform 0.4s ease, border-color 0.2s, background-color 0.2s;
        }

        .marquee-logo-wrap img {
          object-fit: contain !important;
        }

        .marquee-pill:hover .marquee-logo-wrap {
          transform: scale(1.08);
          border-color: var(--color-border-strong);
        }

        .shimmer-load {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--color-border);
          animation: pulse 1.4s ease-in-out infinite;
        }

        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

        .marquee-fallback { font-size: 1.4rem; font-weight: 600; letter-spacing: -0.02em; }

        .marquee-name { font-size: 0.95rem; font-weight: 500; color: var(--color-text-muted); text-align: center; max-width: 120px; white-space: normal; line-height: 1.3; }

        @media (max-width: 980px) {
          .marquee-pill { padding: 28px 32px; gap: 12px; }
          .marquee-logo-wrap { width: 110px; height: 110px; min-width: 110px; min-height: 110px; padding: 20px; }
          .marquee-name { font-size: 0.85rem; max-width: 100px; }
        }

        @media (max-width: 640px) {
          .marquee-pill { padding: 20px 18px; gap: 8px; }
          .marquee-logo-wrap { width: 80px; height: 80px; min-width: 80px; min-height: 80px; padding: 14px; }
          .marquee-name { font-size: 0.7rem; max-width: 90px; }
        }

        @media (max-width: 480px) {
          .marquee-pill { padding: 14px 12px; gap: 8px; }
          .marquee-logo-wrap { width: 60px; height: 60px; min-width: 60px; min-height: 60px; padding: 10px; }
          .marquee-name { font-size: 0.65rem; max-width: 70px; }
        }

        /* 1px gap over a border-colored background draws the inner dividers,
           so the lines stay correct at any column count. */
        .stats-section { margin-bottom: 96px; }

        @media (max-width: 640px) {
          .stats-section { margin-bottom: 56px; }
        }

      `}</style>

      <div className="home-wrap">
        <section className="hero-section container">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true">●</span>
              <span>
                {typed}
                <span className="cursor" aria-hidden="true" />
              </span>
            </div>

            <h1 className="hero-title">
              <span>{t('hero.line1')}</span>
              <span className="accent-text">{t('hero.line2')}</span>
            </h1>

            <p className="hero-desc">{t('hero.description')}</p>

            <div className="hero-actions">
              <Link href="/products" className="btn-primary">
                {t('hero.button')}
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                {t('nav.portfolio')}
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-main">
              <Image
                src={heroMainShot.src}
                alt={heroMainShot.alt}
                fill
                preload
                className="hero-img"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, 72vw"
              />
            </div>

            <div className="hero-small">
              <Image
                src={heroSmallShot.src}
                alt={heroSmallShot.alt}
                fill
                className="hero-img"
                sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 45vw"
              />
            </div>

            <div className="hero-stat-wrap">
              <div className="hero-stat">
                <div className="hero-stat-num">2000+</div>
                <div className="hero-stat-label">{t('hero.statLabel')}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section container">
          <StatGrid
            items={[
              { value: CUSTOMER_COUNT, label: t('stats.customers') },
              { value: PRODUCT_COUNT, label: t('stats.products') },
              { value: "24s", label: t('stats.delivery') },
              { value: "5.0★", label: t('stats.rating') },
            ]}
          />
        </section>

        {recentWorks.length > 0 && (
          <section className="works container" aria-labelledby="works-title">
            <div className="works-head">
              <h2 id="works-title" className="works-title">{t('works.title')}</h2>
              <Link href="/portfolio" className="works-link">{t('works.viewAll')}</Link>
            </div>

            <div className="works-grid">
              {recentWorks.map((work) => (
                <Link key={work.id} href="/portfolio" className="work-card">
                  <div className="work-media">
                    <Image
                      src={work.src}
                      alt={work.description || work.title}
                      fill
                      loading="lazy"
                      className="work-img"
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 80vw"
                    />
                  </div>
                  <div className="work-name">{work.title}</div>
                  <div className="work-cat">{work.category}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section
          ref={partnersRef}
          className="partners-section"
          style={{ padding: "80px 0 0", opacity: partnersIn ? 1 : 0, transition: "1s" }}
        >
          <div className="container" style={{ marginBottom: "40px" }}>
            <h2>
              {t('partners.title')}
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>{t('partners.subtitle')}</p>
          </div>

          <div className="marquee-shell">
            <div className="marquee-track">
              {marqueeItems.map((partner, i) => (
                <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
