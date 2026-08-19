import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import "./globals.css";
import SiteFooter from '@/components/layout/SiteFooter';

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
    >
      <body className="app-shell">
        <SiteHeader />
        <main className="page-shell">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
