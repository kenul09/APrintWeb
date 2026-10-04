"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PartnersMarquee.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { partners } from "@/data/partners";
import { optimizedSrc } from "@/lib/images";
import { PauseIcon, PlayIcon } from "@/components/icons/Icons";

function LogoList({ duplicate = false, t }) {
  return (
    <ul className={styles.list} aria-hidden={duplicate ? "true" : undefined}>
      {partners.map((partner) => (
        <li key={partner.name} className={styles.item}>
          <span className={styles.logoWrap}>
            <Image
              src={optimizedSrc(partner.logo)}
              alt={duplicate ? "" : t("partners.logoAlt", { name: partner.name })}
              fill
              sizes="(max-width: 640px) 80px, 128px"
              className={styles.logo}
            />
          </span>
          <span className={styles.name}>{partner.name}</span>
        </li>
      ))}
    </ul>
  );
}

// Infinite logo strip. The second copy exists only for the seamless loop,
// so it is hidden from assistive tech. A pause button satisfies WCAG 2.2.2;
// under prefers-reduced-motion the strip doesn't move at all and wraps.
export default function PartnersMarquee() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.root} data-paused={paused || undefined}>
      <div className={styles.shell}>
        <div className={styles.track}>
          <LogoList t={t} />
          <LogoList t={t} duplicate />
        </div>
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? t("common.playAnimation") : t("common.pauseAnimation")}
        title={paused ? t("common.playAnimation") : t("common.pauseAnimation")}
      >
        {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
      </button>
    </div>
  );
}
