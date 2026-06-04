import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import type { SanityImageRef } from "../types";

export type PullQuoteBlockProps = {
  quote: string;
  author?: {
    name: string;
    role?: string;
    avatar?: SanityImageRef;
  };
  alignment?: "center" | "start";
};

/**
 * Shared pull quote / testimonial. Used on home & solutions.
 *
 * Renders a giant serif quotation mark above the quote body, an
 * editorial pattern lifted from the original CLAUDE design.
 */
export default function PullQuoteBlock({
  quote,
  author,
  alignment = "center",
}: PullQuoteBlockProps) {
  const avatar = author?.avatar ? sanityImageProps(author.avatar, 128) : null;
  const isCenter = alignment === "center";
  return (
    <section className={pageSection({ space: "xl" })}>
      <div className={pageContainer({ size: "md" })}>
        <figure
          className={css({
            margin: 0,
            textAlign: isCenter ? "center" : "start",
          })}
        >
          <span
            aria-hidden
            className={css({
              display: "block",
              fontFamily: "serif",
              fontSize: "6xl",
              lineHeight: "none",
              color: "border.muted",
              marginBlockEnd: "sm",
            })}
          >
            &ldquo;
          </span>
          <blockquote
            className={css({
              fontFamily: "serif",
              fontStyle: "italic",
              fontWeight: "medium",
              fontSize: "5xl",
              lineHeight: "tight",
              letterSpacing: "tighter",
              color: "fg.default",
              margin: 0,
              maxWidth: "measureWide",
              marginInline: isCenter ? "auto" : undefined,
              textWrap: "balance",
            })}
          >
            {quote}
          </blockquote>
          {author ? (
            <figcaption
              className={css({
                marginBlockStart: "xl",
                display: "inline-flex",
                alignItems: "center",
                gap: "sm",
                textAlign: "start",
              })}
            >
              {avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className={css({
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "circle",
                    objectFit: "cover",
                  })}
                />
              ) : null}
              <span>
                <span
                  className={css({
                    display: "block",
                    fontWeight: "semibold",
                    color: "fg.default",
                  })}
                >
                  {author.name}
                </span>
                {author.role ? (
                  <span
                    className={css({
                      display: "block",
                      textStyle: "body.sm",
                      color: "fg.muted",
                    })}
                  >
                    {author.role}
                  </span>
                ) : null}
              </span>
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
