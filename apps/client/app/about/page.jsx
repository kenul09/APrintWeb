"use client";

import { teamMembers } from "@/data/about";
import { CUSTOMER_COUNT, FOUNDED_YEAR, PRODUCT_COUNT, TEAM_SIZE, yearsInBusiness } from "@/data/siteStats";
import { useInView } from "@/hooks/useInView";
import StatGrid from "@/components/common/StatGrid";
import RotatingWord from "@/components/common/RotatingWord";
import MemberCard from "@/components/about/MemberCard";
import CardDeck from "@/components/about/CardDeck";
import { glassStyle } from "@/components/ui/glassStyle";
import { useI18n } from '@/components/i18n/I18nProvider';

export default function About() {
  const [heroRef, heroIn] = useInView(0.1);
  const [storyRef, storyIn] = useInView(0.1);
  const { t, tList, lang } = useI18n();

  // Line 2 "{word} çap" → text before the word, and text after it (which
  // rotates together with the word, see RotatingWord).
  const [heroBefore, heroAfter = ""] = t('about.heroLine2').split('{word}');
  const years = yearsInBusiness();
  const yearsUnit = t(`stats.yearsUnit.${new Intl.PluralRules(lang).select(years)}`);

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
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
        }

        /* Hero — same structure as the homepage hero. The fixed header
           overlays the page, so its height is added to the top padding. */
        .about-hero {
          padding-top: calc(var(--header-height) + clamp(2rem, 4vw, 3.5rem));
          padding-bottom: clamp(2rem, 4vw, 3rem);
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          transition: opacity 0.7s, transform 0.7s;
        }

        @media (min-width: 1024px) {
          .about-hero {
            grid-template-columns: 1.1fr 0.9fr;
            align-items: center;
            gap: clamp(2rem, 5vw, 5rem);
          }
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.25rem;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--color-accent-soft);
          color: var(--color-accent);
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .about-badge-dot { font-size: 0.6em; }

        .about-title {
          margin: 0;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .about-line { display: block; }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .about-desc {
          margin: 1.25rem 0 0;
          max-width: 480px;
          color: var(--color-text-muted);
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .about-stats { margin-bottom: 100px; }

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

        /* Fixed column counts so the members always fill the row:
           4 on desktop, 2 on tablet and phones, 1 on very narrow screens. */
        /* No CTA block on /about (see HIDE_CTA_ROUTES in SiteFooter), so this
           tops up the footer's own margin-top (clamp(3rem, 5vw, 4rem)) to a
           total gap of clamp(4rem, 8vw, 6rem) before the footer line. */
        .about-team {
          padding-bottom: calc(clamp(4rem, 8vw, 6rem) - clamp(3rem, 5vw, 4rem));
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 1023px) {
          .about-team-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 420px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 992px) {
          .about-story {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .about-stats {
            margin-bottom: 70px;
          }

          .about-story {
            margin-bottom: 70px;
          }

          .about-story-cards {
            grid-template-columns: 1fr;
          }

        }
      `}</style>

      <div className="about-container">
        <section
          ref={heroRef}
          className="about-hero"
          style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <div className="about-badge">
              <span className="about-badge-dot" aria-hidden="true">●</span>
              <span>{t('about.badge')}</span>
            </div>

            <h1 className="about-title">
              <span className="sr-only">{t('about.heroSr', { year: FOUNDED_YEAR })}</span>
              <span aria-hidden="true">
                <span className="about-line">{t('about.heroLine1', { year: FOUNDED_YEAR })}</span>
                <span className="about-line">
                  {heroBefore}
                  <RotatingWord
                    words={tList('about.heroWords')}
                    after={heroAfter}
                    wordClassName="accent-text"
                  />
                </span>
              </span>
            </h1>

            <p className="about-desc">{t('about.p1', { year: FOUNDED_YEAR })}</p>
          </div>

          <CardDeck />
        </section>

        <section className="about-stats">
          <StatGrid
            items={[
              { value: `${years} ${yearsUnit}`, label: t('stats.experience') },
              { value: CUSTOMER_COUNT, label: t('stats.customers') },
              { value: TEAM_SIZE, label: t('stats.team') },
              { value: PRODUCT_COUNT, label: t('stats.products') },
            ]}
          />
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
              {t('about.story', { year: FOUNDED_YEAR })}
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
            {tList('about.features').map((feat) => (
              <div
                key={feat.title}
                style={{
                  ...glassStyle,
                  padding: "22px 22px 24px",
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
                  {feat.title}
                </div>

                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "var(--color-accent)",
                    borderRadius: 2,
                    marginBottom: 12,
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9375rem",
                    lineHeight: 1.5,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-team">
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
              <MemberCard key={m.name} m={m} role={t(`about.roles.${m.role}`)} delay={i * 0.1} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
