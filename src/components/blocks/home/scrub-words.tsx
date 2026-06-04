"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "../../../../styled-system/css";
import { cinematicStage } from "../../../../styled-system/recipes";
import type { AuroraTone } from "../types";

export type HomeScrubWordsBlockProps = {
  label?: string;
  words?: string[];
  auroraTone?: AuroraTone;
};

/**
 * Scroll-scrub word sequence.
 *
 * The outer `track` is tall (≈ words.length × 80vh) so that the
 * inner sticky `stage` stays pinned for the duration of the scroll.
 * A rAF loop reads the track's bounding rect, derives a 0→1
 * progress value, and uses it to select the active word/dot.
 * Matches `noetic_CLAUDE_DESIGN/index.html` (section 2).
 */
export default function HomeScrubWordsBlock({
  label,
  words = [],
  auroraTone = "default",
}: HomeScrubWordsBlockProps) {
  const tone =
    auroraTone === "cool" || auroraTone === "warm" ? auroraTone : "spectral";
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dim, setDim] = useState(0.25);

  useEffect(() => {
    if (!words.length) return;
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const frame = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      // Map progress into word index with a small dwell margin at the ends.
      const idx = Math.min(
        words.length - 1,
        Math.max(0, Math.floor(p * words.length * 0.999)),
      );
      setActive(idx);
      setDim(0.25 + p * 0.55);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [words.length]);

  // Track is ~80vh per word so each word gets a comfortable scroll slice.
  const trackHeight = `${Math.max(2, words.length) * 80}vh`;

  return (
    <section
      ref={trackRef}
      className={css({ position: "relative" })}
      style={{ height: trackHeight }}
    >
      <div
        className={css({
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        })}
      >
        <div
          className={cinematicStage({ tone })}
          style={{ position: "absolute", inset: 0 }}
        />
        <div
          aria-hidden
          className={css({
            position: "absolute",
            inset: 0,
            backgroundColor: "#000",
            zIndex: 1,
            transition: "opacity 0.1s linear",
          })}
          style={{ opacity: dim }}
        />
        <div
          className={css({
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            paddingInline: { base: "sm", md: "md", lg: "lg" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          {label ? (
            <div
              className={css({
                textStyle: "label.sm",
                color: "fg.onCinematicMuted",
                marginBlockEnd: "lg",
              })}
            >
              {label}
            </div>
          ) : null}
          <div
            className={css({
              position: "relative",
              height: "clamp(70px, 14vw, 200px)",
              width: "min(90vw, 60rem)",
            })}
          >
            {words.map((word, i) => (
              <div
                key={word}
                aria-hidden={i !== active}
                className={css({
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontSize: "clamp(3rem, 13vw, 11rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  transition:
                    "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                })}
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active ? "none" : "translateY(40px) scale(0.96)",
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <div
            className={css({
              display: "flex",
              gap: "2",
              justifyContent: "center",
              marginBlockStart: "xl",
            })}
          >
            {words.map((word, i) => (
              <span
                key={word}
                aria-hidden
                className={css({
                  width: "6",
                  height: "1",
                  borderRadius: "pill",
                  transition: "background-color 0.4s",
                })}
                style={{
                  backgroundColor:
                    i === active ? "#fff" : "rgba(255,255,255,0.28)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
