import { useEffect, useRef, useState } from "react";

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
};

const members = [
  { name: "Anar Əsədov", role: "CEO", initials: "AƏ" },
  { name: "Könül Səmədova", role: "Dizayner", initials: "KS" },
  { name: "Murad Quliyev", role: "Texnik", initials: "MQ" },
  { name: "Nigar Hüseynova", role: "Satış", initials: "NH" },
];

const stats = [
  { n: "2015", l: "Quruluş ili" },
  { n: "2000+", l: "Müştəri" },
  { n: "15", l: "Komanda üzvü" },
  { n: "50+", l: "Məhsul növü" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function StatCard({ n, l, delay }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        ...glassStyle,
        padding: "40px 32px",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "3.5rem",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "0.02em",
          marginBottom: "10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 300,
          position: "relative",
          zIndex: 1,
        }}
      >
        {l}
      </div>
    </div>
  );
}

function MemberCard({ m, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassStyle,
        padding: "36px 24px",
        textAlign: "center",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background 0.3s, border-color 0.3s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
        background: hovered ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.04)",
        borderColor: hovered ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg, #8b5cf6, #a78bfa)"
            : "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "1.1rem",
          color: "#fff",
          transition: "background 0.3s",
        }}
      >
        {m.initials}
      </div>

      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.88rem",
          fontWeight: 500,
          color: "#fff",
          marginBottom: 6,
        }}
      >
        {m.name}
      </div>

      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.68rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {m.role}
      </div>
    </div>
  );
}

export default function About() {
  const [heroRef, heroIn] = useInView(0.1);
  const [storyRef, storyIn] = useInView(0.1);

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
              Haqqımızda
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
              2015-dən
              <br />
              bəri
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
              Bakıda çap
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
            A_Print olaraq 2015-ci ildən bəri Azərbaycanda yüzlərlə şirkətə peşəkar çap xidməti göstəririk.
          </p>
        </section>

        <section className="about-stats">
          {stats.map((s, i) => (
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
              Bizim
              <br />
              Hekayəmiz
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
              2015-ci ildə kiçik bir studiya kimi başladıq. Bu gün Bakının ən böyük rəqəmsal çap mərkəzlərindən birinə çevrildik.
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.88rem",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              Hər sifarişə fərdi yanaşırıq, keyfiyyətsiz iş buraxmırıq.
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
            {["Çap", "Dizayn", "Çatdırılma", "Keyfiyyət"].map((t, i) => (
              <div
                key={t}
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
                  {t}
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
              Komandamız
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
            {members.map((m, i) => (
              <MemberCard key={m.name} m={m} delay={i * 0.1} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
