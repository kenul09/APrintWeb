"use client";

import { aboutStats, teamMembers } from "@/data/about";
import { useInView } from "@/hooks/useInView";
import StatCard from "@/components/about/StatCard";
import MemberCard from "@/components/about/MemberCard";
import { glassStyle } from "@/components/ui/glassStyle";
import { useI18n } from '@/components/i18n/I18nProvider';

export default function About() {
  const [heroRef, heroIn] = useInView(0.1);
  const [storyRef, storyIn] = useInView(0.1);
  const { t } = useI18n();

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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .about-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 100px;
        }

        .about-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 100px;
          align-items: center;
        }

        .about-story-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        @media (max-width: 992px) {
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-story {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 0 20px;
          }

          .about-hero {
            padding: 120px 0 70px !important;
          }

          .about-stats {
            grid-template-columns: 1fr;
            margin-bottom: 70px;
          }

          .about-story {
            margin-bottom: 70px;
          }

          .about-story-cards {
            grid-template-columns: 1fr;
          }

          .about-team {
            margin-bottom: 70px !important;
          }
        }
      `}</style>

      <div className="about-container">
        <section ref={heroRef} className="about-hero" style={{ padding: "140px 0 100px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 40,
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
              {t('about.badge')}
            </span>
          </div>

            <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(4rem, 10vw, 8rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "0.01em",
              marginBottom: 40,
              transition: "opacity 0.9s 0.25s, transform 0.9s 0.25s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(40px)",
            }}
          >
              <span
              style={{
                background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
                {t('about.since')}
                <br />
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              {t('about.city')}
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              maxWidth: 480,
              fontWeight: 300,
              transition: "opacity 0.9s 0.4s, transform 0.9s 0.4s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {t('about.p1')}
          </p>
        </section>

        <section className="about-stats">
          {aboutStats.map((s, i) => (
            <StatCard key={s.l} n={s.n} l={s.l} delay={i * 0.1} />
          ))}
        </section>

        <section ref={storyRef} className="about-story">
          <div
            style={{
              transition: "opacity 0.9s 0.1s, transform 0.9s 0.1s",
              opacity: storyIn ? 1 : 0,
              transform: storyIn ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 0.92,
                marginBottom: 28,
                background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t('about.storyTitle')}
            </h2>

            <div
              style={{
                width: 48,
                height: 2,
                background: "linear-gradient(90deg, #8b5cf6, transparent)",
                marginBottom: 28,
                borderRadius: 2,
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.88rem",
                lineHeight: 1.9,
                fontWeight: 300,
                marginBottom: 16,
              }}
            >
              {t('about.p1')}
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.88rem",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              {t('about.p2')}
            </p>
          </div>

          <div
            className="about-story-cards"
            style={{
              transition: "opacity 0.9s 0.3s, transform 0.9s 0.3s",
              opacity: storyIn ? 1 : 0,
              transform: storyIn ? "translateX(0)" : "translateX(40px)",
            }}
          >
            {t('about.features').map((feat, i) => (
              <div
                key={feat}
                style={{
                  ...glassStyle,
                  padding: "36px 28px",
                  background:
                    i % 2 === 0
                      ? "rgba(139,92,246,0.06)"
                      : "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.8rem",
                    color: "#fff",
                    letterSpacing: "0.05em",
                    marginBottom: 10,
                  }}
                >
                  {feat}
                </div>

                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                    borderRadius: 2,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="about-team" style={{ marginBottom: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {t('about.teamTitle')}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
              }}
            />
          </div>

          <div className="about-team-grid">
            {teamMembers.map((m, i) => (
              <MemberCard key={m.name} m={m} delay={i * 0.1} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
