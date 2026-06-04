import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
