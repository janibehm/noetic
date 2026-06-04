"use client";

import { useRef } from "react";
import { css } from "../../../../styled-system/css";
import { button, cinematicStage } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";
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
  const Heading = getHeadingLevel(headingLevel, "h2");
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
      className={css({
        position: "relative",
        paddingBlock: "clamp(72px, 11vw, 160px)",
      })}
    >
      <div
        className={css({
          width: "100%",
          maxWidth: "containerXl",
          marginInline: "auto",
          paddingInline: "pageGutter",
        })}
      >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              marginBlockEnd: "clamp(30px, 4vw, 52px)",
              flexWrap: "wrap",
            })}
          >
            <div>
              {eyebrow ? (
                <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
                  {eyebrow}
                </span>
              ) : null}
              <Heading
                className={css({
                  ...headingLevelStyles[Heading],
                  color: "fg.default",
                  textWrap: "balance",
                })}
              >
                {heading}
              </Heading>
            </div>
            {viewAllCta?.label && viewAllCta.href ? (
              <a
                href={viewAllCta.href}
                className={button({ variant: "outline", size: "sm", shape: "pill" })}
              >
                {viewAllCta.label}
              </a>
            ) : (
              <div className={css({ display: "flex", gap: "2" })}>
                <CarouselButton label="Previous" onClick={() => scrollByCard(-1)}>
                  <path d="M15 6l-6 6 6 6" />
                </CarouselButton>
                <CarouselButton label="Next" onClick={() => scrollByCard(1)}>
                  <path d="M9 6l6 6-6 6" />
                </CarouselButton>
              </div>
            )}
          </div>
          <ul
            ref={trackRef}
            className={css({
              display: "flex",
              gap: "clamp(16px, 2vw, 26px)",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBlock: "8px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              cursor: "grab",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            })}
          >
            {visible.map((article) => {
              const cover = article.coverImage
                ? sanityImageProps(article.coverImage, 800)
                : null;
              return (
                <li
                  key={article._id}
                  className={css({
                    flex: "none",
                    width: "clamp(280px, 32vw, 380px)",
                    scrollSnapAlign: "start",
                    containerType: "inline-size",
                  })}
                >
                  <a
                    href={`/articles/${article.slug}`}
                    className={css({
                      display: "block",
                      color: "fg.default",
                      textDecoration: "none",
                      _hover: {
                        "& img, & [data-aurora]": { transform: "scale(1.06)" },
                        "& h3": { transform: "translateY(-2px)" },
                      },
                    })}
                  >
                    {cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        className={css({
                          width: "100%",
                          aspectRatio: "4 / 3",
                          objectFit: "cover",
                          display: "block",
                          borderRadius: "2rem",
                          boxShadow:
                            "inset 0 0 0 1px rgba(0,0,0,0.05), {shadows.ambient}",
                          marginBlockEnd: "16px",
                          transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                        })}
                      />
                    ) : (
                      <div
                        aria-hidden
                        className={css({
                          position: "relative",
                          overflow: "hidden",
                          width: "100%",
                          aspectRatio: "4 / 3",
                          borderRadius: "2rem",
                          boxShadow:
                            "inset 0 0 0 1px rgba(0,0,0,0.05), {shadows.ambient}",
                          marginBlockEnd: "16px",
                        })}
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
                      className={css({
                        fontSize: "clamp(0.64rem, 2.4cqw, 0.72rem)",
                        lineHeight: 1.5,
                        letterSpacing: "0.05em",
                        fontWeight: 500,
                        color: "fg.muted",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginBlockEnd: "9px",
                      })}
                    >
                      {article.category?.title ? <>{article.category.title}</> : null}
                      {article.readingTimeMinutes ? (
                        <> · {article.readingTimeMinutes} min read</>
                      ) : null}
                    </span>
                    <h3
                      className={css({
                        fontSize: "clamp(0.92rem, 4.8cqw, 1.16rem)",
                        fontWeight: 550,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.25,
                        textWrap: "pretty",
                        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      })}
                    >
                      {article.title}
                    </h3>
                  </a>
                </li>
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
      className={css({
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        boxShadow: "inset 0 0 0 1px {colors.border.muted}",
        color: "fg.default",
        transition: "background 0.25s, box-shadow 0.25s, color 0.25s",
        _hover: { backgroundColor: "bg.inverse", color: "fg.inverse", boxShadow: "none" },
      })}
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
