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
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "110px 24px 90px",
      }}
    >
      <style>{`
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
              background: "var(--color-accent-soft)",
              color: "var(--color-accent)",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
            >
            {t('products.badge')}
          </div>

          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
            }}
          >
            {t('products.title')}
          </h1>

          <p
            style={{
              margin: 0,
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              lineHeight: 1.6,
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
              fontSize: "1.6rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
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
