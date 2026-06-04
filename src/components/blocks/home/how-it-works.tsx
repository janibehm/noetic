import { cn, pageContainer, pageSection } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";

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
  const headingTag = getHeadingLevel(headingLevel, "h2");
  return (
    <section className={pageSection({ space: "md" })}>
      <div className={pageContainer({ size: "xl" })}>
        <div className="text-center">
          {eyebrow ? (
            <span
              className="mb-[14px] block text-xs font-semibold uppercase leading-normal tracking-[0.06em] text-[var(--gray)]"
            >
              {eyebrow}
            </span>
          ) : null}
          {renderHeading(
            headingTag,
            cn(headingLevelStyles[headingTag], "mx-auto mb-[clamp(42px,6vw,72px)] max-w-[18ch]"),
            heading,
          )}
          <ol
            className="relative grid w-full list-none gap-12 p-0 m-0 before:hidden before:absolute before:left-[16%] before:right-[16%] before:top-[42px] before:z-0 before:h-px before:bg-[var(--line)] md:grid-cols-3 md:gap-0 md:before:block"
          >
            {steps.map((step, i) => (
              <li
                key={step._key}
                className="relative z-[1] flex flex-col items-center text-center md:px-[clamp(12px,2vw,30px)]"
              >
                <span
                  className="mb-7 grid h-[5.25rem] w-[5.25rem] place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)]"
                  aria-hidden
                >
                  <StepIcon name={step.icon} />
                </span>
                <span
                  className="mb-4 text-xs font-semibold uppercase leading-normal tracking-[0.06em] text-[var(--gray-soft)]"
                >
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mb-2.5 text-xl font-semibold leading-[1.2] tracking-[-0.02em]"
                >
                  {step.title}
                </h3>
                <p
                  className="mx-auto max-w-[28ch] text-[0.98rem] leading-[1.45] text-[var(--gray)]"
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
