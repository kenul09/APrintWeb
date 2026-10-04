// Price table for the calculator on /products. Kept as plain data so it can
// later be served by the API with the same shape.
//
// TODO(A Print): ILLUSTRATIVE VALUES — replace with the real price list
// before launch. The UI labels the result as an estimate.
//
// estimate = unitPrice(quantity tier) × size factor × material factor × quantity
// Labels for products / sizes / materials are in the dictionaries under
// calculator.products / calculator.sizes / calculator.papers.
export const CURRENCY = "AZN";

export const priceTable = {
  businessCard: {
    sizes: { standard: 1 },
    papers: { matte300: 1, gloss300: 1.05, designer350: 1.6 },
    quantities: [50, 100, 250, 500, 1000],
    tiers: [
      { min: 50, unit: 0.16 },
      { min: 100, unit: 0.12 },
      { min: 250, unit: 0.09 },
      { min: 500, unit: 0.07 },
      { min: 1000, unit: 0.05 },
    ],
  },
  flyer: {
    sizes: { a6: 0.6, a5: 1, a4: 1.8 },
    papers: { gloss130: 1, gloss170: 1.15, matte170: 1.2 },
    quantities: [100, 250, 500, 1000, 2500],
    tiers: [
      { min: 100, unit: 0.3 },
      { min: 250, unit: 0.22 },
      { min: 500, unit: 0.16 },
      { min: 1000, unit: 0.12 },
      { min: 2500, unit: 0.09 },
    ],
  },
  booklet: {
    sizes: { a5: 1, a4: 1.7 },
    papers: { gloss130: 1, gloss170: 1.15, matte170: 1.2 },
    quantities: [50, 100, 250, 500, 1000],
    tiers: [
      { min: 50, unit: 1.2 },
      { min: 100, unit: 0.95 },
      { min: 250, unit: 0.75 },
      { min: 500, unit: 0.6 },
      { min: 1000, unit: 0.48 },
    ],
  },
  sticker: {
    sizes: { s5: 1, s10: 2.6 },
    papers: { paperSticker: 1, vinylGloss: 1.4, vinylMatte: 1.5 },
    quantities: [100, 250, 500, 1000, 2500],
    tiers: [
      { min: 100, unit: 0.25 },
      { min: 250, unit: 0.18 },
      { min: 500, unit: 0.13 },
      { min: 1000, unit: 0.1 },
      { min: 2500, unit: 0.07 },
    ],
  },
  rollup: {
    sizes: { r85: 1, r100: 1.15, r120: 1.35 },
    papers: { standard: 1, premium: 1.5 },
    quantities: [1, 2, 5, 10],
    tiers: [
      { min: 1, unit: 55 },
      { min: 2, unit: 50 },
      { min: 5, unit: 45 },
      { min: 10, unit: 40 },
    ],
  },
};

export function estimatePrice({ product, size, paper, quantity }) {
  const entry = priceTable[product];
  if (!entry) return null;
  const tier = [...entry.tiers].reverse().find((t) => quantity >= t.min) ?? entry.tiers[0];
  const unit = tier.unit * (entry.sizes[size] ?? 1) * (entry.papers[paper] ?? 1);
  return { unit, total: unit * quantity };
}
