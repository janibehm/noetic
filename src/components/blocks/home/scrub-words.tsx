"use client";

import { useEffect, useRef } from "react";
import { cinematicStage } from "@/lib/styles";
import type { AuroraTone } from "../types";

export type ScrubWordItem = {
  _key?: string;
  word: string;
  /** Resolved video asset URL (projected via `video.asset->url`). */
  videoUrl?: string | null;
};

export type HomeScrubWordsBlockProps = {
  label?: string;
  /** Word + per-word background video. */
  items?: ScrubWordItem[];
  /** Legacy: plain word list with no video. */
  words?: string[];
  auroraTone?: AuroraTone;
};

/**
 * Scroll-scrub word sequence.
 *
 * Matches `noetic_CLAUDE_DESIGN/index.html` (section 2): scroll
 * progress is written to a CSS variable and the active word/dot/video is
 * toggled imperatively, keeping React out of the animation loop. Each
 * word can carry a background video that crossfades in while it is active.
 */
export default function HomeScrubWordsBlock({
  label,
  items,
  words = [],
  auroraTone = "default",
}: HomeScrubWordsBlockProps) {
  const tone =
    auroraTone === "cool" || auroraTone === "warm" ? auroraTone : "spectral";
  const entries: ScrubWordItem[] = items?.length
    ? items
    : words.map((word) => ({ word }));
  const trackRef = useRef<HTMLElement>(null);
  const activeRef = useRef(-1);

  useEffect(() => {
    if (!entries.length) return;
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const wordEls = Array.from(el.querySelectorAll<HTMLElement>("[data-scrub-word]"));
    const dotEls = Array.from(el.querySelectorAll<HTMLElement>("[data-scrub-dot]"));
    const videoEls = Array.from(el.querySelectorAll<HTMLVideoElement>("[data-scrub-video]"));

    const frame = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));

      const idx = Math.min(
        entries.length - 1,
        Math.max(0, Math.floor(p * entries.length * 0.999)),
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
        // Only the active clip plays — keeps a single decode in flight.
        videoEls.forEach((videoEl, videoIndex) => {
          const isActive = videoIndex === idx;
          videoEl.toggleAttribute("data-active", isActive);
          if (isActive) videoEl.play?.().catch(() => {});
          else videoEl.pause?.();
        });
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [entries.length]);

  return (
    <section
      ref={trackRef}
      data-scrub-track
      className="relative"
      style={{ height: "320vh" }}
    >
      <div
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        <div
          className={cinematicStage({ tone })}
          style={{ position: "absolute", inset: 0 }}
        />
        {entries.map((entry, i) =>
          entry.videoUrl ? (
            <video
              key={entry._key ?? entry.word}
              data-scrub-video
              data-active={i === 0 ? "" : undefined}
              autoPlay={i === 0}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className="absolute inset-0 z-[1] h-full w-full object-cover opacity-0 transition-opacity duration-[800ms] ease-linear data-active:opacity-100"
            >
              <source src={entry.videoUrl} />
            </video>
          ) : null,
        )}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-black opacity-[calc(0.25+var(--p,0)*0.55)] transition-opacity duration-100 ease-linear"
        />
        <div
          className="relative z-[3] flex w-full flex-col items-center px-[var(--pad)] text-center"
        >
          {label ? (
            <div
              className="mb-8 text-[0.72rem] font-semibold uppercase leading-normal tracking-[0.18em] text-white/80"
            >
              {label}
            </div>
          ) : null}
          <div
            className="relative h-[clamp(70px,14vw,200px)] w-full md:translate-x-[8vw] lg:translate-x-[12vw]"
          >
            {entries.map((entry, i) => (
              <div
                key={entry._key ?? entry.word}
                data-scrub-word
                data-active={i === 0 ? "" : undefined}
                aria-hidden={i !== 0}
                className="absolute inset-0 flex translate-y-10 scale-[0.96] items-center justify-center text-[clamp(3rem,13vw,11rem)] font-bold leading-none tracking-[-0.05em] text-white opacity-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-active:translate-y-0 data-active:scale-100 data-active:opacity-100"
              >
                {entry.word}
              </div>
            ))}
          </div>
          <div
            className="mt-[clamp(4rem,3.55rem+2.23vw,5.25rem)] flex justify-center gap-3"
          >
            {entries.map((entry, i) => (
              <span
                key={entry._key ?? entry.word}
                data-scrub-dot
                data-active={i === 0 ? "" : undefined}
                aria-hidden
                className="h-1.5 w-12 rounded-full bg-white/30 transition-colors duration-[400ms] data-active:bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
