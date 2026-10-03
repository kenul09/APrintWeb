import { useEffect, useState } from "react";

export function useTypewriter(words, speed = 80, pause = 1800) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Guards: an empty list renders nothing, and switching to a list of a
  // different length (e.g. on language change) can't index past the end.
  const count = words.length;
  const index = count ? wordIdx % count : 0;
  const current = count ? words[index] : "";

  useEffect(() => {
    if (!count) return undefined;
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((value) => value + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((value) => value - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % count);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, count, current, deleting, pause, speed]);

  return current.slice(0, charIdx);
}
