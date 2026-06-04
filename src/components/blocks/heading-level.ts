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
  h1: {
    fontSize: "clamp(2.6rem, 6.4vw, 6rem)",
    lineHeight: "0.96",
    letterSpacing: "-0.045em",
    fontWeight: "bold",
    textWrap: "balance",
  },
  h2: {
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
    lineHeight: "0.98",
    letterSpacing: "-0.04em",
    fontWeight: "bold",
    textWrap: "balance",
  },
  h3: {
    fontSize: "clamp(1.7rem, 3.4vw, 3rem)",
    lineHeight: "1.02",
    letterSpacing: "-0.03em",
    fontWeight: "bold",
    textWrap: "balance",
  },
  h4: {
    fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
    lineHeight: "1.08",
    letterSpacing: "-0.02em",
    fontWeight: "semibold",
    textWrap: "balance",
  },
  h5: {
    fontSize: "clamp(1.15rem, 1.7vw, 1.55rem)",
    lineHeight: "1.15",
    letterSpacing: "-0.01em",
    fontWeight: "semibold",
    textWrap: "balance",
  },
  h6: {
    fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
    lineHeight: "1.3",
    letterSpacing: "0.08em",
    fontWeight: "semibold",
    textTransform: "uppercase",
  },
} as const;
