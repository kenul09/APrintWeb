import { useEffect, useRef, useState } from "react";

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
};

const inputBase = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "14px 18px",
  color: "#fff",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: '"DM Sans", sans-serif',
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [heroRef, heroIn] = useInView(0.1);
  const [formRef, formIn] = useInView(0.1);
  const [infoRef, infoIn] = useInView(0.1);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Zəhmət olmasa bütün vacib sahələri doldurun.");
      return;
    }

    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!emailOk) {
      setError("Email formatı düzgün deyil.");
      return;
    }

    setSent(true);
    setError("");
  };

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

        ::placeholder {
          color: rgba(255,255,255,0.2);
        }

        select option {
          background: #1a1a2e;
          color: #fff;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .contact-wrap {
            padding: 0 20px !important;
          }

          .contact-hero {
            padding: 120px 0 56px !important;
          }

          .contact-form-box,
          .contact-info-box,
          .contact-whatsapp-box {
            padding: 28px !important;
          }
        }
      `}</style>

      <div
        className="contact-wrap"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        <section ref={heroRef} className="contact-hero" style={{ padding: "120px 0 72px" }}>
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
              Əlaqə
            </span>
          </div>

          <h1
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(4rem, 9vw, 7rem)",
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
              Bizimlə əlaqə
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
            Sifariş vermək və ya sual vermək üçün formu doldurun.
          </p>
        </section>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            paddingBottom: 100,
            alignItems: "start",
          }}
        >
          <div
            ref={formRef}
            className="contact-form-box"
            style={{
              ...glassStyle,
              padding: "44px",
              transition: "opacity 0.9s 0.1s, transform 0.9s 0.1s",
              opacity: formIn ? 1 : 0,
              transform: formIn ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 24px",
                    background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))",
                    border: "1px solid rgba(139,92,246,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  ✓
                </div>

                <h3
                  style={{
                    fontFamily: '"Oswald", sans-serif',
                    fontSize: "2rem",
                    letterSpacing: "0.05em",
                    marginBottom: 10,
                  }}
                >
                  Mesaj göndərildi!
                </h3>

                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
                  Müraciətiniz qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { label: "Ad Soyad", key: "name", placeholder: "Əli Həsənov", type: "text" },
                  { label: "Email", key: "email", placeholder: "ali@example.com", type: "email" },
                  { label: "Telefon", key: "phone", placeholder: "+994 50 123 45 67", type: "tel" },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.68rem",
                        letterSpacing: "0.16em",
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {f.label}
                    </label>

                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      onFocus={() => setFocused(f.key)}
                      onBlur={() => setFocused("")}
                      style={{
                        ...inputBase,
                        borderColor:
                          focused === f.key ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)",
                        background:
                          focused === f.key ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.04)",
                        boxShadow:
                          focused === f.key ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.68rem",
                      letterSpacing: "0.16em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Xidmət
                  </label>

                  <select
                    value={form.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    onFocus={() => setFocused("service")}
                    onBlur={() => setFocused("")}
                    style={{
                      ...inputBase,
                      color: form.service ? "#fff" : "rgba(255,255,255,0.2)",
                      borderColor:
                        focused === "service" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)",
                      background:
                        focused === "service"
                          ? "rgba(139,92,246,0.08)"
                          : "rgba(255,255,255,0.04)",
                      boxShadow:
                        focused === "service" ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Xidmət seçin</option>
                    {["Flayer", "Banner", "Roll-up", "Vizit kart", "Kitabça", "Stiker", "Plakat", "Digər"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.68rem",
                      letterSpacing: "0.16em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Mesaj
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Sifariş detallarını yazın..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    style={{
                      ...inputBase,
                      resize: "none",
                      borderColor:
                        focused === "message"
                          ? "rgba(139,92,246,0.6)"
                          : "rgba(255,255,255,0.08)",
                      background:
                        focused === "message"
                          ? "rgba(139,92,246,0.08)"
                          : "rgba(255,255,255,0.04)",
                      boxShadow:
                        focused === "message" ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      marginBottom: 18,
                      padding: "12px 14px",
                      borderRadius: "12px",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#fca5a5",
                      fontSize: "0.82rem",
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    letterSpacing: "0.12em",
                    fontFamily: '"DM Sans", sans-serif',
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  GÖNDƏR →
                </button>
              </form>
            )}
          </div>

          <div
            ref={infoRef}
            style={{
              transition: "opacity 0.9s 0.3s, transform 0.9s 0.3s",
              opacity: infoIn ? 1 : 0,
              transform: infoIn ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div className="contact-info-box" style={{ ...glassStyle, padding: "36px", marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: "1.4rem",
                  letterSpacing: "0.05em",
                  marginBottom: 28,
                  color: "#fff",
                }}
              >
                Əlaqə məlumatları
              </h3>

              {[
                { icon: "📍", title: "Ünvan", value: "Bakı, Sahil m/s yaxınlığı" },
                { icon: "📞", title: "Telefon", value: "+994 55 750 55 33" },
                { icon: "📧", title: "Email", value: "asadov_78@mail.ru" },
                { icon: "🕐", title: "İş saatları", value: "B.e – C.a: 09:00 – 21:00" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "flex-start",
                    marginBottom: i < 3 ? 24 : 0,
                    paddingBottom: i < 3 ? 24 : 0,
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "12px",
                      flexShrink: 0,
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.16em",
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>

                    <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="contact-whatsapp-box"
              style={{
                ...glassStyle,
                padding: "32px",
                background: "rgba(37,211,102,0.05)",
                borderColor: "rgba(37,211,102,0.15)",
              }}
            >
              <h4
                style={{
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: "1.2rem",
                  letterSpacing: "0.05em",
                  marginBottom: 12,
                }}
              >
                Sürətli cavab
              </h4>

              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.83rem",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginBottom: 20,
                }}
              >
                Suallarınız üçün WhatsApp-da da əlaqə saxlaya bilərsiniz. Adətən 15 dəqiqə ərzində cavab veririk.
              </p>

              <a
                href="https://wa.me/994557505533?text=Salam%2C%20sifari%C5%9Fl%C9%99%20ba%C4%9Fl%C4%B1%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #25d366, #128c7e)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.83rem",
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: "0.05em",
                  transition: "opacity 0.2s, transform 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
