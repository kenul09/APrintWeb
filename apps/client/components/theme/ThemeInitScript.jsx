"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { applyCurrentTheme, themeInitScript } from "@/lib/themeStore";

const noopSubscribe = () => () => {};

// Applies the saved theme before first paint. The inline <script> is part of
// the server HTML, so the browser runs it while parsing, before anything is
// painted. That is why this is not next/script: with strategy="beforeInteractive"
// the App Router only queues inline code and runs it after its runtime loads
// (measured ~120 ms after first paint, i.e. a theme flash).
//
// React warns ("Encountered a script tag…") whenever it has to create a
// <script> element on the client, where it would never run anyway. So the
// script is rendered only from the server HTML: during hydration (server
// snapshot = true) React reuses the existing node; any client-side render
// (snapshot = false) renders nothing. When the page was rendered entirely on
// the client (e.g. dev-mode 404s), the layout effect applies the theme
// instead, still before that render is painted.
export default function ThemeInitScript() {
  const fromServerHtml = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => true,
  );
  useLayoutEffect(applyCurrentTheme, []);
  if (!fromServerHtml) return null;
  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
