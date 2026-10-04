"use client";

import Link from "next/link";
import { useId, useState } from "react";
import styles from "./PriceCalculator.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { estimatePrice, priceTable } from "@/data/priceTable";
import { formatManat, formatNumber } from "@/lib/format";
import { ArrowRightIcon } from "@/components/icons/Icons";

const PRODUCTS = Object.keys(priceTable);

function defaultsFor(product) {
  const entry = priceTable[product];
  return {
    product,
    size: Object.keys(entry.sizes)[0],
    paper: Object.keys(entry.papers)[0],
    quantity: entry.quantities[1] ?? entry.quantities[0],
  };
}

// product × size × material × quantity → estimated price, from
// data/priceTable.js. The result is announced politely as it changes.
export default function PriceCalculator({ initialProduct = PRODUCTS[0], serviceSlug }) {
  const { t, lang, href } = useI18n();
  const id = useId();
  const [state, setState] = useState(() => defaultsFor(PRODUCTS.includes(initialProduct) ? initialProduct : PRODUCTS[0]));
  const entry = priceTable[state.product];
  const result = estimatePrice(state);
  const contactHref = `${href("/contact")}${serviceSlug ? `?service=${serviceSlug}` : ""}`;

  const select = (key, options, labelKey) => (
    <div className={styles.field}>
      <label htmlFor={`${id}-${key}`} className={styles.label}>
        {t(`calculator.${key}`)}
      </label>
      <select
        id={`${id}-${key}`}
        className={styles.select}
        value={state[key]}
        onChange={(e) =>
          setState(key === "product" ? defaultsFor(e.target.value) : { ...state, [key]: key === "quantity" ? Number(e.target.value) : e.target.value })
        }
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {labelKey ? t(`${labelKey}.${value}`) : `${formatNumber(value, lang)} ${t("calculator.quantityUnit")}`}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={styles.calculator}>
      <form className={styles.fields} onSubmit={(e) => e.preventDefault()}>
        {select("product", PRODUCTS, "calculator.products")}
        {select("size", Object.keys(entry.sizes), "calculator.sizes")}
        {select("paper", Object.keys(entry.papers), "calculator.papers")}
        {select("quantity", entry.quantities)}
      </form>

      <div className={styles.result}>
        <p className={styles.resultLabel}>{t("calculator.estimate")}</p>
        <output className={styles.total} aria-live="polite" htmlFor={`${id}-product ${id}-size ${id}-paper ${id}-quantity`}>
          ≈ {formatManat(result.total, lang)}
        </output>
        <p className={styles.unit}>{t("calculator.perUnit", { price: formatManat(result.unit, lang) })}</p>
        <p className={styles.note}>{t("calculator.note")}</p>
        <Link href={contactHref} className="btn-primary">
          {t("calculator.cta")}
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </div>
  );
}
