"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 1400;

/** Split a stat string into its numeric part and any prefix/suffix, e.g.
 *  "$2.4M" -> { prefix: "$", target: 2.4, suffix: "M", decimals: 1 }.
 *  Returns null for non-numeric values like "∞", which animate nothing. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const clean = numStr.replace(/,/g, "");
  const target = Number.parseFloat(clean);
  if (!Number.isFinite(target)) return null;
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const grouped = numStr.includes(",");
  return { prefix, suffix, target, decimals, grouped };
}

/**
 * Rolls a numeric stat from 0 up to its value when mounted. The final
 * value is the server-rendered / initial state, so no-JS, SEO and React
 * hydration all see the real number; the brief reset-to-zero at the start
 * of the animation is hidden behind the `Reveal` fade-in that wraps the
 * stats. No-ops for non-numeric values and under reduced motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parse(value);
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, suffix, target, decimals, grouped } = parsed;
    const format = (n: number) =>
      `${prefix}${
        grouped
          ? n.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : n.toFixed(decimals)
      }${suffix}`;

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      if (t < 1) {
        setDisplay(format(target * eased));
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value); // settle on the exact original string
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className={className}>{display}</span>;
}
