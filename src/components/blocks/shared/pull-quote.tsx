import { pageContainer, pageSection, cn } from "@/lib/styles";
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
          className={cn("m-0", isCenter ? "text-center" : "text-start")}
        >
          <span
            aria-hidden
            className="mb-4 block font-serif text-[clamp(3.58rem,2.13rem+9.71vw,8.66rem)] leading-none text-[var(--line)]"
          >
            &ldquo;
          </span>
          <blockquote
            className={cn(
              "m-0 max-w-[78ch] font-serif text-[clamp(2.99rem,1.94rem+6.55vw,6.5rem)] font-medium italic leading-[1.15] tracking-[-0.02em] text-[var(--ink)] text-balance",
              isCenter && "mx-auto",
            )}
          >
            {quote}
          </blockquote>
          {author ? (
            <figcaption
              className="mt-[clamp(3rem,2.73rem+1.34vw,3.75rem)] inline-flex items-center gap-4 text-start"
            >
              {avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : null}
              <span>
                <span
                  className="block font-semibold text-[var(--ink)]"
                >
                  {author.name}
                </span>
                {author.role ? (
                  <span
                    className="block text-sm leading-normal text-[var(--gray)]"
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
