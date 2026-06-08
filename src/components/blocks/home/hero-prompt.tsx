import { button, cinematicStage, cn, pageContainer } from "@/lib/styles";
import { MediaAsset } from "../shared/media-asset";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { CtaLink, SanityImageRef } from "../types";

export type HomeHeroPromptBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  promptIdeas?: string[];
  primaryCta?: CtaLink;
  showScrollCue?: boolean;
  background?: {
    video?: string;
    poster?: SanityImageRef;
  };
};

/**
 * Home hero — full-bleed cinematic stage with a glass prompt pill.
 *
 * Mirrors the proportions from `noetic_CLAUDE_DESIGN/index.html`:
 *  - mega display headline with line-height ~1 and a 16ch measure
 *    so the title wraps into 2–3 dense lines on every viewport
 *  - white-on-stage kicker + lead (not muted ink)
 *  - 720px glass prompt pill with sun icon, prompt text and
 *    attach + generate buttons inside
 *
 * Server-rendered baseline: the typewriter animation cycling
 * `promptIdeas` is a client enhancement; the first idea is shown
 * statically so the bar reads naturally without JS.
 */
export default function HomeHeroPromptBlock({
  eyebrow,
  heading,
  headingLevel,
  lead,
  promptIdeas,
  primaryCta,
  showScrollCue = true,
  background,
}: HomeHeroPromptBlockProps) {
  const firstIdea = promptIdeas?.[0];
  const headingTag = getHeadingLevel(headingLevel, "h1");
  const hasBackground = Boolean(background?.video || background?.poster);
  return (
    <section
      className={cinematicStage({})}
      style={{ minHeight: "100svh" }}
    >
      {hasBackground ? (
        // Inline z-index defeats `.cinematic-stage > * { z-index: 2 }` so the
        // footage sits behind the headline/prompt bar but over the aurora.
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <MediaAsset
            image={background?.poster}
            videoUrl={background?.video}
            width={1920}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ) : null}
      <div
        className="flex min-h-[100svh] items-center justify-center px-0 py-[clamp(4rem,3.55rem+2.23vw,5.25rem)]"
      >
        <div
          className={pageContainer({ size: "lg" })}
          style={{ width: "100%" }}
        >
          <div className="flex flex-col items-center text-center">
            {eyebrow ? (
              <span
                className="mb-[1.375rem] text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/85"
              >
                {eyebrow}
              </span>
            ) : null}
            {renderHeading(
              headingTag,
              cn(headingLevelStyles[headingTag], "max-w-[16ch] font-sans text-white text-balance [text-shadow:0_2px_40px_rgba(0,0,0,0.25)]"),
              heading,
            )}
            {lead ? (
              <p
                className="mt-[1.375rem] max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-white/80 text-pretty"
              >
                {lead}
              </p>
            ) : null}
            {firstIdea ? (
              <PromptBar
                idea={firstIdea}
                cta={primaryCta}
              />
            ) : primaryCta?.label && primaryCta.href ? (
              <a
                href={primaryCta.href}
                className={cn(button({ variant: "onCinematic", size: "lg", shape: "pill" }), "mt-[clamp(3rem,2.73rem+1.34vw,3.75rem)]")}
              >
                {primaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
      {showScrollCue ? <ScrollCue /> : null}
    </section>
  );
}

function PromptBar({ idea, cta }: { idea: string; cta?: CtaLink }) {
  return (
    <div
      role="search"
      className="mt-[2.75rem] flex w-full max-w-[45rem] items-center gap-[0.875rem] rounded-full border border-white/85 bg-white/60 py-3 pe-3 ps-[1.375rem] text-start shadow-[var(--shadow-amb)] backdrop-blur-[36px] backdrop-saturate-[180%]"
    >
      <SunIcon />
      <span
        className="min-h-6 flex-1 text-[1.08rem] leading-[1.4] text-[var(--ink)]/85"
      >
        {idea}
        <span
          aria-hidden
          className="ms-px inline-block h-[1.1em] w-0.5 bg-[var(--a2)] align-[-2px]"
        />
      </span>
      <button
        type="button"
        aria-label="Attach"
        className="grid h-[2.625rem] w-[2.625rem] flex-none place-items-center rounded-full border border-[var(--line)] text-[var(--gray)] transition-colors duration-200 hover:bg-[var(--void-soft)] hover:text-[var(--ink)]"
      >
        <AttachIcon />
      </button>
      {cta?.label ? (
        <a
          href={cta.href || "#"}
          className={cn(button({ variant: "inverse", shape: "pill" }), "min-h-[3.25rem] px-[1.625rem] text-base")}
        >
          {cta.label}
          <ArrowIcon />
        </a>
      ) : null}
    </div>
  );
}

function ScrollCue() {
  return (
    <div
      className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/70"
    >
      <span>Scroll</span>
      <span
        aria-hidden
        className="h-[2.375rem] w-px bg-linear-to-b from-white/70 to-transparent"
      />
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="flex-none text-[var(--gray)]"
    >
      <path
        d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5l-8.5 8.5a5 5 0 01-7-7l8.5-8.5a3.3 3.3 0 014.7 4.7l-8.5 8.5a1.6 1.6 0 01-2.3-2.3l7.8-7.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
