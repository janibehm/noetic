import { button, cinematicStage, cn, pageContainer, pageSection } from "@/lib/styles";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
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
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div
          className={
            isInverse
              ? cinematicStage({ tone: auroraTone, radius: "2xl" })
              : "relative overflow-hidden rounded-[2.75rem] border border-[var(--line)] bg-white text-[var(--ink)]"
          }
        >
          {bg ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={bg.src}
              alt={bg.alt}
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-55"
            />
          ) : null}
          <div
            className={cn(
              "relative z-[2] flex max-w-[78ch] flex-col gap-6 px-6 py-[clamp(6rem,5.36rem+3.21vw,7.8rem)] md:px-12 lg:px-[clamp(4rem,3.55rem+2.23vw,5.25rem)]",
              alignment === "center" ? "mx-auto items-center text-center" : "items-start text-start",
            )}
          >
            {eyebrow ? (
              <span
                className={cn("text-xs font-semibold uppercase leading-normal tracking-[0.06em]", isInverse ? "text-white/80" : "text-[var(--gray)]")}
              >
                {eyebrow}
              </span>
            ) : null}
            {renderHeading(
              headingTag,
              cn(headingLevelStyles[headingTag], isInverse ? "text-white" : "text-[var(--ink)]"),
              heading,
            )}
            {body ? (
              <p
                className={cn("max-w-[65ch] text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65] text-pretty", isInverse ? "text-white/80" : "text-[var(--gray)]")}
              >
                {body}
              </p>
            ) : null}
            {bullets?.length ? (
              <ul
                className={cn("flex list-disc flex-col gap-2 ps-8 text-start text-[clamp(1rem,.91rem+.45vw,1.25rem)] leading-[1.65]", isInverse ? "text-white/80" : "text-[var(--ink)]")}
              >
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            <div
              className="mt-4 flex flex-wrap gap-4"
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
