import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, stackY, cinematicStage } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import type { AuroraTone, SanityImageRef } from "../types";

type BentoMedia = {
  kind?: "image" | "aurora";
  auroraTone?: AuroraTone;
  image?: SanityImageRef;
};

export type BentoItem = {
  _key: string;
  title: string;
  body?: string;
  tag?: string;
  href?: string;
  span?: { columns?: number; rows?: number };
  media?: BentoMedia;
};

export type HomeBentoShowcaseBlockProps = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  items?: BentoItem[];
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export default function HomeBentoShowcaseBlock({
  eyebrow,
  heading,
  lead,
  items = [],
}: HomeBentoShowcaseBlockProps) {
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg" })}>
          {eyebrow ? (
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              {eyebrow}
            </span>
          ) : null}
          <h2 className={css({ textStyle: "heading.h2", maxWidth: "measureWide" })}>
            {heading}
          </h2>
          {lead ? (
            <p className={css({ textStyle: "body.lg", color: "fg.muted", maxWidth: "measure" })}>
              {lead}
            </p>
          ) : null}
          <ul
            className={css({
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gridAutoRows: { base: "auto", lg: "12.5rem" },
              gap: "md",
              listStyle: "none",
              padding: 0,
              margin: 0,
            })}
          >
            {items.map((item) => (
              <BentoCard key={item._key} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ item }: { item: BentoItem }) {
  const colSpan = Math.min(item.span?.columns ?? 1, 4);
  const rowSpan = item.span?.rows ?? 1;
  const useImage = item.media?.kind === "image" && item.media.image;
  const img = useImage ? sanityImageProps(item.media!.image!, 1200) : null;
  const auroraTone = AURORA_TONE[item.media?.auroraTone ?? "default"];

  return (
    <li
      className={css({
        gridColumn: { base: "auto", sm: colSpan >= 2 ? "span 2" : "auto", lg: `span ${colSpan}` },
        gridRow: { base: "auto", lg: `span ${rowSpan}` },
        position: "relative",
        overflow: "hidden",
        borderRadius: "3xl",
        minHeight: { base: "13.75rem", lg: "auto" },
        boxShadow: "ambientSm",
        isolation: "isolate",
        transitionProperty: "transform, box-shadow",
        transitionDuration: "slower",
        transitionTimingFunction: "emphasized",
        _hover: { transform: "scale(1.018)", boxShadow: "float" },
      })}
    >
      {img ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className={css({
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            })}
          />
          <div
            aria-hidden
            className={css({
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55))",
            })}
          />
        </>
      ) : (
        <div
          aria-hidden
          className={cinematicStage({ tone: auroraTone })}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
      )}
      <BentoBody item={item} />
    </li>
  );
}

function BentoBody({ item }: { item: BentoItem }) {
  const inner = (
    <>
      {item.tag ? (
        <span
          className={css({
            alignSelf: "flex-start",
            marginBlockEnd: "auto",
            display: "inline-flex",
            alignItems: "center",
            paddingInline: "xs",
            paddingBlock: "3xs",
            borderRadius: "pill",
            backgroundColor: "rgba(255,255,255,0.22)",
            color: "fg.onCinematic",
            textStyle: "label.sm",
            backdropFilter: "blur(14px)",
            border: "1px solid",
            borderColor: "border.glass",
          })}
        >
          {item.tag}
        </span>
      ) : null}
      <h3
        className={css({
          textStyle: "heading.h4",
          color: "fg.onCinematic",
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
        })}
      >
        {item.title}
      </h3>
      {item.body ? (
        <p
          className={css({
            textStyle: "body.sm",
            color: "fg.onCinematicMuted",
            maxWidth: "30ch",
          })}
        >
          {item.body}
        </p>
      ) : null}
    </>
  );

  const bodyStyles = css({
    position: "absolute",
    inset: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "md",
    gap: "2xs",
    color: "fg.onCinematic",
    textDecoration: "none",
  });

  return item.href ? (
    <a href={item.href} className={bodyStyles}>
      {inner}
    </a>
  ) : (
    <div className={bodyStyles}>{inner}</div>
  );
}
