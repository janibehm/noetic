import { button, cn, pageContainer, pageSection, stackY } from "@/lib/styles";
import { sanityImageProps } from "@/lib/sanity-image";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
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
  const headingTag = getHeadingLevel(headingLevel, "h1");
  return (
    <section className={pageSection({ space: "xl", tone })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg", align: "start" })}>
          {eyebrow ? (
            <span className="text-[0.72rem] font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">
              {eyebrow}
            </span>
          ) : null}
          {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "max-w-[78ch]"), heading)}
          {lead ? (
            <p
              className="max-w-[65ch] text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65] text-[var(--gray)] text-pretty"
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
              className="mt-[clamp(2rem,1.82rem+.89vw,2.5rem)] h-auto w-full max-w-[72rem] rounded-3xl shadow-[var(--shadow-amb)]"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
