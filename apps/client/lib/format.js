// Deterministic number/price formatting. Intl output for az-AZ differs
// between Node's ICU and browsers ("1,000" vs "1.000"), which breaks
// hydration in client components — so separators are fixed per language.
const SEPARATORS = {
  az: { group: ".", decimal: "," },
  ru: { group: " ", decimal: "," },
  en: { group: ",", decimal: "." },
};

export function formatNumber(value, lang, decimals = 0) {
  const { group, decimal } = SEPARATORS[lang] ?? SEPARATORS.az;
  const [int, frac] = Math.abs(value).toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, group);
  return `${value < 0 ? "-" : ""}${grouped}${frac ? decimal + frac : ""}`;
}

// AZN with the manat sign: "12,00 ₼" (az, ru) / "₼12.00" (en).
export function formatManat(value, lang) {
  const number = formatNumber(value, lang, 2);
  return lang === "en" ? `₼${number}` : `${number} ₼`;
}
