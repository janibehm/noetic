import { createElement, type ReactNode } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function getHeadingLevel(level: string | undefined, fallback: HeadingLevel): HeadingLevel {
  return level === "h1" ||
    level === "h2" ||
    level === "h3" ||
    level === "h4" ||
    level === "h5" ||
    level === "h6"
    ? level
    : fallback;
}

export const headingLevelStyles = {
  h1: "text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.96] tracking-[-0.045em] font-bold text-balance",
  h2: "text-[clamp(2rem,4.4vw,3.6rem)] leading-[0.98] tracking-[-0.04em] font-bold text-balance",
  h3: "text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.03em] font-bold text-balance",
  h4: "text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.08] tracking-[-0.02em] font-semibold text-balance",
  h5: "text-[clamp(1.15rem,1.7vw,1.55rem)] leading-[1.15] tracking-[-0.01em] font-semibold text-balance",
  h6: "text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.3] tracking-[0.08em] font-semibold uppercase",
} as const;

export function renderHeading(level: HeadingLevel, className: string, children: ReactNode) {
  return createElement(level, { className }, children);
}
