import Link from "next/link";
import { cinematicStage, cn } from "@/lib/styles";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
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
  const headingTag = getHeadingLevel(headingLevel, "h2");
  // The mosaic layout (big flagship + 2-wide tiles at indices 3 and 6)
  // is sized for exactly 7 tiles, matching the reference bento.
  const latestByCategory = Array.from(
    items
      .reduce((articles, item) => {
        const categoryKey = item.category?.slug || item.category?.title;
        if (categoryKey && !articles.has(categoryKey)) articles.set(categoryKey, item);
        return articles;
      }, new Map<string, BentoArticle>())
      .values(),
  ).slice(0, 7);

  return (
    <section
      className="relative py-[clamp(72px,11vw,160px)]"
    >
      <div
        className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]"
      >
        <div
          className="mb-[clamp(36px,5vw,64px)] max-w-[60ch]"
        >
          {eyebrow ? (
            <span className="text-[0.72rem] font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">
              {eyebrow}
            </span>
          ) : null}
          {renderHeading(
            headingTag,
            cn(headingLevelStyles[headingTag], "my-[14px_16px] text-[var(--ink)] text-balance"),
            heading,
          )}
          {lead ? (
            <p
              className="max-w-[52ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty"
            >
              {lead}
            </p>
          ) : null}
        </div>
        <ul
          className="grid list-none gap-[clamp(0.875rem,1.5vw,1.375rem)] p-0 m-0 sm:grid-cols-2 md:auto-rows-[12.5rem] md:grid-cols-4 [&>li:first-child]:md:col-span-2 [&>li:first-child]:md:row-span-2"
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
  const spanClass = cn(
    span.columns >= 2 && "sm:col-span-2 md:col-span-2",
    span.rows >= 2 && "md:row-span-2",
  );

  return (
    <li
      className={cn(
        "group relative isolate min-h-[13.75rem] overflow-hidden rounded-[2rem] [container-type:inline-size] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.018] md:min-h-0",
        spanClass,
      )}
    >
      {cover ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.src}
            alt={cover.alt}
            className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.06]"
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
        className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.55))] transition-opacity duration-500 group-hover:opacity-30"
      />
      <BentoBody item={item} showTag={index === 0} />
    </li>
  );
}

function BentoBody({ item, showTag }: { item: BentoArticle; showTag: boolean }) {
  const inner = (
    <>
      {showTag && item.category?.title ? (
        <span
          className="mb-auto inline-flex h-[1.875rem] items-center gap-[7px] self-start rounded-full bg-white/[0.22] px-[0.8125rem] text-[0.78rem] font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-[14px]"
        >
          {item.category.title}
        </span>
      ) : null}
      <h3
        data-bento-copy
        className="text-[1.3rem] font-semibold leading-[1.5] tracking-[-0.02em] text-white transition-opacity duration-[400ms] [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]"
      >
        {item.title}
      </h3>
      {item.excerpt ? (
        <p
          data-bento-copy
          className="mt-[6px] max-w-[30ch] text-[0.92rem] leading-[1.5] text-white/85 transition-opacity duration-[400ms]"
        >
          {item.excerpt}
        </p>
      ) : null}
    </>
  );

  const bodyStyles = "absolute inset-0 z-[4] flex flex-col justify-end p-6 text-white no-underline";

  return (
    <Link href={`/articles/${item.slug}`} className={bodyStyles}>
      {inner}
    </Link>
  );
}
