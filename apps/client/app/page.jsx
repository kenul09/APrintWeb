"use client";

import Link from "next/link";
import AnimatedStat from "@/components/common/AnimatedStat";
import PartnerLogo from "@/components/common/PartnerLogo";
import { partners } from "@/data/partners";
import { typeWords } from "@/data/siteContent";
import { useInView } from "@/hooks/useInView";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useI18n } from '@/components/i18n/I18nProvider';

export default function Home() {
  const { t } = useI18n();
  const typed = useTypewriter(typeWords);
  const [statsRef, statsIn] = useInView();
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
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .hero-section {
          padding: 120px 56px 80px;
          border-bottom: 1px solid var(--color-border);
          position: relative;
          background-color: var(--color-bg);
        }

        .cursor { display: inline-block; width: 3px; height: 0.85em; background: var(--color-accent); margin-left: 4px; animation: blink 0.9s infinite; }

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

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); margin: 0 56px 96px; border: 1px solid var(--color-border); background: var(--color-surface); }
        .stat-box { padding: 44px 40px; border-right: 1px solid var(--color-border); min-width: 0; }
        .stat-box:last-child { border-right: none; }
        .stat-val { font-size: 3rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; white-space: nowrap; }

        @media (max-width: 900px) {
          .stat-grid { margin: 0 32px 72px; }
          .stat-box { padding: 28px 20px; }
          .stat-val { font-size: 2.2rem; }
        }

        @media (max-width: 640px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr); margin: 0 20px 56px; }
          .stat-box { padding: 22px 12px; border-right: 1px solid var(--color-border); border-bottom: none; }
          .stat-box:nth-child(2n) { border-right: none; }
          .stat-box:nth-child(-n+2) { border-bottom: 1px solid var(--color-border); }
          .stat-val { font-size: 1.9rem; }
        }

        @media (max-width: 380px) {
          .stat-box { padding: 18px 10px; }
          .stat-val { font-size: 1.5rem; }
        }

      `}</style>

      <div className="home-wrap">
        <section className="hero-section">
          <h1 className="display-text">
            {t('hero.line1')}
          </h1>
          <h1 className="display-text accent-text">
            {t('hero.line2')}
          </h1>

          <div style={{ marginTop: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
              {typed}
              <span className="cursor" />
            </div>
            <Link href="/products" className="btn-primary">
              {t('hero.button')}
            </Link>
          </div>
        </section>

        <section
          ref={statsRef}
          className="stat-grid"
          style={{ opacity: statsIn ? 1 : 0, transition: "1s" }}
        >
          {[["2000+", t('stats.customers')], ["8+", t('stats.products')], ["24s", t('stats.delivery')], ["5.0★", t('stats.rating')]].map(([v, l]) => (
            <AnimatedStat key={l} value={v} label={l} active={statsIn} />
          ))}
        </section>

        <section
          ref={partnersRef}
          className="partners-section"
          style={{ padding: "80px 0", opacity: partnersIn ? 1 : 0, transition: "1s" }}
        >
          <div style={{ padding: "0 56px", marginBottom: "40px" }}>
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
