"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { works } from "@/data/portfolioWorks";
import { useInView } from "@/hooks/useInView";
import WorkCard from "@/components/portfolio/WorkCard";
export default function Portfolio() {
  const [filter, setFilter] = useState("Hamısı");
  const [heroRef, heroIn] = useInView(0.1);

  const categories = useMemo(() => {
    const unique = [...new Set(works.map((w) => w.category))];
    return ["Hamısı", ...unique];
  }, []);

  const filteredWorks = filter === "Hamısı" ? works : works.filter((w) => w.category === filter);

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

        @media (max-width: 768px) {
          .portfolio-wrap {
            padding: 0 20px;
          }

          .portfolio-hero {
            padding: 112px 0 56px !important;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
            padding-bottom: 72px;
          }

          .portfolio-filters {
            margin-bottom: 36px !important;
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
                color: "rgba(255,255,255,0.4)",
              }}
            >
              İşlərimiz
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
              Portfolio
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              maxWidth: 400,
              fontWeight: 300,
              transition: "opacity 0.9s 0.35s, transform 0.9s 0.35s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Müştərilərimiz üçün hazırladığımız işlərin seçmələri.
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
              onClick={() => setFilter(category)}
              style={{
                background:
                  filter === category
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : "rgba(255,255,255,0.04)",
                color: filter === category ? "#fff" : "rgba(255,255,255,0.4)",
                border:
                  filter === category
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.08)",
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

        <section className="portfolio-grid">
          {filteredWorks.map((work, i) => (
            <WorkCard key={work.id} work={work} delay={i * 0.08} />
          ))}
        </section>
      </div>
    </div>
  );
}
