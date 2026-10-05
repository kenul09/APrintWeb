"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./PriceCalculator.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { estimatePrice, priceTable } from "@/data/priceTable";
import { formatManat, formatNumber } from "@/lib/format";
import { ArrowRightIcon } from "@/components/icons/Icons";

const PRODUCTS = Object.keys(priceTable);
const TWEEN_MS = 450;

function defaultsFor(product) {
  const entry = priceTable[product];
  return {
    product,
    size: Object.keys(entry.sizes)[0],
    paper: Object.keys(entry.papers)[0],
    quantity: entry.quantities[1] ?? entry.quantities[0],
  };
}

// Eases the displayed number from its previous value to `value` with rAF.
// Instant under prefers-reduced-motion. The first render shows the value
// directly (server HTML = client HTML).
function useTweenedNumber(value) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;
    if (from === value) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(id);
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / TWEEN_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (value - from) * eased;
      fromRef.current = next;
      setShown(next);
      if (p < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return shown;
}

// product × size × material × quantity → estimated price, from
// data/priceTable.js. Left: product and quantity as pills (native radios,
// so arrow keys and screen readers work), size and material as selects.
// Right: a quiet result panel, sticky on wide screens.
export default function PriceCalculator({ initialProduct = PRODUCTS[0], serviceSlug }) {
  const { t, lang, href } = useI18n();
  const id = useId();
  const [state, setState] = useState(() => defaultsFor(PRODUCTS.includes(initialProduct) ? initialProduct : PRODUCTS[0]));
  const entry = priceTable[state.product];
  const result = estimatePrice(state);
  const shownTotal = useTweenedNumber(result.total);
  const contactHref = `${href("/contact")}${serviceSlug ? `?service=${serviceSlug}` : ""}`;

  const update = (key, value) =>
    setState(key === "product" ? defaultsFor(value) : { ...state, [key]: key === "quantity" ? Number(value) : value });
  const quantityLabel = (q) => `${formatNumber(q, lang)} ${t("calculator.quantityUnit")}`;
  const summary = [
    t(`calculator.products.${state.product}`),
    t(`calculator.sizes.${state.size}`),
    t(`calculator.papers.${state.paper}`),
    quantityLabel(state.quantity),
  ].join(" · ");

  const pills = (key, options, label) => (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{t(`calculator.${key}`)}</legend>
      <div className={styles.pills}>
        {options.map((value) => (
          <label key={value} className={styles.pill}>
            <input
              type="radio"
              name={`${id}-${key}`}
              value={value}
              checked={state[key] === value}
              onChange={() => update(key, value)}
              className={styles.radio}
            />
            <span>{label(value)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const select = (key, options, labelKey) => (
    <div className={styles.field}>
      <label htmlFor={`${id}-${key}`} className={styles.label}>
        {t(`calculator.${key}`)}
      </label>
      <select id={`${id}-${key}`} className={styles.select} value={state[key]} onChange={(e) => update(key, e.target.value)}>
        {options.map((value) => (
          <option key={value} value={value}>
            {t(`${labelKey}.${value}`)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={styles.calculator}>
      <div className={styles.layout}>
        <form className={styles.options} onSubmit={(e) => e.preventDefault()}>
          {pills("product", PRODUCTS, (p) => t(`calculator.products.${p}`))}
          <div className={styles.selects}>
            {select("size", Object.keys(entry.sizes), "calculator.sizes")}
            {select("paper", Object.keys(entry.papers), "calculator.papers")}
          </div>
          {pills("quantity", entry.quantities, quantityLabel)}
        </form>

        <aside className={styles.result} aria-labelledby={`${id}-estimate`}>
          <p id={`${id}-estimate`} className={styles.resultLabel}>
            {t("calculator.estimate")}
          </p>
          {/* Animated figure is visual only; the live region below announces
              the final value once per change. */}
          <p className={styles.total} aria-hidden="true">
            ≈ {formatManat(shownTotal, lang)}
          </p>
          <p className="sr-only" aria-live="polite">
            {t("calculator.liveEstimate", { price: formatManat(result.total, lang) })}
          </p>
          <p className={styles.unit}>{t("calculator.perUnit", { price: formatManat(result.unit, lang) })}</p>
          <p className={styles.summary}>
            <span className="sr-only">{t("calculator.summaryLabel")}: </span>
            {summary}
          </p>
          <Link href={contactHref} className={`btn-primary ${styles.cta}`}>
            {t("calculator.cta")}
            <ArrowRightIcon size={18} />
          </Link>
          <p className={styles.note}>{t("calculator.note")}</p>
        </aside>
      </div>
    </div>
  );
}
