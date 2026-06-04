import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, stackY } from "../../../../styled-system/recipes";

export type HowItWorksStep = {
  _key: string;
  title: string;
  body: string;
  icon?: string;
};

export type HomeHowItWorksBlockProps = {
  eyebrow?: string;
  heading: string;
  steps?: HowItWorksStep[];
};

/**
 * "Idea to export in three moves" — numbered step row with a
 * hairline connector running behind the circular step markers.
 */
export default function HomeHowItWorksBlock({
  eyebrow,
  heading,
  steps = [],
}: HomeHowItWorksBlockProps) {
  const cols = Math.min(steps.length || 1, 4);
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "xl", align: "center" })}>
          {eyebrow ? (
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              {eyebrow}
            </span>
          ) : null}
          <h2
            className={css({
              textStyle: "heading.h2",
              textAlign: "center",
              maxWidth: "measureWide",
            })}
          >
            {heading}
          </h2>
          <ol
            className={css({
              position: "relative",
              width: "100%",
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: `repeat(${cols}, 1fr)` },
              gap: { base: "xl", md: 0 },
              listStyle: "none",
              padding: 0,
              margin: 0,
              // Hairline connector between step icons (desktop only).
              _before: {
                content: '""',
                display: { base: "none", md: "block" },
                position: "absolute",
                top: "2.625rem", // half of 5.25rem (icon size)
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
                  gap: "xs",
                  paddingInline: { base: 0, md: "sm" },
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
                    marginBlockEnd: "sm",
                  })}
                  aria-hidden
                >
                  <StepIcon name={step.icon} />
                </span>
                <span
                  className={css({
                    textStyle: "label.sm",
                    color: "fg.subtle",
                  })}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={css({ textStyle: "heading.h4" })}>{step.title}</h3>
                <p
                  className={css({
                    textStyle: "body.md",
                    color: "fg.muted",
                    maxWidth: "28ch",
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
