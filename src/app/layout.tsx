import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/site/site-chrome";
import "./globals.css";

// Self-hosted via next/font — the bundler strips remote @import url()
// from CSS, so the design system fonts are loaded here instead and
// exposed as CSS variables consumed by the Tailwind theme tokens.
// Graphik replaces Inter as the sans family. Its heavy cuts read heavier
// than Inter's at the same numeric weight, so the top of the ramp is
// mapped one cut lighter than its name — `font-semibold` (600) gets
// Medium, `font-bold` (700) gets Semibold — keeping the design system's
// weight values untouched while pulling the density back toward Inter.
// Non-standard weights (e.g. .nav-link's 450) round to the nearest cut
// per CSS font matching. `adjustFontFallback` uses Arial's metrics to
// size the fallback face, since next/font can't infer metrics for a
// local family.
const graphik = localFont({
  src: [
    { path: "./fonts/Graphik-Light-Trial.otf", weight: "300", style: "normal" },
    { path: "./fonts/Graphik-Regular-Trial.otf", weight: "400", style: "normal" },
    { path: "./fonts/Graphik-Medium-Trial.otf", weight: "500", style: "normal" },
    { path: "./fonts/Graphik-Medium-Trial.otf", weight: "600", style: "normal" },
    { path: "./fonts/Graphik-Semibold-Trial.otf", weight: "700", style: "normal" },
    { path: "./fonts/Graphik-Bold-Trial.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-graphik",
  display: "swap",
  adjustFontFallback: "Arial",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Include the optical-size axis so large display text (e.g. the pull
  // quote) renders Newsreader's taller, higher-contrast letterforms —
  // matching the reference. font-optical-sizing: auto (browser default)
  // maps font-size onto this axis.
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noetic",
  description: "A Next.js + Sanity + Tailwind CSS starter.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${graphik.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
        {modal}
      </body>
    </html>
  );
}
