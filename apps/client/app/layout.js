import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import "./globals.css";
import SiteFooter from '@/components/layout/SiteFooter';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Runs before hydration to set data-theme on <html> from the saved
// preference (or system preference) so the page never flashes the wrong
// theme on first paint. Kept in sync with apps/client/lib/themeStore.js.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "A Print | Printing & Branding",
  description: "Professional print and branding solutions for businesses in Azerbaijan.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="app-shell">
        {/* Plain server-rendered <script>, not next/script — this must be
            literal static HTML executed by the browser's parser before
            React hydrates, not a client-managed/RSC-serialized node. */}
        <script
          id="theme-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <I18nProvider>
            <SiteHeader />
            <main className="page-shell">{children}</main>
            <SiteFooter />
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
