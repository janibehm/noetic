"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A background `<video>` that withholds its `src` until the element is
 * near the viewport.
 *
 * Autoplaying muted video is loaded eagerly by browsers regardless of the
 * `preload` hint, so every off-screen motion surface on a page competes
 * with the hero for the same connection to the Sanity CDN. Deferring the
 * source until an IntersectionObserver fires means the hero owns the pipe
 * while it matters, and each tile pays for itself only once it's about to
 * be seen.
 *
 * The poster renders from the first paint either way, so the tile is
 * never a hole — and without JS the poster is simply what stays.
 */
export function LazyVideo({
  src,
  poster,
  className,
  rootMargin = "400px",
}: {
  src: string;
  poster?: string;
  className?: string;
  /** How far ahead of the viewport to start loading. */
  rootMargin?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Held back until visible; becomes the element's `src`, which is what
  // actually kicks off the browser's resource selection.
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || resolvedSrc) return;

    // No observer (or reduced motion) — leave the poster in place rather
    // than pulling a video the user didn't ask to see move.
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setResolvedSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src, resolvedSrc, rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !resolvedSrc) return;
    // Setting `src` invokes the load algorithm on its own, but `preload`
    // is "none" and the element has already been through one empty pass,
    // so ask explicitly rather than relying on that state.
    el.load();
    el.play().catch(() => {});
  }, [resolvedSrc]);

  return (
    <video
      ref={ref}
      className={className}
      src={resolvedSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden
    />
  );
}
