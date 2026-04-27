import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const logoMap = import.meta.glob("../assets/logos/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

const getLogo = (file) => logoMap[`../assets/logos/${file}`] ?? "";

const partners = [
  { name: "xəngəlstation", abbr: "XS", bg: "rgba(59,139,212,0.1)", color: "#6db3f2", logo: getLogo("xengelstation.png") },
  { name: "xəngəlation", abbr: "XM", bg: "rgba(29,158,117,0.1)", color: "#5dcaa5", logo: getLogo("xəngəlation.png") },
  { name: "xəngəlməngəl", abbr: "XL", bg: "rgba(139,92,246,0.1)", color: "#a78bfa", logo: getLogo("xengelmengel.png") },
  { name: "gaumarjos", abbr: "GM", bg: "rgba(186,117,23,0.1)", color: "#fac775", logo: getLogo("gaumarjos.png") },
  { name: "Chabiant", abbr: "CH", bg: "rgba(216,90,48,0.1)", color: "#f0997b", logo: getLogo("chabiant.png") },
  { name: "Manipura", abbr: "MC", bg: "rgba(212,83,126,0.1)", color: "#ed93b1", logo: getLogo("manipura.png") },
  { name: "İmereti", abbr: "IM", bg: "rgba(99,153,34,0.1)", color: "#97c459", logo: getLogo("imereti.png") },
  { name: "FusionClub", abbr: "FC", bg: "rgba(59,139,212,0.1)", color: "#6db3f2", logo: getLogo("fusionclub.png") },
];

const typeWords = ["Flayer", "Banner", "Roll-up", "Vizit kart", "Kitabça"];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    const node = ref.current;
    if (node) obs.observe(node);
    return () => { if (node) obs.unobserve(node); obs.disconnect(); };
  }, [threshold]);
  return [ref, inView];
}

function PartnerLogo({ partner }) {
  const [broken, setBroken] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="marquee-pill">
      {/* 🚀 LOGO WRAPPER - TAM YUMRU (Dairəvi) DÜZƏLDİLDİ */}
      <div className="marquee-logo-wrap">
        {loading && !broken && <div className="shimmer-load"></div>}
        {!broken && partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            onLoad={() => setLoading(false)}
            onError={() => setBroken(true)}
            style={{ display: loading ? 'none' : 'block' }}
          />
        ) : (
          <span className="marquee-fallback" style={{ color: partner.color }}>
            {partner.abbr}
          </span>
        )}
      </div>
      <span className="marquee-name">{partner.name}</span>
    </div>
  );
}

export default function Home() {
  const typed = useTypewriter(typeWords);
  const [statsRef, statsIn] = useInView();
  const [partnersRef, partnersIn] = useInView();

  const marqueeItems = [...partners, ...partners];

  return (
    <div style={{ background: "#060608", minHeight: "100vh", color: "#fff", fontFamily: '"DM Sans", sans-serif', position: "relative", overflow: "hidden" }}>
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
        
        /* 🛠 DAİRƏVİ LOGO CSS - BURA DÜZƏLDİ */
        .marquee-logo-wrap { 
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

      {/* Arxa fon effektləri */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)", animation: "float 10s infinite" }} />
      </div>

      <div className="home-wrap">
        <section className="hero-section">
          <h1 className="display-text" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>Brendinizi</h1>
          <h1 className="display-text" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Canlandırın</h1>
          
          <div style={{ marginTop: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
             <div style={{ fontSize: "2rem", fontFamily: "Oswald" }}>{typed}<span className="cursor" /></div>
             <Link to="/products" className="btn-primary">Məhsullar →</Link>
          </div>
        </section>

        {/* Stats */}
        <section ref={statsRef} className="stat-grid" style={{ opacity: statsIn ? 1 : 0, transition: "1s" }}>
          {[["2000+", "Müştəri"], ["8+", "Məhsul"], ["24s", "Çatdırılma"], ["5.0★", "Reytinq"]].map(([v, l]) => (
            <div key={l} className="stat-box">
              <div className="stat-val">{v}</div>
              <div style={{ color: "rgba(255,255,255,0.4)" }}>{l}</div>
            </div>
          ))}
        </section>

        {/* Partners Bölməsi */}
        <section ref={partnersRef} className="partners-section" style={{ padding: "80px 0", opacity: partnersIn ? 1 : 0, transition: "1s" }}>
          <div style={{ padding: "0 56px", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "Oswald", letterSpacing: "0.2em", textTransform: "uppercase" }}>Partnyorlarımız</h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Bizimlə işləyən brendlər</p>
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