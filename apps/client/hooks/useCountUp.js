import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Counts from 0 to `target` the first time the element scrolls into view.
// The server (and no-JS) render shows the final value. Nothing animates if
// the element is already on screen at load (no flash from target to 0) or
// if the visitor prefers reduced motion.
export function useCountUp(target, { enabled = true, duration = 1500 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame;
    let armed = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!armed) {
        armed = true;
        if (entry.isIntersecting) {
          observer.disconnect();
          return;
        }
        setValue(0); // off-screen, so the reset is never seen
        return;
      }
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(target * easeOutCubic(progress));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, enabled, duration]);

  return [ref, value];
}
