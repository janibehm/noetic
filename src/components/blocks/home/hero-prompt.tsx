import { css } from "../../../../styled-system/css";
import {
  pageContainer,
  button,
  cinematicStage,
} from "../../../../styled-system/recipes";
import type { CtaLink, SanityImageRef } from "../types";

export type HomeHeroPromptBlockProps = {
  eyebrow?: string;
  heading: string;
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
  lead,
  promptIdeas,
  primaryCta,
  showScrollCue = true,
}: HomeHeroPromptBlockProps) {
  const firstIdea = promptIdeas?.[0];
  return (
    <section
      className={cinematicStage({})}
      style={{ minHeight: "100svh" }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100svh",
          paddingBlock: "2xl",
          paddingInline: { base: "sm", md: "md", lg: "lg" },
        })}
      >
        <div
          className={pageContainer({ size: "lg" })}
          style={{ width: "100%" }}
        >
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            })}
          >
            {eyebrow ? (
              <span
                className={css({
                  // Match `.hero-kicker` exactly (0.72rem, 0.18em tracking).
                  fontSize: "0.72rem",
                  fontWeight: "semibold",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "fg.onCinematic",
                  opacity: 0.85,
                  marginBlockEnd: "1.375rem", // 22px in original
                })}
              >
                {eyebrow}
              </span>
            ) : null}
            <h1
              className={css({
                fontFamily: "sans",
                fontWeight: "bold",
                fontSize: "clamp(2.6rem, 6.4vw, 6rem)",
                lineHeight: "0.96",
                letterSpacing: "-0.045em",
                color: "fg.onCinematic",
                // Slightly wider than the original 16ch so `text-wrap:
                // balance` can pull the trailing word up and avoid an
                // orphan line on wide viewports.
                maxWidth: "20ch",
                textWrap: "balance",
                textShadow: "0 2px 40px rgba(0,0,0,0.25)",
              })}
            >
              {heading}
            </h1>
            {lead ? (
              <p
                className={css({
                  marginBlockStart: "1.375rem", // 22px in original
                  // Match `--t-lead`: clamp(1.1rem, 1.5vw, 1.45rem).
                  fontSize: "clamp(1.1rem, 1.5vw, 1.45rem)",
                  lineHeight: "1.45",
                  color: "fg.onCinematic",
                  opacity: 0.82,
                  maxWidth: "46ch",
                  textWrap: "pretty",
                })}
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
                className={
                  button({ variant: "onCinematic", size: "lg", shape: "pill" }) +
                  " " +
                  css({ marginBlockStart: "xl" })
                }
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
      className={css({
        width: "100%",
        maxWidth: "45rem", // matches original min(720px, 100%)
        marginBlockStart: "2.75rem", // 44px in original
        // Original padding: 12px 12px 12px 22px
        paddingInlineStart: "1.375rem",
        paddingInlineEnd: "0.75rem",
        paddingBlock: "0.75rem",
        borderRadius: "pill",
        display: "flex",
        alignItems: "center",
        gap: "0.875rem", // 14px in original
        backgroundColor: "glass",
        border: "1px solid",
        borderColor: "glass",
        backdropFilter: "blur(36px) saturate(180%)",
        boxShadow: "ambient",
        textAlign: "start",
      })}
    >
      <SunIcon />
      <span
        className={css({
          flex: 1,
          fontSize: "1.08rem",
          lineHeight: "1.4",
          color: "fg.default",
          minHeight: "1.5rem",
          opacity: 0.85,
        })}
      >
        {idea}
        <span
          aria-hidden
          className={css({
            display: "inline-block",
            width: "2px",
            height: "1.1em",
            marginInlineStart: "1px",
            verticalAlign: "-2px",
            backgroundColor: "{colors.aurora.violet}",
          })}
        />
      </span>
      <button
        type="button"
        aria-label="Attach"
        className={css({
          flex: "none",
          width: "2.625rem",
          height: "2.625rem",
          borderRadius: "circle",
          display: "grid",
          placeItems: "center",
          color: "fg.muted",
          border: "1px solid",
          borderColor: "border.subtle",
          backgroundColor: "transparent",
          cursor: "pointer",
          transitionProperty: "background-color, color",
          transitionDuration: "base",
          transitionTimingFunction: "standard",
          _hover: { backgroundColor: "bg.subtle", color: "fg.default" },
        })}
      >
        <AttachIcon />
      </button>
      {cta?.label ? (
        <a
          href={cta.href || "#"}
          className={
            button({ variant: "inverse", shape: "pill" }) +
            " " +
            // Match original `.btn` height: 52px, padding-inline 26px.
            css({
              minHeight: "3.25rem",
              paddingInline: "1.625rem",
              fontSize: "1rem",
            })
          }
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
      className={css({
        position: "absolute",
        bottom: "lg",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2xs",
        color: "fg.onCinematic",
        opacity: 0.7,
        fontSize: "2xs",
        fontWeight: "semibold",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      })}
    >
      <span>Scroll</span>
      <span
        aria-hidden
        className={css({
          width: "1px",
          height: "2.375rem",
          background: "linear-gradient(rgba(255,255,255,0.7), transparent)",
        })}
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
      className={css({ flex: "none", color: "fg.muted" })}
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
