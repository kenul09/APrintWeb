import { useEffect, useState } from "react";

export function useTypewriter(words, speed = 80, pause = 1800) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
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
        setWordIdx((index) => (index + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, pause, speed, wordIdx, words]);

  return words[wordIdx].slice(0, charIdx);
}
