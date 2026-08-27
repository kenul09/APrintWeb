"use client";

import { categoryGroups } from "@/data/products";
import GroupCard from "@/components/products/GroupCard";
import PriceList from "@/components/products/PriceList";
import { useI18n } from '@/components/i18n/I18nProvider';
export default function CategoriesCatalog() {
  const { t } = useI18n();
  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(139,92,246,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(236,72,153,0.10), transparent 24%), var(--background)",
        color: "var(--foreground)",
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
              background: "rgba(var(--ink-rgb),0.06)",
              color: "rgba(var(--ink-rgb),0.6)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
            >
            {t('products.badge')}
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
            {t('products.title')}
          </h1>

          <p
            style={{
              margin: 0,
              color: "rgba(var(--ink-rgb),0.58)",
              fontSize: "1rem",
              lineHeight: 1.9,
              maxWidth: 760,
            }}
          >
            {t('products.intro')}
          </p>
        </div>

        <div className="catalog-grid">
          {categoryGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <h2
            style={{
              margin: "0 0 22px",
              fontFamily: '"Oswald", sans-serif',
              fontSize: "1.6rem",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            {t('products.priceListTitle')}
          </h2>
          <PriceList />
        </div>
      </div>
    </section>
  );
}
