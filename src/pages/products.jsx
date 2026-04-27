import { useState } from "react";

const categoryGroups = [
  {
    id: 1,
    title: "Mətbəə",
    accent: "#8b5cf6",
    subtitle: "Gündəlik və korporativ çap məhsulları",
    items: [
      "Vizit kartlar",
      "Flayerlər",
      "Bukletlər",
      "Zərflər",
      "Açıqcalar",
      "Firma blankları",
      "Qovluqlar",
      "Qutular",
      "Etiketlər",
      "Təqvimlər",
      "Kataloqlar",
      "Sertifikatlar",
    ],
  },
  {
    id: 2,
    title: "Promo",
    accent: "#ec4899",
    subtitle: "Brendli hədiyyə və promo məhsullar",
    items: [
      "Qələm",
      "Fincan",
      "Powerbank",
      "Termos",
      "Yaddaş kartı",
      "Açarlıq",
      "Maqnitlər",
      "Saatlar",
      "Rozetlər",
      "Tekstil məhsulları",
      "Çantalar",
      "Kart qabları",
    ],
  },
  {
    id: 3,
    title: "Reklam",
    accent: "#f97316",
    subtitle: "Daxili və açıq hava reklam həlləri",
    items: [
      "Bannerlər",
      "Roll-up",
      "Vinillər",
      "Posterlər",
      "Plakatlar",
      "Reklam lövhələri",
      "Məlumat lövhələri",
      "Stendlər",
      "Yaxa kartı və lentlər",
      "Masaüstü reklamlar",
      "Reklam stikerləri",
      "Köynəklər",
    ],
  },
  {
    id: 4,
    title: "Kataloq",
    accent: "#3b82f6",
    subtitle: "Təqdimat və tanıtım materialları",
    items: [
      "Məhsul kataloqları",
      "Qiymət kataloqları",
      "Brend bukletləri",
      "Təqdimat qovluqları",
      "Menyu çapı",
      "Broşürlər",
      "Kitabçalar",
      "Dəvətnamələr",
      "Afişalar",
      "Təlim materialları",
      "Portfel qovluqları",
      "Ofis sənədləri",
    ],
  },
];

function GroupCard({ group }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 30,
        padding: 30,
        minHeight: 390,
        overflow: "hidden",
        background: hovered
          ? `linear-gradient(180deg, ${group.accent}18, rgba(255,255,255,0.04))`
          : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
        border: `1px solid ${hovered ? `${group.accent}66` : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 28px 70px ${group.accent}20`
          : "0 14px 34px rgba(0,0,0,0.22)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.32s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -40,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${group.accent}35, transparent 70%)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 22,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            display: "grid",
            placeItems: "center",
            background: `${group.accent}18`,
            color: group.accent,
            fontWeight: 700,
            fontSize: "1rem",
            border: `1px solid ${group.accent}44`,
            boxShadow: `0 10px 24px ${group.accent}18`,
            flexShrink: 0,
          }}
        >
          {String(group.id).padStart(2, "0")}
        </div>

        <div
          style={{
            padding: "7px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {group.items.length} istiqamət
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            margin: "0 0 10px",
            fontFamily: '"Oswald", sans-serif',
            fontSize: "2rem",
            fontWeight: 500,
            lineHeight: 1.02,
            color: "#fff",
          }}
        >
          {group.title}
        </h2>

        <p
          style={{
            margin: "0 0 22px",
            color: "rgba(255,255,255,0.56)",
            fontSize: "0.94rem",
            lineHeight: 1.75,
            maxWidth: 320,
          }}
        >
          {group.subtitle}
        </p>

        <div className="group-items-grid">
          {group.items.map((item) => (
            <div
              key={item}
              style={{
                padding: "10px 12px",
                borderRadius: 14,
                background: hovered
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.74)",
                fontSize: "0.92rem",
                lineHeight: 1.45,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.borderColor = `${group.accent}55`;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = `${group.accent}14`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "rgba(255,255,255,0.74)";
                e.currentTarget.style.background = hovered
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.025)";
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CategoriesCatalog() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(139,92,246,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(236,72,153,0.10), transparent 24%), #060608",
        color: "#fff",
        padding: "110px 24px 90px",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .group-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 12px;
        }

        @media (max-width: 980px) {
          .catalog-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .group-items-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto 56px",
            textAlign: "center",
            paddingTop: 120,
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginBottom: 16,
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            İşlərimiz
          </div>

          <h1
            style={{
              margin: "0 0 16px",
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(3.4rem, 7vw, 6.2rem)",
              lineHeight: 0.92,
              fontWeight: 500,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio
          </h1>

          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.58)",
              fontSize: "1rem",
              lineHeight: 1.9,
              maxWidth: 760,
            }}
          >
            Müştərilərimiz üçün hazırladığımız vizit kart, flayer, menu, banner və digər
            çap işlərindən seçilmiş nümunələri burada təqdim edirik.
          </p>
        </div>

        <div className="catalog-grid">
          {categoryGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
