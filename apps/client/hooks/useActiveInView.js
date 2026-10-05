import { useEffect, useState } from "react";

// true while the element is on screen AND the tab is visible — the
// condition under which decorative animations (rotating word, card deck,
// hero slideshow) should run. `initial` is the value before the first
// IntersectionObserver callback.
export function useActiveInView(ref, { threshold = 0, initial = false } = {}) {
  const [onScreen, setOnScreen] = useState(initial);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold });
    observer.observe(node);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref, threshold]);

  return onScreen && !tabHidden;
}
