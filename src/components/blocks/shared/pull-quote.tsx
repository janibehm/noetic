import { cn } from "@/lib/styles";
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
    <section className="relative py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <figure
          className={cn("m-0", isCenter ? "text-center" : "text-start")}
        >
          <span
            aria-hidden
            className="block h-[0.4em] font-serif text-[clamp(4rem,9vw,8rem)] leading-[0] text-[var(--line)]"
          >
            &ldquo;
          </span>
          <blockquote
            className={cn(
              "m-0 max-w-[18ch] font-serif text-[clamp(1.9rem,4.6vw,4rem)] font-medium italic leading-[1.08] tracking-[-0.02em] text-[var(--ink)]",
              isCenter && "mx-auto",
            )}
          >
            {quote}
          </blockquote>
          {author ? (
            <figcaption
              className={cn(
                "mt-12 flex items-center gap-[14px]",
                isCenter ? "justify-center" : "justify-start",
              )}
            >
              {avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : null}
              <span className="text-start">
                <span
                  className="block font-semibold text-[var(--ink)]"
                >
                  {author.name}
                </span>
                {author.role ? (
                  <span
                    className="block text-[0.9rem] leading-normal text-[var(--gray)]"
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
