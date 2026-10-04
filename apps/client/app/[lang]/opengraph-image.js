import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslator } from "@/i18n/getDictionary";
import { locales } from "@/i18n/config";
import { LOGO_PATH } from "@/components/brand/Logo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A Print";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Inter 600 subsets (OFL, assets/og/LICENSE-Inter.txt): latin-ext covers
// Azerbaijani letters, cyrillic covers Russian.
const fontFiles = ["latin", "latin-ext", "cyrillic"].map((subset) =>
  readFile(join(process.cwd(), `assets/og/inter-${subset}-600-normal.woff`))
);

// Shared social preview for every page of a language: dark ink background,
// logo, the localized tagline and the green accent.
export default async function OpenGraphImage({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  const fonts = (await Promise.all(fontFiles)).map((data) => ({ name: "Inter", data, weight: 600, style: "normal" }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#ededea",
          fontFamily: "Inter",
        }}
      >
        <svg width="360" height="100" viewBox="0 0 1929 534" fill="#ededea">
          <path fillRule="evenodd" d={LOGO_PATH} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{t("meta.ogTagline")}</div>
          <div style={{ width: 120, height: 8, borderRadius: 8, background: "#6bcb95" }} />
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
