import { pageContainer, pageSection } from "@/lib/styles";
import { sanityImageProps } from "@/lib/sanity-image";
import type { SanityImageRef } from "../types";

export type MediaBlockProps = {
  width?: "measure" | "container" | "full";
  caption?: string;
  image?: SanityImageRef;
};

export default function MediaBlock({
  width = "container",
  caption,
  image,
}: MediaBlockProps) {
  const img = image ? sanityImageProps(image, 2400) : null;
  if (!img) return null;
  const size = width === "measure" ? "prose" : width === "full" ? "full" : "lg";
  return (
    <section className={pageSection({ space: "md" })}>
      <div className={pageContainer({ size })}>
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className={width === "full" ? "block h-auto w-full rounded-none" : "block h-auto w-full rounded-xl"}
          />
          {caption ? (
            <figcaption
              className="mt-2 text-center text-sm leading-normal text-[var(--gray)]"
            >
              {caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
