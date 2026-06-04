import { css } from "../../../../styled-system/css";
import { cinematicStage } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";
import type { SanityImageRef } from "../types";

export type BentoArticle = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  category?: { title?: string; slug?: string };
  coverImage?: SanityImageRef | null;
};

export type HomeBentoShowcaseBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  items?: BentoArticle[];
};

const FALLBACK_AURORA_TONES = ["spectral", "cool", "warm"] as const;

function getBentoSpan(index: number) {
  if (index === 0) return { columns: 2, rows: 2 };
  if (index === 3 || index === 6) return { columns: 2, rows: 1 };
  return { columns: 1, rows: 1 };
}

export default function HomeBentoShowcaseBlock({
  eyebrow,
  heading,
  headingLevel,
  lead,
  items = [],
}: HomeBentoShowcaseBlockProps) {
  const Heading = getHeadingLevel(headingLevel, "h2");
  const latestByCategory = Array.from(
    items
      .reduce((articles, item) => {
        const categoryKey = item.category?.slug || item.category?.title;
        if (categoryKey && !articles.has(categoryKey)) articles.set(categoryKey, item);
        return articles;
      }, new Map<string, BentoArticle>())
      .values(),
  );

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
            maxWidth: "60ch",
            marginBlockEnd: "clamp(36px, 5vw, 64px)",
          })}
        >
          {eyebrow ? (
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              {eyebrow}
            </span>
          ) : null}
          <Heading
            className={css({
              marginBlock: "14px 16px",
              ...headingLevelStyles[Heading],
              color: "fg.default",
              textWrap: "balance",
            })}
          >
            {heading}
          </Heading>
          {lead ? (
            <p
              className={css({
                fontSize: "clamp(1.1rem, 1.5vw, 1.45rem)",
                lineHeight: 1.45,
                color: "fg.muted",
                maxWidth: "52ch",
                textWrap: "pretty",
              })}
            >
              {lead}
            </p>
          ) : null}
        </div>
        <ul
          className={css({
            display: "grid",
            gridTemplateColumns: {
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gridAutoRows: { base: "auto", md: "12.5rem" },
            gap: "clamp(0.875rem, 1.5vw, 1.375rem)",
            listStyle: "none",
            padding: 0,
            margin: 0,
            "& > li:first-child": {
              md: {
                gridColumn: "span 2",
                gridRow: "span 2",
              },
            },
          })}
        >
          {latestByCategory.map((item, index) => (
            <BentoCard key={item._id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function BentoCard({ item, index }: { item: BentoArticle; index: number }) {
  const span = getBentoSpan(index);
  const cover = item.coverImage ? sanityImageProps(item.coverImage, 1200) : null;
  const auroraTone = FALLBACK_AURORA_TONES[index % FALLBACK_AURORA_TONES.length];

  return (
    <li
      className={css({
        gridColumn: { base: "auto", sm: span.columns >= 2 ? "span 2" : "auto", md: `span ${span.columns}` },
        gridRow: { base: "auto", md: `span ${span.rows}` },
        position: "relative",
        overflow: "hidden",
        borderRadius: "2rem",
        minHeight: { base: "13.75rem", md: "auto" },
        isolation: "isolate",
        transitionProperty: "transform",
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        _hover: {
          transform: "scale(1.018)",
          "& img": { transform: "scale(1.06)" },
          "& [data-bento-scrim]": { opacity: 0.3 },
        },
      })}
    >
      {cover ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.src}
            alt={cover.alt}
            className={css({
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            })}
          />
        </>
      ) : (
        // Aurora cards: extra blur + saturation so blobs read as soft
        // backdrops at small sizes (matches `.bento .b-media .aurora`).
        <div
          aria-hidden
          className={cinematicStage({ tone: auroraTone })}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            filter: "blur(30px) saturate(140%)",
          }}
        />
      )}
      <div
        data-bento-scrim
        aria-hidden
        className={css({
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55))",
          transition: "opacity 0.5s",
        })}
      />
      <BentoBody item={item} />
    </li>
  );
}

function BentoBody({ item }: { item: BentoArticle }) {
  const inner = (
    <>
      {item.category?.title ? (
        <span
          className={css({
            alignSelf: "flex-start",
            marginBlockEnd: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            height: "1.875rem",
            paddingInline: "0.8125rem",
            borderRadius: "pill",
            backgroundColor: "rgba(255,255,255,0.22)",
            color: "fg.onCinematic",
            fontSize: "0.78rem",
            fontWeight: 500,
            backdropFilter: "blur(14px)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
          })}
        >
          {item.category.title}
        </span>
      ) : null}
      <h3
        data-bento-copy
        className={css({
          fontSize: "1.3rem",
          lineHeight: 1.1,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "fg.onCinematic",
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          transition: "opacity 0.4s",
        })}
      >
        {item.title}
      </h3>
      {item.excerpt ? (
        <p
          data-bento-copy
          className={css({
            marginBlockStart: "6px",
            fontSize: "0.92rem",
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.85)",
            maxWidth: "30ch",
            transition: "opacity 0.4s",
          })}
        >
          {item.excerpt}
        </p>
      ) : null}
    </>
  );

  const bodyStyles = css({
    position: "absolute",
    inset: 0,
    zIndex: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "24px",
    color: "fg.onCinematic",
    textDecoration: "none",
  });

  return (
    <a href={`/articles/${item.slug}`} className={bodyStyles}>
      {inner}
    </a>
  );
}
