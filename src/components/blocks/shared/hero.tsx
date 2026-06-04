import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, stackY, button } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";
import type { CtaLink, SanityImageRef, Tone } from "../types";

export type HeroBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  tone?: Tone;
  image?: SanityImageRef;
  primaryCta?: CtaLink;
};

/** Generic page hero — reusable on marketing & docs pages. */
export default function HeroBlock({
  eyebrow,
  heading,
  headingLevel,
  lead,
  tone = "canvas",
  image,
  primaryCta,
}: HeroBlockProps) {
  const img = image ? sanityImageProps(image, 2000) : null;
  const Heading = getHeadingLevel(headingLevel, "h1");
  return (
    <section className={pageSection({ space: "xl", tone })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg", align: "start" })}>
          {eyebrow ? (
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              {eyebrow}
            </span>
          ) : null}
          <Heading className={css({ ...headingLevelStyles[Heading], maxWidth: "measureWide" })}>
            {heading}
          </Heading>
          {lead ? (
            <p
              className={css({
                textStyle: "body.lg",
                color: "fg.muted",
                maxWidth: "measure",
              })}
            >
              {lead}
            </p>
          ) : null}
          {primaryCta?.label && primaryCta.href ? (
            <a
              href={primaryCta.href}
              className={button({ variant: "inverse", size: "lg", shape: "pill" })}
            >
              {primaryCta.label}
            </a>
          ) : null}
          {img ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={img.src}
              alt={img.alt}
              className={css({
                width: "100%",
                maxWidth: "containerLg",
                borderRadius: "3xl",
                marginBlockStart: "lg",
                height: "auto",
                boxShadow: "ambient",
              })}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
