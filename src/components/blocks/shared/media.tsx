import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
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
        <figure className={css({ margin: 0 })}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className={css({
              width: "100%",
              height: "auto",
              borderRadius: width === "full" ? "none" : "lg",
              display: "block",
            })}
          />
          {caption ? (
            <figcaption
              className={css({
                textStyle: "body.sm",
                color: "fg.muted",
                textAlign: "center",
                marginBlockStart: "2xs",
              })}
            >
              {caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
