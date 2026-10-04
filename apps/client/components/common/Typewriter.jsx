"use client";

import { useEffect, useState } from "react";
import styles from "./Typewriter.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Types and deletes `words` in a loop. Isolated in its own component so only
// this span re-renders on each tick, not the page around it. The animated
// text is aria-hidden; screen readers get the full list once, statically.
// Under prefers-reduced-motion the first word is shown without animation.
export default function Typewriter({ words, label, speed = 80, pause = 1800 }) {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState({ word: 0, chars: 0, deleting: false });
  const count = words.length;
  const current = count ? words[state.word % count] : "";

  useEffect(() => {
    if (reduceMotion || !count) return undefined;
    const { chars, deleting } = state;
    let delay = speed;
    let next;
    if (!deleting && chars < current.length) next = { ...state, chars: chars + 1 };
    else if (!deleting) {
      delay = pause;
      next = { ...state, deleting: true };
    } else if (chars > 0) {
      delay = speed / 2;
      next = { ...state, chars: chars - 1 };
    } else next = { word: (state.word + 1) % count, chars: 0, deleting: false };
    const id = setTimeout(() => setState(next), delay);
    return () => clearTimeout(id);
  }, [state, current, count, reduceMotion, speed, pause]);

  return (
    <span className={styles.root}>
      <span className="sr-only">
        {label} {words.join(", ")}
      </span>
      <span aria-hidden="true">
        {reduceMotion ? words[0] : current.slice(0, state.chars)}
        {!reduceMotion && <span className={styles.cursor} />}
      </span>
    </span>
  );
}
