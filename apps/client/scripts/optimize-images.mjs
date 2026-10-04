// Converts public/portfolio and public/logos to AVIF + WebP (max 1600px).
// Partner logos — round badges on a white square — are trimmed and given a
// circular alpha mask so they sit on any background in both themes.
//
//   npm run images
//
// Writes <dir>/optimized/<name>.{avif,webp} and data/imageManifest.json,
// which lib/images.js uses to swap original paths for the optimized ones.
// Originals stay in place: portfolio records in the backend reference them.
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const MAX_SIZE = 1600;
const LOGO_SIZE = 480;
const SOURCE = /\.(png|jpe?g)$/i;
// The site logo is rendered as an SVG component (components/brand/Logo.jsx).
const SKIP = new Set(["aprint-logo.png"]);

async function sources(dir) {
  const files = await readdir(path.join(PUBLIC, dir));
  return files.filter((f) => SOURCE.test(f) && !SKIP.has(f)).sort();
}

function circleMask(size) {
  const r = size / 2;
  return Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - 1}" fill="#fff"/></svg>`);
}

async function prepareLogo(file) {
  // Trim the near-white margin, square the result, then cut out the badge.
  const trimmed = await sharp(file).trim({ background: "#ffffff", threshold: 18 }).toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  const side = Math.min(width, height, LOGO_SIZE);
  const square = await sharp(trimmed).resize(side, side, { fit: "cover" }).ensureAlpha().toBuffer();
  return sharp(square).composite([{ input: circleMask(side), blend: "dest-in" }]);
}

async function convert(dir, { logo = false } = {}) {
  const outDir = path.join(PUBLIC, dir, "optimized");
  await mkdir(outDir, { recursive: true });
  const entries = {};

  for (const name of await sources(dir)) {
    const input = path.join(PUBLIC, dir, name);
    const base = name.replace(SOURCE, "");
    const pipeline = logo
      ? await prepareLogo(input)
      : sharp(input).rotate().resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true });
    const buffer = await pipeline.png().toBuffer();
    const { width, height } = await sharp(buffer).metadata();

    await Promise.all([
      sharp(buffer).avif({ quality: logo ? 60 : 55, effort: 6 }).toFile(path.join(outDir, `${base}.avif`)),
      sharp(buffer).webp({ quality: logo ? 85 : 78, alphaQuality: 90, effort: 6 }).toFile(path.join(outDir, `${base}.webp`)),
    ]);

    entries[`/${dir}/${name}`] = {
      webp: `/${dir}/optimized/${base}.webp`,
      avif: `/${dir}/optimized/${base}.avif`,
      width,
      height,
    };
    console.log(`✓ ${dir}/${name} → ${width}×${height}`);
  }
  return entries;
}

const manifest = {
  ...(await convert("portfolio")),
  ...(await convert("logos", { logo: true })),
};
await writeFile(path.join(ROOT, "data", "imageManifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nWrote data/imageManifest.json (${Object.keys(manifest).length} images)`);
