import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection } from "../../../../styled-system/recipes";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";

export type HowItWorksStep = {
  _key: string;
  title: string;
  body: string;
  icon?: string;
};

export type HomeHowItWorksBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  steps?: HowItWorksStep[];
};

/**
 * "Idea to export in three moves" — numbered step row with a
 * hairline connector running behind the circular step markers.
 */
export default function HomeHowItWorksBlock({
  eyebrow,
  heading,
  headingLevel,
  steps = [],
}: HomeHowItWorksBlockProps) {
  const Heading = getHeadingLevel(headingLevel, "h2");
  return (
    <section className={pageSection({ space: "md" })}>
      <div className={pageContainer({ size: "xl" })}>
        <div className={css({ textAlign: "center" })}>
          {eyebrow ? (
            <span
              className={css({
                display: "block",
                textStyle: "label.sm",
                color: "fg.muted",
                marginBlockEnd: "14px",
              })}
            >
              {eyebrow}
            </span>
          ) : null}
          <Heading
            className={css({
              ...headingLevelStyles[Heading],
              maxWidth: "18ch",
              marginInline: "auto",
              marginBlockEnd: "clamp(42px, 6vw, 72px)",
            })}
          >
            {heading}
          </Heading>
          <ol
            className={css({
              position: "relative",
              width: "100%",
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
              gap: { base: "48px", md: 0 },
              listStyle: "none",
              padding: 0,
              margin: 0,
              _before: {
                content: '""',
                display: { base: "none", md: "block" },
                position: "absolute",
                top: "42px",
                left: "16%",
                right: "16%",
                height: "1px",
                backgroundColor: "border.subtle",
                zIndex: 0,
              },
            })}
          >
            {steps.map((step, i) => (
              <li
                key={step._key}
                className={css({
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingInline: { base: 0, md: "clamp(12px, 2vw, 30px)" },
                })}
              >
                <span
                  className={css({
                    width: "5.25rem",
                    height: "5.25rem",
                    borderRadius: "circle",
                    backgroundColor: "bg.surface",
                    border: "subtle",
                    display: "grid",
                    placeItems: "center",
                    color: "fg.default",
                    marginBlockEnd: "28px",
                  })}
                  aria-hidden
                >
                  <StepIcon name={step.icon} />
                </span>
                <span
                  className={css({
                    textStyle: "label.sm",
                    color: "fg.subtle",
                    marginBlockEnd: "16px",
                  })}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={css({
                    fontSize: "1.25rem",
                    lineHeight: 1.2,
                    fontWeight: "semibold",
                    letterSpacing: "tighter",
                    marginBlockEnd: "10px",
                  })}
                >
                  {step.title}
                </h3>
                <p
                  className={css({
                    fontSize: "0.98rem",
                    lineHeight: 1.45,
                    color: "fg.muted",
                    maxWidth: "28ch",
                    marginInline: "auto",
                  })}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Tiny stroked icons used as default step markers. Kept inline so
 * the block renders without any client dependency.
 */
function StepIcon({ name }: { name?: string }) {
  switch (name) {
    case "grid":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "export":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "prompt":
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16M4 12h10M4 17h7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="18" cy="15" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}
