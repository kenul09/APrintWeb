"use client";

import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./HeroCollage.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PauseIcon, PlayIcon } from "@/components/icons/Icons";

const VALUE_PATTERN = /^(\d+)(.*)$/;
const PARALLAX_EASE = 0.12;
const COUNT_MS = 1400;
// Count up only if hydration happens soon after load; later, the visitor has
// already read the final number and a reset to 0 would look like a glitch.
const COUNT_UP_WINDOW_MS = 2500;
const PARTS_PER_SLIDE = 2; // main + small image

// Slide state in a reducer, so image-load callbacks that resolve later never
// act on a stale index/pending value.
function slideReducer(state, action) {
  const show = (s, i) => (i === s.index ? { ...s, pending: null } : { ...s, prev: s.index, index: i, pending: null });
  switch (action.type) {
    case "goto": {
      const next = { ...state, mountedUpTo: Math.max(state.mountedUpTo, action.index) };
      return state.ready.has(action.index) ? show(next, action.index) : { ...next, pending: action.index };
    }
    case "mount":
      return { ...state, mountedUpTo: Math.max(state.mountedUpTo, action.upTo) };
    case "loaded": {
      const { index: i, part, count } = action;
      const parts = new Set(state.parts[i]).add(part);
      let next = { ...state, parts: { ...state.parts, [i]: parts } };
      if (parts.size < PARTS_PER_SLIDE || state.ready.has(i)) return next;
      next = { ...next, ready: new Set(state.ready).add(i) };
      // Chain: once this slide is ready, start loading the next one.
      if (i === next.mountedUpTo && i < count - 1) next.mountedUpTo = i + 1;
      return next.pending === i ? show(next, i) : next;
    }
    default:
      return state;
  }
}

const INITIAL_SLIDES = { index: 0, prev: null, pending: null, mountedUpTo: 0, ready: new Set([0]), parts: {} };

