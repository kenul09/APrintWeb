"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RotatingWord.module.css";
import { useActiveInView } from "@/hooks/useActiveInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Cycles through `words`, rendering each as `${word}${after}` with the word
// styled by `wordClassName`. Keeping the trailing text inside the slot means
// the reserved (longest-variant) width falls at the end of the line, so
// shorter words don't leave a visible gap mid-sentence.
//
// - No layout shift: every variant is stacked in one grid cell.
// - Pauses while off-screen or while the tab is hidden.
// - prefers-reduced-motion: stays on the first word, no rotation.
// - aria-hidden: the parent must provide a static screen-reader text.
export default function RotatingWord({ words, after = "", wordClassName = "", interval = 2600 }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const active = useActiveInView(ref);
  const reduceMotion = useReducedMotion();
  const running = active && !reduceMotion;

  useEffect(() => {
    if (!running || words.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [running, words.length, interval]);

  const current = words.length ? index % words.length : 0;

  return (
    <span ref={ref} className={styles.slot} aria-hidden="true">
      {words.map((word, i) => (
        <span key={word} className={`${styles.item} ${i === current ? styles.active : ""}`}>
          <span className={wordClassName}>{word}</span>
          {after}
        </span>
      ))}
    </span>
  );
}
