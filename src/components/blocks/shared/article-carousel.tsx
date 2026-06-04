import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, stackY, button } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
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
  viewAllCta,
  limit,
  items = [],
}: ArticleCarouselBlockProps) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  if (!visible.length) return null;
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg" })}>
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "md",
              flexWrap: "wrap",
            })}
          >
            <div>
              {eyebrow ? (
                <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
                  {eyebrow}
                </span>
              ) : null}
              <h2 className={css({ textStyle: "heading.h2" })}>{heading}</h2>
            </div>
            {viewAllCta?.label && viewAllCta.href ? (
              <a
                href={viewAllCta.href}
                className={button({ variant: "outline", size: "sm", shape: "pill" })}
              >
                {viewAllCta.label}
              </a>
            ) : null}
          </div>
          <ul
            className={css({
              display: "flex",
              gap: "md",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBlock: "2xs",
              paddingInlineEnd: "lg",
              listStyle: "none",
              margin: 0,
              padding: 0,
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
                    width: { base: "85vw", sm: "22rem", lg: "24rem" },
                    scrollSnapAlign: "start",
                  })}
                >
                  <a
                    href={`/articles/${article.slug}`}
                    className={css({
                      display: "flex",
                      flexDirection: "column",
                      gap: "xs",
                      color: "fg.default",
                      textDecoration: "none",
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
                          borderRadius: "3xl",
                          boxShadow: "ambientSm",
                        })}
                      />
                    ) : (
                      <div
                        aria-hidden
                        className={css({
                          width: "100%",
                          aspectRatio: "4 / 3",
                          borderRadius: "3xl",
                          backgroundColor: "bg.subtle",
                        })}
                      />
                    )}
                    <span
                      className={css({
                        textStyle: "label.sm",
                        color: "fg.muted",
                        display: "flex",
                        gap: "2xs",
                        marginBlockStart: "2xs",
                      })}
                    >
                      {article.category?.title ? <>{article.category.title}</> : null}
                      {article.readingTimeMinutes ? (
                        <> · {article.readingTimeMinutes} min read</>
                      ) : null}
                    </span>
                    <h3
                      className={css({
                        textStyle: "heading.h4",
                        textWrap: "balance",
                      })}
                    >
                      {article.title}
                    </h3>
                    {article.excerpt ? (
                      <p
                        className={css({
                          textStyle: "body.md",
                          color: "fg.muted",
                        })}
                      >
                        {article.excerpt}
                      </p>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
