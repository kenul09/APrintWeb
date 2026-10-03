"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import styles from "./CardDeck.module.css";

const HOLD_MS = 2400; // time a card stays on top
const MOVE_MS = 700; // must match the transition duration in the CSS
const OFFSET_PX = 14;
const ROTATE_DEG = 3;
const VISIBLE_CARDS = 3;

// Static photos from public/portfolio — the same files the homepage hero
// uses. The portfolio API isn't used here: its image files live on the
// backend and aren't reliably available (they 404 in local development).
// Texts (name/spec) come from i18n: about.deck.<key>.
const DECK_CARDS = [
  { key: "businessCard", src: "/portfolio/Ab8b38d0f0d1b48f78286655b1a0e1b25i.png" }, // Fusion Club
  { key: "rollup", src: "/portfolio/4c42233b-2f06-468c-b8c8-b1d6d8783487.png" }, // Star Kosmetoloji
  { key: "menu", src: "/portfolio/872aba5f-4a70-4725-ad73-85576ea36f3c.png" }, // Xəngəl Məngəl
  { key: "sticker", src: "/portfolio/4095ae57-3e5a-4451-8e9b-418c179f01f7.png" }, // Hilal Restoran
];

// Transform for a card at stack position `pos` (0 = top).
function stackStyle(pos, count) {
  return {
    transform: `translate(${pos * OFFSET_PX}px, ${-pos * OFFSET_PX}px) rotate(${pos * ROTATE_DEG}deg)`,
    opacity: pos < VISIBLE_CARDS ? 1 : 0,
    zIndex: count - pos,
  };
}

const EXIT_STYLE = {
  transform: "translate(-60px, 40px) rotate(-12deg)",
  opacity: 0,
};

// Decorative product deck for the About hero: every HOLD_MS the top card
// slides out while the rest move up, then it rejoins at the back.
//
// Pauses on mouse hover, while off-screen and while the tab is hidden.
// prefers-reduced-motion shows the static stack. aria-hidden, with no
// focusable content — the products are already described on the page.
export default function CardDeck() {
  const { t } = useI18n();
  const cards = DECK_CARDS;
  const count = cards.length;

  const ref = useRef(null);
  const [step, setStep] = useState(0); // completed rotations
  const [leaving, setLeaving] = useState(false); // top card is mid-exit
  const [canAnimate, setCanAnimate] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    const update = () => setCanAnimate(onScreen && !document.hidden && !motionQuery.matches);

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    motionQuery.addEventListener("change", update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  const running = canAnimate && !hovered && count > 1;

  useEffect(() => {
    // A started exit always finishes, even if the deck pauses meanwhile,
    // so it never freezes halfway.
    if (leaving) {
      const id = setTimeout(() => {
        setStep((s) => s + 1);
        setLeaving(false);
      }, MOVE_MS);
      return () => clearTimeout(id);
    }
    if (!running) return undefined;
    const id = setTimeout(() => setLeaving(true), HOLD_MS);
    return () => clearTimeout(id);
  }, [leaving, running, step]);

  return (
    <div
      ref={ref}
      className={styles.deck}
      aria-hidden="true"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => {
        const pos = (((i - step) % count) + count) % count;
        const style = leaving
          ? pos === 0
            ? { ...EXIT_STYLE, zIndex: count + 1 }
            : stackStyle(pos - 1, count)
          : stackStyle(pos, count);

        return (
          <div key={card.key} className={styles.card} style={style}>
            <div className={styles.top}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.arrow}>→</span>
            </div>
            <div className={styles.media}>
              {/* Decorative (the whole deck is aria-hidden), so empty alt. */}
              <Image
                src={card.src}
                alt=""
                fill
                loading={i === 0 ? "eager" : "lazy"}
                sizes="260px"
                className={styles.img}
              />
            </div>
            <div>
              <div className={styles.name}>{t(`about.deck.${card.key}.name`)}</div>
              <div className={styles.spec}>{t(`about.deck.${card.key}.spec`)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
