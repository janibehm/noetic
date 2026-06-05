import { button, cinematicStage, cn } from "@/lib/styles";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";
import type { CtaLink } from "../types";

export type LabSpotlightBlockProps = {
  eyebrow?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  body?: string;
  cta?: CtaLink;
};

export default function LabSpotlightBlock({ eyebrow, heading, headingLevel, body, cta }: LabSpotlightBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <Reveal className="relative overflow-hidden rounded-[var(--r-xl)] px-[var(--pad)] py-[clamp(44px,7vw,96px)]">
          <div aria-hidden className={cn(cinematicStage({ tone: "spectral" }), "absolute inset-0 z-0")} />
          <div className="relative z-[3] max-w-[40ch]">
            {eyebrow ? <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-white/70">{eyebrow}</span> : null}
            {heading ? renderHeading(headingTag, "mt-3.5 mb-4 text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white", heading) : null}
            {body ? <p className="mb-[30px] text-white/85">{body}</p> : null}
            {cta?.label && cta.href ? (
              <a href={cta.href} className={button({ variant: "onCinematic", size: "lg", shape: "pill" })}>
                {cta.label}
                <ArrowIcon />
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}