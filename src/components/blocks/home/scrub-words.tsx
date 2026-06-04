"use client";

import { useEffect, useRef } from "react";
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
 * Matches `noetic_CLAUDE_DESIGN/index.html` (section 2): scroll
 * progress is written to a CSS variable and the active word/dot is
 * toggled imperatively, keeping React out of the animation loop.
 */
export default function HomeScrubWordsBlock({
  label,
  words = [],
  auroraTone = "default",
}: HomeScrubWordsBlockProps) {
  const tone =
    auroraTone === "cool" || auroraTone === "warm" ? auroraTone : "spectral";
  const trackRef = useRef<HTMLElement>(null);
  const activeRef = useRef(-1);

  useEffect(() => {
    if (!words.length) return;
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const wordEls = Array.from(el.querySelectorAll<HTMLElement>("[data-scrub-word]"));
    const dotEls = Array.from(el.querySelectorAll<HTMLElement>("[data-scrub-dot]"));

    const frame = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));

      const idx = Math.min(
        words.length - 1,
        Math.max(0, Math.floor(p * words.length * 0.999)),
      );
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        wordEls.forEach((wordEl, wordIndex) => {
          const isActive = wordIndex === idx;
          wordEl.toggleAttribute("data-active", isActive);
          wordEl.setAttribute("aria-hidden", isActive ? "false" : "true");
        });
        dotEls.forEach((dotEl, dotIndex) => {
          dotEl.toggleAttribute("data-active", dotIndex === idx);
        });
      }
      raf = requestAnimationFrame(frame);
    };

    wordEls[0]?.setAttribute("data-active", "");
    dotEls[0]?.setAttribute("data-active", "");
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [words.length]);

  return (
    <section
      ref={trackRef}
      data-scrub-track
      className={css({ position: "relative" })}
      style={{ height: "320vh" }}
    >
      <div
        className={css({
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            opacity: "calc(0.25 + var(--p, 0) * 0.55)",
          })}
        />
        <div
          className={css({
            position: "relative",
            zIndex: 3,
            width: "100%",
            textAlign: "center",
            paddingInline: "pageGutter",
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
              width: "100%",
              // Nudge only the word right of dead-center on larger screens
              // to match the off-axis composition in the reference design.
              transform: { base: "none", md: "translateX(8vw)", lg: "translateX(12vw)" },
            })}
          >
            {words.map((word, i) => (
              <div
                key={word}
                data-scrub-word
                data-active={i === 0 ? "" : undefined}
                aria-hidden={i !== 0}
                className={css({
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "clamp(3rem, 13vw, 11rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  opacity: 0,
                  transform: "translateY(40px) scale(0.96)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&[data-active]": {
                    opacity: 1,
                    transform: "none",
                  },
                })}
              >
                {word}
              </div>
            ))}
          </div>
          <div
            className={css({
              display: "flex",
              gap: "3",
              justifyContent: "center",
              marginBlockStart: "2xl",
            })}
          >
            {words.map((word, i) => (
              <span
                key={word}
                data-scrub-dot
                data-active={i === 0 ? "" : undefined}
                aria-hidden
                className={css({
                  width: "12",
                  height: "1.5",
                  borderRadius: "pill",
                  backgroundColor: "rgba(255,255,255,0.28)",
                  transition: "background-color 0.4s",
                  "&[data-active]": { backgroundColor: "#fff" },
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
