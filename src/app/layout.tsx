import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { SiteChrome } from "@/components/site/site-chrome";
import "./globals.css";

// Self-hosted via next/font — the bundler strips remote @import url()
// from CSS, so the design system fonts are loaded here instead and
// exposed as CSS variables consumed by the Tailwind theme tokens.
// Load the same discrete static weights the reference requests from
// Google (`Inter:wght@300;400;500;600;700;800`) rather than the variable
// font, so non-standard weights (e.g. .nav-link's 450) resolve to the
// exact same cut the reference renders.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
