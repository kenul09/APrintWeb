"use client";

import styles from "./ThemeToggle.module.css";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useI18n } from "@/components/i18n/I18nProvider";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons/Icons";

const ICONS = { light: SunIcon, dark: MoonIcon, system: MonitorIcon };

// Cycles system → light → dark. The label states the current mode, so
// screen readers hear the result of each press.
export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const { t } = useI18n();
  const Icon = ICONS[theme];
  const label = t("common.theme.label", { mode: t(`common.theme.${theme}`) });

  return (
    <button type="button" className={styles.toggle} onClick={cycleTheme} aria-label={label} title={label}>
      <Icon />
    </button>
  );
}
