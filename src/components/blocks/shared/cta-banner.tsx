import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, button, cinematicStage } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";
import type { AuroraTone, CtaLink, SanityImageRef, Tone } from "../types";

export type CtaBannerBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  body?: string;
  bullets?: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: CtaLink;
  alignment?: "center" | "start";
  tone?: Tone;
  background?: {
    auroraTone?: AuroraTone;
    image?: SanityImageRef;
  };
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

/**
 * Shared CTA banner — cinematic squircle card with aurora wash by
 * default. Drop in a background image to use a photo instead.
 */
export default function CtaBannerBlock({
  eyebrow,
  heading,
  headingLevel,
  body,
  bullets,
  primaryCta,
  secondaryCta,
  alignment = "center",
  tone = "inverse",
  background,
}: CtaBannerBlockProps) {
  const bg = background?.image ? sanityImageProps(background.image, 2000) : null;
  const isInverse = tone === "inverse";
  const auroraTone = AURORA_TONE[background?.auroraTone ?? "default"];
  const Heading = getHeadingLevel(headingLevel, "h2");

  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div
          className={
            isInverse
              ? cinematicStage({ tone: auroraTone, radius: "2xl" })
              : css({
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4xl",
                  backgroundColor: "bg.surface",
                  border: "subtle",
                  color: "fg.default",
                })
          }
        >
          {bg ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={bg.src}
              alt={bg.alt}
              className={css({
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.55,
                zIndex: 0,
              })}
            />
          ) : null}
          <div
            className={css({
              position: "relative",
              zIndex: 2,
              paddingBlock: "3xl",
              paddingInline: { base: "md", md: "xl", lg: "2xl" },
              textAlign: alignment === "center" ? "center" : "start",
              display: "flex",
              flexDirection: "column",
              gap: "md",
              alignItems: alignment === "center" ? "center" : "flex-start",
              maxWidth: "measureWide",
              marginInline: alignment === "center" ? "auto" : undefined,
            })}
          >
            {eyebrow ? (
              <span
                className={css({
                  textStyle: "label.sm",
                  color: isInverse ? "fg.onCinematicMuted" : "fg.muted",
                })}
              >
                {eyebrow}
              </span>
            ) : null}
            <Heading
              className={css({
                ...headingLevelStyles[Heading],
                color: isInverse ? "fg.onCinematic" : "fg.default",
              })}
            >
              {heading}
            </Heading>
            {body ? (
              <p
                className={css({
                  textStyle: "body.lg",
                  color: isInverse ? "fg.onCinematicMuted" : "fg.muted",
                  maxWidth: "measure",
                })}
              >
                {body}
              </p>
            ) : null}
            {bullets?.length ? (
              <ul
                className={css({
                  listStyle: "disc",
                  paddingInlineStart: "lg",
                  textStyle: "body.md",
                  color: isInverse ? "fg.onCinematicMuted" : "fg.default",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2xs",
                  textAlign: "start",
                })}
              >
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            <div
              className={css({
                display: "flex",
                gap: "sm",
                flexWrap: "wrap",
                marginBlockStart: "sm",
              })}
            >
              <a
                href={primaryCta.href}
                className={button({
                  variant: isInverse ? "onCinematic" : "inverse",
                  size: "lg",
                  shape: "pill",
                })}
              >
                {primaryCta.label}
              </a>
              {secondaryCta?.label && secondaryCta.href ? (
                <a
                  href={secondaryCta.href}
                  className={button({
                    variant: isInverse ? "ghost" : "outline",
                    size: "lg",
                    shape: "pill",
                  })}
                  style={
                    isInverse
                      ? { color: "#fff", border: "1px solid rgba(255,255,255,0.28)" }
                      : undefined
                  }
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
