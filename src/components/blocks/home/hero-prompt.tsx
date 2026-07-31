import { button, cinematicStage, cn, pageContainer } from "@/lib/styles";
import { MediaAsset } from "../shared/media-asset";
import { PromptTypewriter } from "./prompt-typewriter";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import type { CtaLink, SanityImageRef } from "../types";

export type HomeHeroPromptBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  promptIdeas?: string[];
  primaryCta?: CtaLink;
  background?: {
    video?: string;
    poster?: SanityImageRef;
  };
};

/**
 * Home hero — full-bleed cinematic stage with a glass prompt pill.
 *
 * Mirrors the proportions from `noetic_CLAUDE_DESIGN/index.html`:
 *  - mega display headline with line-height ~1
 *  - 720px glass prompt pill with sun icon, prompt text and
 *    attach + generate buttons inside
 *
 * `eyebrow` and `lead` stay on the props type so the Sanity block shape is
 * unchanged, but neither renders — the hero is headline + prompt bar only.
 *
 * Server-rendered baseline: the typewriter animation cycling
 * `promptIdeas` is a client enhancement; the first idea is shown
 * statically so the bar reads naturally without JS.
 */
export default function HomeHeroPromptBlock({
  heading,
  headingLevel,
  promptIdeas,
  primaryCta,
  background,
}: HomeHeroPromptBlockProps) {
  const firstIdea = promptIdeas?.[0];
  const headingTag = getHeadingLevel(headingLevel, "h1");
  // Hero trial: the headline is sized so the hard break below is the only
  // thing that ever splits it — `whitespace-nowrap` forbids reflow, so the
  // size has to guarantee the longer line fits its container at any width.
  //
  // That line ("ready visuals in seconds.") measures 10.72em from Graphik
  // Medium's advance widths at this tracking. The container is
  // `min(72rem, 100vw)` minus 2×`--pad` (`clamp(20px, 5vw, 80px)`), so the
  // binding cases are ~90vw of text in the fluid range → 90/10.72 ≈ 8.3vw,
  // and a fixed 992px once both the container and padding cap out →
  // 992/10.72 ≈ 92px. `min(8.1vw, 5.7rem)` sits just inside both.
  //
  // Deliberately not the shared h1 scale: this drops the `clamp()` floor so
  // the headline keeps shrinking on narrow phones rather than wrapping.
  const headingClass = "text-[min(8.1vw,5.7rem)] leading-[0.96] tracking-[-0.045em] font-medium whitespace-nowrap";
  // Break after the hyphen so the headline always sets as exactly two
  // lines — "Generate production-" / "ready visuals in seconds." — and
  // keep "in" glued to "visuals" if the second line ever has to wrap on
  // a narrow viewport.
  const hyphen = heading.indexOf("-");
  const headingContent =
    hyphen === -1 ? (
      heading
    ) : (
      <>
        {heading.slice(0, hyphen + 1)}
        <br />
        {heading.slice(hyphen + 1).replace(/ in /g, " in ")}
      </>
    );
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
            preload="auto"
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
            {renderHeading(
              headingTag,
              cn(headingClass, "font-sans text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.25)]"),
              headingContent,
            )}
            {firstIdea ? (
              <PromptBar
                ideas={promptIdeas ?? []}
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
    </section>
  );
}

function PromptBar({ ideas, cta }: { ideas: string[]; cta?: CtaLink }) {
  return (
    <div
      role="search"
      className="mt-[2.75rem] hidden w-full max-w-[45rem] items-center gap-[0.875rem] rounded-full border border-white/85 bg-white/60 py-3 pe-3 ps-[1.375rem] text-start shadow-[var(--shadow-amb)] backdrop-blur-[36px] backdrop-saturate-[180%] sm:flex"
    >
      <SunIcon />
      <PromptTypewriter
        ideas={ideas}
        className="min-h-6 flex-1 text-[1.08rem] leading-[1.4] text-[var(--ink)]/85"
      />
      <button
        type="button"
        aria-label="Attach"
        // Filled by default — what used to be the hover state is now the
        // resting one, so the button reads as a solid white circle against
        // the glass. Hover keeps a step to stay a visible affordance.
        className="grid h-[2.625rem] w-[2.625rem] flex-none place-items-center rounded-full border border-[var(--line)] bg-[var(--void-soft)] text-[var(--ink)] transition-colors duration-200 hover:bg-white"
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
