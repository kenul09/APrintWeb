export default function WorkProcess() {
  const steps = [
    {
      id: "01",
      title: "Məhsulu seç",
      desc: "Vizit kart, flayer, banner, buklet və ya promo məhsullar arasından ehtiyacınıza uyğun xidməti seçin.",
      icon: "✦",
      accent: "#a855f7",
    },
    {
      id: "02",
      title: "Dizaynı göndər və ya biz hazırlayaq",
      desc: "Hazır dizayn faylınızı göndərin və ya peşəkar komandamız sizin üçün yeni dizayn hazırlasın.",
      icon: "◌",
      accent: "#f97316",
    },
    {
      id: "03",
      title: "Çap və istehsal",
      desc: "Seçilən material və texniki xüsusiyyətlərə uyğun olaraq sifarişiniz yüksək keyfiyyətlə çap olunur.",
      icon: "▣",
      accent: "#22c55e",
    },
    {
      id: "04",
      title: "Təhvil al",
      desc: "Hazır sifarişinizi qısa müddətdə təhvil alın və ya çatdırılma xidmətimizdən yararlanın.",
      icon: "→",
      accent: "#3b82f6",
    },
  ];

  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top left, rgba(168,85,247,0.12), transparent 24%), radial-gradient(circle at bottom right, rgba(249,115,22,0.12), transparent 26%), #07070b",
        color: "#fff",
        padding: "110px 24px",
        fontFamily: '"DM Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          position: relative;
        }

        .process-card {
          position: relative;
          border-radius: 28px;
          padding: 30px 24px 28px;
          min-height: 300px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .process-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
        }

        .process-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.9;
          pointer-events: none;
        }

        .process-card:hover .process-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        @media (max-width: 1100px) {
          .process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            textAlign: "center",
            maxWidth: 760,
            margin: "0 auto 64px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: 16,
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.12)",
              color: "#fb923c",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            İş Prosesi
          </span>

          <h2
            style={{
              margin: "0 0 16px",
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(3rem, 7vw, 5.2rem)",
              lineHeight: 0.9,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Çap sifarişiniz
            <br />
            4 aydın addımda
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.58)",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            Məhsul seçimindən təhvila qədər bütün prosesi sadə, sürətli və peşəkar şəkildə idarə edirik.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="process-card"
              style={{
                boxShadow: `0 18px 40px ${step.accent}10`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${step.accent}33, transparent 70%)`,
                  filter: "blur(8px)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 26,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 18,
                    display: "grid",
                    placeItems: "center",
                    background: `${step.accent}18`,
                    border: `1px solid ${step.accent}40`,
                    color: step.accent,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    boxShadow: `0 10px 25px ${step.accent}22`,
                  }}
                >
                  {step.icon}
                </div>

                <div
                  style={{
                    fontFamily: '"Oswald", sans-serif',
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.12)",
                  }}
                >
                  {step.id}
                </div>
              </div>

              <h3
                style={{
                  margin: "0 0 14px",
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: "1.9rem",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  color: "#fff",
                  maxWidth: 220,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.64)",
                  fontSize: "0.96rem",
                  lineHeight: 1.85,
                  maxWidth: 250,
                }}
              >
                {step.desc}
              </p>

              <div
                className="process-arrow"
                style={{
                  position: "absolute",
                  bottom: 22,
                  right: 22,
                  color: step.accent,
                  fontSize: "1.15rem",
                  opacity: 0.65,
                  transition: "all 0.25s ease",
                }}
              >
                ↗
              </div>

              {index !== steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -12,
                    width: 24,
                    height: 2,
                    background: `linear-gradient(90deg, ${step.accent}, rgba(255,255,255,0.08))`,
                    opacity: 0.7,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
