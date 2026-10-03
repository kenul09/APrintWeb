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
        padding: "110px 0 0",
      }}
    >
      <style>{`
        /* Cards in a row stretch to the same height (and so share their top
           edge); each card is a flex column whose footer link sits at the
           bottom via margin-top: auto. */
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 22px;
        }

        .group-card-cta {
          color: var(--color-accent);
          font-weight: 500;
          text-decoration: none;
          text-underline-offset: 4px;
        }

        .group-card-cta:hover,
        .group-card-cta:focus-visible {
          text-decoration: underline;
        }

        .group-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .group-item {
          position: relative;
          padding-left: 14px;
          color: var(--color-text);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .group-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
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

      <div className="container">
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto 56px",
            textAlign: "center",
            paddingTop: 120,
          }}
        >
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

        <PriceList title={t('products.priceListTitle')} />
      </div>
    </section>
  );
}
