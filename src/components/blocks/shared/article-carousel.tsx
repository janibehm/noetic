"use client";

import { useRef } from "react";
import { button, cinematicStage, cn } from "@/lib/styles";
import { sanityImageProps } from "../../prose-renderer";
import { Reveal } from "../reveal";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { CtaLink, SanityImageRef } from "../types";

/** Article card payload as projected by `articleCardProjection`. */
export type ArticleCard = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  readingTimeMinutes?: number;
  category?: { title?: string; slug?: string };
  coverImage?: SanityImageRef | null;
};

export type ArticleCarouselBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  viewAllCta?: CtaLink;
  limit?: number;
  items?: ArticleCard[];
};

/**
 * Server-rendered article rail. Items are resolved in GROQ — either
 * auto-fetched (`source: "latest"`) or dereferenced from a manual
 * selection — so this component only knows how to lay them out.
 */
export default function ArticleCarouselBlock({
  eyebrow,
  heading,
  headingLevel,
  viewAllCta,
  limit,
  items = [],
}: ArticleCarouselBlockProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const headingTag = getHeadingLevel(headingLevel, "h2");
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  if (!visible.length) return null;

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.8, 520);
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-[clamp(72px,11vw,160px)]"
    >
      <div
        className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]"
      >
          <Reveal
            className="mb-[clamp(30px,4vw,52px)] flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              {eyebrow ? (
                <span className="text-[0.72rem] font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">
                  {eyebrow}
                </span>
              ) : null}
              {renderHeading(
                headingTag,
                cn(headingLevelStyles[headingTag], "text-[var(--ink)] text-balance"),
                heading,
              )}
            </div>
            {viewAllCta?.label && viewAllCta.href ? (
              <a
                href={viewAllCta.href}
                className={button({ variant: "outline", size: "sm", shape: "pill" })}
              >
                {viewAllCta.label}
              </a>
            ) : (
              <div className="flex gap-2">
                <CarouselButton label="Previous" onClick={() => scrollByCard(-1)}>
                  <path d="M15 6l-6 6 6 6" />
                </CarouselButton>
                <CarouselButton label="Next" onClick={() => scrollByCard(1)}>
                  <path d="M9 6l6 6-6 6" />
                </CarouselButton>
              </div>
            )}
          </Reveal>
          <ul
            ref={trackRef}
            className="no-scrollbar flex cursor-grab snap-x snap-mandatory list-none gap-[clamp(16px,2vw,26px)] overflow-x-auto p-0 py-2 m-0"
          >
            {visible.map((article, index) => {
              const cover = article.coverImage
                ? sanityImageProps(article.coverImage, 800)
                : null;
              return (
                <Reveal
                  as="li"
                  key={article._id}
                  delay={(index % 4) as 0 | 1 | 2 | 3}
                  className="w-[clamp(280px,32vw,380px)] flex-none snap-start [container-type:inline-size]"
                >
                  <a
                    href={`/articles/${article.slug}`}
                    className="group block text-[var(--ink)] no-underline"
                  >
                    {cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        className="mb-4 block aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]"
                      >
                        <div
                          data-aurora
                          className={cinematicStage({
                            tone: article.category?.slug === "marketing" ? "warm" : "cool",
                          })}
                          style={{
                            position: "absolute",
                            inset: 0,
                            transition:
                              "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </div>
                    )}
                    <span
                      className="mb-[9px] flex items-center gap-2.5 text-[clamp(0.64rem,2.4cqw,0.72rem)] font-medium leading-[1.5] tracking-[0.05em] text-[var(--gray)]"
                    >
                      {article.category?.title ? <>{article.category.title}</> : null}
                      {article.readingTimeMinutes ? (
                        <> · {article.readingTimeMinutes} min read</>
                      ) : null}
                    </span>
                    <h3
                      className="text-[clamp(0.92rem,4.8cqw,1.16rem)] font-[550] leading-[1.25] tracking-[-0.02em] text-pretty transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                    >
                      {article.title}
                    </h3>
                  </a>
                </Reveal>
              );
            })}
          </ul>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-[46px] w-[46px] place-items-center rounded-full text-[var(--ink)] shadow-[inset_0_0_0_1px_var(--line)] transition-[background,box-shadow,color] duration-[250ms] hover:bg-[var(--ink)] hover:text-white hover:shadow-none"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {children}
        </g>
      </svg>
    </button>
  );
}
