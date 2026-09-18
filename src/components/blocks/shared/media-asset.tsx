import { sanityImageProps } from "@/lib/sanity-image";
import { LazyVideo } from "./lazy-video";
import { PreloadImage } from "@/components/site/resource-hints";
import type { SanityImageRef } from "../types";

export type MediaAssetProps = {
  /** Sanity image ref. Used as the visual when no video, or as the
   *  video's poster frame when `videoUrl` is present. */
  image?: SanityImageRef | null;
  /** Resolved video asset URL (projected via `video.asset->url`). */
  videoUrl?: string | null;
  /** Target render width for the image transform. */
  width?: number;
  className?: string;
  /** Overrides the image's own alt text. */
  alt?: string;
  /**
   * Set on the one above-the-fold surface per page (the hero). That video
   * loads immediately and its poster is preloaded at high priority so the
   * stage paints before a single frame of footage has arrived.
   *
   * Everything else defers: an autoplaying muted video is fetched eagerly
   * by browsers no matter what `preload` says, so off-screen tiles would
   * otherwise race the hero for the same CDN connection. See `LazyVideo`.
   */
  priority?: boolean;
};

/**
 * Renders either an autoplaying, muted, looping background `<video>` or a
 * static `<img>` from the same slot. Motion surfaces (hero, bento tiles,
 * product thumbnails, article covers) accept an optional video; everything
 * degrades to the image — and then to the caller's gradient — when absent.
 *
 * The poster always renders from the first paint, so a deferred video is
 * never a hole, and a no-JS visitor keeps the still.
 */
export function MediaAsset({
  image,
  videoUrl,
  width = 1200,
  className,
  alt,
  priority = false,
}: MediaAssetProps) {
  const img = image ? sanityImageProps(image, width) : null;

  if (videoUrl) {
    if (!priority) {
      return (
        <LazyVideo src={videoUrl} poster={img?.src} className={className} />
      );
    }
    return (
      <>
        {/* Hoisted into <head>, so the poster is requested during HTML
            parse — ahead of the video element's own discovery — and
            paints while the footage is still streaming in. */}
        {img?.src ? <PreloadImage href={img.src} /> : null}
        <video
          className={className}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={img?.src}
          aria-hidden
        >
          <source src={videoUrl} />
        </video>
      </>
    );
  }

  if (img) {
    return (
      // `loading="lazy"` is doing two jobs here. It defers the fetch, and
      // it stops React from emitting an automatic
      // `<link rel="preload" as="image">` for the image during SSR — which
      // it does for every eager `<img>`, putting a dozen below-the-fold
      // covers in front of the hero on the same connection.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={img.src}
        alt={alt ?? img.alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    );
  }

  return null;
}
