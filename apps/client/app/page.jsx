"use client";

import Link from "next/link";
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
        background: "#060608",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: '"DM Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .hero-section { padding: 120px 56px 80px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .display-text { font-family: "Oswald", sans-serif; font-weight: 500; line-height: 0.9; margin: 0; }
        .cursor { display: inline-block; width: 3px; height: 0.85em; background: #a78bfa; margin-left: 4px; animation: blink 0.9s infinite; }

        .marquee-shell { border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden; position: relative; background: rgba(255,255,255,0.01); }
        .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-pill { display: flex; align-items: center; gap: 20px; padding: 0 60px; height: 160px; border-right: 1px solid rgba(255,255,255,0.04); transition: background 0.3s; }
        .marquee-pill:hover { background: rgba(255,255,255,0.03); }

        .marquee-logo-wrap {
          position: relative;
          width: 85px !important;
          height: 85px !important;
          min-width: 85px !important;
          min-height: 85px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          padding: 15px !important;
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          transition: all 0.4s ease;
        }

        .marquee-logo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
          filter: grayscale(100%) brightness(1.2);
          transition: 0.4s;
        }

        .marquee-pill:hover .marquee-logo-wrap {
          transform: scale(1.1);
          border-color: #a78bfa;
          background: rgba(255,255,255,0.12) !important;
        }

        .marquee-pill:hover img {
          filter: grayscale(0%) brightness(1);
        }

        .marquee-name { font-family: "DM Sans", sans-serif; font-size: 1.2rem; font-weight: 500; color: rgba(255,255,255,0.7); }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); margin: 0 56px 96px; border: 1px solid rgba(255,255,255,0.06); }
        .stat-box { padding: 40px; background: rgba(255,255,255,0.02); border-right: 1px solid rgba(255,255,255,0.06); }
        .stat-val { font-family: "Oswald", sans-serif; font-size: 3rem; font-weight: 500; }

        .btn-primary { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: #fff; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: "-10%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)",
            animation: "float 10s infinite",
          }}
        />
      </div>

      <div className="home-wrap">
        <section className="hero-section">
          <h1 className="display-text" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
            {t('hero.line1')}
          </h1>
          <h1
            className="display-text"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t('hero.line2')}
          </h1>

          <div style={{ marginTop: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ fontSize: "2rem", fontFamily: "Oswald" }}>
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
            <div key={l} className="stat-box">
              <div className="stat-val">{v}</div>
              <div style={{ color: "rgba(255,255,255,0.4)" }}>{l}</div>
            </div>
          ))}
        </section>

        <section
          ref={partnersRef}
          className="partners-section"
          style={{ padding: "80px 0", opacity: partnersIn ? 1 : 0, transition: "1s" }}
        >
          <div style={{ padding: "0 56px", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "Oswald", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {t('partners.title')}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>{t('partners.subtitle')}</p>
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
