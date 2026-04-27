import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: 1,
    name: "Logo Dizaynı",
    desc: "Brendinizi təmsil edən unikal və peşəkar logo hazırlanması.",
    features: ["3 konsept variantı", "Vektoral format (AI, SVG)", "Rəng palitrası", "Sonsuz düzəliş"],
    tag: "Populyar",
    popular: false,
  },
  {
    id: 2,
    name: "Brend Paketi",
    desc: "Tam korporativ kimlik: logo, rəng sistemi, şriftlər və brend daşıyıcıları.",
    features: ["Logo + variantlar", "Brand guideline", "Vizit kart dizaynı", "Sosial media şablonları", "Brendbook PDF"],
    tag: "",
    popular: true,
  },
  {
    id: 3,
    name: "Çap Dizaynı",
    desc: "Flayer, banner, menu, roll-up və digər çap materialları üçün peşəkar dizayn.",
    features: ["A4/A5 flayer", "Banner və roll-up", "Menu dizaynı", "Çapa hazır fayllar", "Sürətli çatdırılma"],
    tag: "Yeni",
    popular: false,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function ServiceCard({ service, delay, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "48px 36px",
        borderRadius: "24px",
        border: service.popular
          ? "1px solid rgba(139,92,246,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        background: service.popular
          ? "linear-gradient(145deg, rgba(139,92,246,0.25), rgba(236,72,153,0.12))"
          : hovered
            ? "rgba(139,92,246,0.06)"
            : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background 0.3s, border-color 0.3s, box-shadow 0.3s`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(40px)",
        boxShadow: service.popular
          ? "0 0 60px rgba(139,92,246,0.2)"
          : hovered
            ? "0 20px 40px rgba(0,0,0,0.3)"
            : "none",
      }}
    >
      {service.popular && (
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            color: "#fff",
            borderRadius: "50px",
            padding: "5px 18px",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            whiteSpace: "nowrap",
            fontFamily: '"DM Sans", sans-serif',
            boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
          }}
        >
          ƏN POPULYAR
        </div>
      )}

      {!!service.tag && !service.popular && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background:
              service.tag === "Yeni"
                ? "rgba(236,72,153,0.15)"
                : "rgba(139,92,246,0.15)",
            color: service.tag === "Yeni" ? "#f472b6" : "#a78bfa",
            border: `1px solid ${
              service.tag === "Yeni"
                ? "rgba(236,72,153,0.25)"
                : "rgba(139,92,246,0.25)"
            }`,
            borderRadius: "6px",
            padding: "3px 10px",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {service.tag}
        </div>
      )}

      {service.popular && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.2), transparent 60%)",
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontSize: "2.4rem",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "0.03em",
            marginBottom: 12,
            background: service.popular
              ? "linear-gradient(135deg, #fff, rgba(255,255,255,0.85))"
              : "linear-gradient(135deg, #fff, rgba(255,255,255,0.6))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {service.name}
        </h2>

        <p
          style={{
            color: service.popular ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
            fontSize: "0.83rem",
            marginBottom: 32,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {service.desc}
        </p>

        <div
          style={{
            width: "100%",
            height: 1,
            background: service.popular ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
            marginBottom: 28,
          }}
        />

        {service.features.map((feature) => (
          <div
            key={feature}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
              fontSize: "0.85rem",
              color: service.popular ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.45)",
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                flexShrink: 0,
                background: service.popular
                  ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                  : "rgba(139,92,246,0.15)",
                border: service.popular ? "none" : "1px solid rgba(139,92,246,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            {feature}
          </div>
        ))}

        <Link
          to="/contact"
          style={{
            display: "block",
            marginTop: 32,
            background: service.popular
              ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
              : "rgba(255,255,255,0.06)",
            color: "#fff",
            border: service.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "15px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "0.83rem",
            letterSpacing: "0.08em",
            fontFamily: '"DM Sans", sans-serif',
            transition: "opacity 0.2s, transform 0.2s",
            textDecoration: "none",
            boxShadow: service.popular ? "0 8px 24px rgba(139,92,246,0.35)" : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Sifariş ver →
        </Link>
      </div>
    </article>
  );
}

export default function DesignServices() {
  const [heroRef, heroIn] = useInView(0.1);
  const [cardsRef, cardsIn] = useInView(0.1);

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

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .services-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          padding-bottom: 100px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .services-wrap {
            padding: 0 20px;
          }

          .services-hero {
            padding: 112px 0 56px !important;
          }

          .services-grid {
            grid-template-columns: 1fr;
            padding-bottom: 72px;
          }
        }
      `}</style>

      <div className="services-wrap">
        <section
          ref={heroRef}
          className="services-hero"
          style={{ padding: "120px 0 72px", textAlign: "center" }}
        >
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
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Xidmətlər
            </span>
          </div>

          <h1
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 500,
              lineHeight: 0.92,
              marginBottom: 20,
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
              Dizayn Xidmətləri
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              fontWeight: 300,
              transition: "opacity 0.9s 0.35s, transform 0.9s 0.35s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Logo, brend paketi və çap materialları üzrə peşəkar dizayn xidmətləri.
          </p>
        </section>

        <section ref={cardsRef} className="services-grid">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={i * 0.12}
              inView={cardsIn}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
