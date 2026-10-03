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
        background: "var(--color-bg)",
        minHeight: "100vh",
        color: "var(--color-text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
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
                background: "var(--color-accent)",
              }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
              }}
            >
              {t('about.badge')}
            </span>
          </div>

            <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 40,
              transition: "opacity 0.9s 0.25s, transform 0.9s 0.25s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(40px)",
            }}
          >
              <span>
                {t('about.since')}
                <br />
            </span>
            <br />
            <span className="accent-text">
              {t('about.city')}
            </span>
          </h1>

          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              lineHeight: 1.6,
              maxWidth: 480,
              fontWeight: 400,
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
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 28,
                color: "var(--color-text)",
              }}
            >
              {t('about.storyTitle')}
            </h2>

            <div
              style={{
                width: 48,
                height: 2,
                background: "var(--color-accent)",
                marginBottom: 28,
                borderRadius: 2,
              }}
            />

            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontWeight: 400,
                marginBottom: 16,
              }}
            >
              {t('about.p1')}
            </p>

            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontWeight: 400,
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
            {t('about.features').map((feat) => (
              <div
                key={feat}
                style={{
                  ...glassStyle,
                  padding: "36px 28px",
                }}
              >
                <div
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {feat}
                </div>

                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "var(--color-accent)",
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
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
              }}
            >
              {t('about.teamTitle')}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "var(--color-border)",
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
