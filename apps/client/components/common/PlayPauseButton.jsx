import styles from "./PlayPauseButton.module.css";
import { PauseIcon, PlayIcon } from "@/components/icons/Icons";

// Round 44px pause/play toggle for autoplaying content (WCAG 2.2.2).
// Positioning/background come from `className`.
export default function PlayPauseButton({ paused, onToggle, playLabel, pauseLabel, className = "" }) {
  const label = paused ? playLabel : pauseLabel;
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
    >
      {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
    </button>
  );
}
