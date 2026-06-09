import { sanityImageProps } from "@/lib/sanity-image";
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
  /** When false, the video renders without a poster frame (video-only).
   *  Defaults to true so card/cover surfaces keep their poster. */
  showPoster?: boolean;
  /** Video preload hint. Defaults to "metadata"; pass "auto" for hero
   *  surfaces where the video should start as soon as possible. */
  preload?: "none" | "metadata" | "auto";
};

/**
 * Renders either an autoplaying, muted, looping background `<video>` or a
 * static `<img>` from the same slot. Motion surfaces (hero, bento tiles,
 * product thumbnails, article covers) accept an optional video; everything
 * degrades to the image — and then to the caller's gradient — when absent.
 *
 * Pure attribute-based autoplay, so it works without client JS.
 */
export function MediaAsset({
  image,
  videoUrl,
  width = 1200,
  className,
  alt,
  showPoster = true,
  preload = "metadata",
}: MediaAssetProps) {
  const img = image ? sanityImageProps(image, width) : null;

  if (videoUrl) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={showPoster ? img?.src : undefined}
        aria-hidden
      >
        <source src={videoUrl} />
      </video>
    );
  }

  if (img) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={img.src} alt={alt ?? img.alt} className={className} />
    );
  }

  return null;
}