// "Living collage" hero visual: rotating featured works (crossfade + Ken
// Burns, CSS), pointer parallax (pointer: fine), scroll-driven exit (CSS),
// count-up stat card and slide controls.
//
// Timing lives in CSS: the active progress bar's fill animation is the
// slide clock and its `animationend` advances the slide. Pausing (hover,
// focus, offscreen, hidden tab, pause button) pauses the CSS animations via
// data-paused, so the remaining time is kept without JS timers.
//
// The first slide is server-rendered and visible immediately (LCP). Other
// slides mount one at a time after the page is idle, at low priority, and a
// slide is only shown once its images have loaded and decoded.
export default function HeroCollage({ slides, stat }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const count = slides.length;
  const autoplay = count > 1 && !reduceMotion;

  const [{ index, prev, mountedUpTo }, dispatch] = useReducer(slideReducer, INITIAL_SLIDES);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  const rootRef = useRef(null);
  const visualRef = useRef(null);
  const running = autoplay && !userPaused && !hovered && !focused && onScreen && !tabHidden;

  const goTo = (i) => dispatch({ type: "goto", index: i });
  // Decode before the slide can be shown, so the crossfade never reveals a
  // half-painted image.
  const onPartLoad = (i, part) => (e) =>
    e.currentTarget
      .decode()
      .catch(() => {})
      .then(() => dispatch({ type: "loaded", index: i, part, count }));

  // After the page is idle, mount slide 2 (which then loads 3, …).
  useEffect(() => {
    if (count < 2) return undefined;
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    let id;
    const start = () => (id = idle(() => dispatch({ type: "mount", upTo: 1 })));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (id) cancel(id);
    };
  }, [count]);

  // Pause while offscreen or while the tab is hidden.
  useEffect(() => {
    const node = rootRef.current;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Pointer parallax — fine pointers only, eased with rAF. Writes two CSS
  // variables on the visual; the layers turn them into transforms.
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      current.x = settled ? target.x : current.x + (target.x - current.x) * PARALLAX_EASE;
      current.y = settled ? target.y : current.y + (target.y - current.y) * PARALLAX_EASE;
      visual.style.setProperty("--px", current.x.toFixed(4));
      visual.style.setProperty("--py", current.y.toFixed(4));
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      const rect = visual.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    visual.addEventListener("pointermove", onMove);
    visual.addEventListener("pointerleave", onLeave);
    return () => {
      visual.removeEventListener("pointermove", onMove);
      visual.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-paused={running ? undefined : ""}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        ref={visualRef}
        className={styles.visual}
        role="group"
        aria-roledescription="carousel"
        aria-label={t("hero.collage.label")}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div className={`${styles.layer} ${styles.mainLayer}`}>
          <div className={styles.depth}>
            <div className={styles.main}>
              {slides.map((slide, i) => {
                if (i > mountedUpTo && i !== index) return null;
                const active = i === index;
                return (
                  <div
                    key={slide.id}
                    className={styles.slide}
                    data-active={active ? "" : undefined}
                    data-prev={i === prev ? "" : undefined}
                    aria-hidden={active ? undefined : "true"}
                    inert={!active}
                  >
                    <div className={styles.kenburns}>
                      <Image
                        src={slide.main.src}
                        alt={slide.main.alt}
                        fill
                        preload={i === 0}
                        fetchPriority={i === 0 ? "high" : "low"}
                        loading={i === 0 ? "eager" : "lazy"}
                        sizes="(min-width: 1024px) 400px, 72vw"
                        className={styles.img}
                        onLoad={i === 0 ? undefined : onPartLoad(i, "main")}
                      />
                    </div>
                    {slide.caption && <p className={styles.caption}>{slide.caption}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative: the same client's business card. */}
        <div className={`${styles.layer} ${styles.smallLayer}`} aria-hidden="true">
          <div className={styles.depth}>
            <div className={styles.small}>
              {slides.map((slide, i) => {
                if (i > mountedUpTo && i !== index) return null;
                return (
                  <div key={slide.id} className={styles.slide} data-active={i === index ? "" : undefined} data-prev={i === prev ? "" : undefined}>
                    <Image
                      src={slide.small.src}
                      alt=""
                      fill
                      fetchPriority="low"
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 240px, 44vw"
                      className={styles.img}
                      onLoad={i === 0 ? undefined : onPartLoad(i, "small")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`${styles.layer} ${styles.statLayer}`}>
          <div className={styles.depth}>
            <StatCard value={stat.value} label={stat.label} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <div className={styles.dots}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={styles.dot}
                aria-label={t("hero.collage.goTo", { n: i + 1, caption: slide.caption ?? slide.main.alt })}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
              >
                <span className={styles.bar}>
                  <span
                    className={styles.fill}
                    data-run={autoplay && i === index ? "" : undefined}
                    onAnimationEnd={() => goTo((index + 1) % count)}
                  />
                </span>
              </button>
            ))}
          </div>
          {autoplay && (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              aria-label={userPaused ? t("hero.collage.play") : t("hero.collage.pause")}
              title={userPaused ? t("hero.collage.play") : t("hero.collage.pause")}
            >
              {userPaused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// "2000+ happy customers". Counts up once when first seen (shortly after
// load), then floats gently (CSS). Screen readers get the final value only.
function StatCard({ value, label, reduceMotion }) {
  const ref = useRef(null);
  const match = String(value).match(VALUE_PATTERN);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node || !target || reduceMotion || performance.now() > COUNT_UP_WINDOW_MS) return undefined;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / COUNT_MS, 1);
        setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, reduceMotion]);

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statNum} aria-hidden="true">
        {match ? `${shown}${suffix}` : value}
      </div>
      <div className={styles.statLabel} aria-hidden="true">
        {label}
      </div>
      <span className="sr-only">
        {value} {label}
      </span>
    </div>
  );
}
