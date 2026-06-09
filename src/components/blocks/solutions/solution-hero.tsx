import { button, cinematicStage, cn } from "@/lib/styles";
import { MediaAsset } from "../shared/media-asset";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";
import type { CtaLink } from "../types";

export type SolutionHeroBlockProps = {
  eyebrow?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  cardHeading?: string;
  cardBody?: string;
  cta?: CtaLink;
  /** Resolved video asset URL (projected via `backgroundVideo.asset->url`). */
  backgroundVideo?: string | null;
};

export default function SolutionHeroBlock({ eyebrow, heading, headingLevel, lead, cardHeading, cardBody, cta, backgroundVideo }: SolutionHeroBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h1");

  return (
    <section className="pt-[calc(var(--nav-h)+80px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <Reveal className="max-w-[820px]">
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
              <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">{eyebrow}</span>
            </div>
          ) : null}
          {heading ? renderHeading(headingTag, cn(headingLevelStyles[headingTag], "mt-[18px] max-w-[18ch] text-[clamp(2.6rem,5.2vw,4.6rem)] text-[var(--ink)]"), heading) : null}
        </Reveal>
        {lead ? (
          <Reveal as="p" delay={1} className="mt-[22px] max-w-[52ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
        <Reveal delay={1} className="relative mt-[clamp(40px,5vw,64px)] aspect-[16/8] overflow-hidden rounded-[var(--r-xl)] shadow-[var(--shadow-float)] max-md:aspect-[4/3]">
          <div aria-hidden className={cn(cinematicStage({ tone: "spectral" }), "absolute inset-0")} />
          {backgroundVideo ? (
            <MediaAsset videoUrl={backgroundVideo} className="absolute inset-0 z-[1] h-full w-full object-cover" />
          ) : null}
          <div className="glass-strong absolute bottom-[clamp(18px,3vw,40px)] left-[clamp(18px,3vw,40px)] z-[5] w-[min(420px,78%)] rounded-[var(--r-lg)] p-[30px]">
            {cardHeading ? <h2 className="mb-3 text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">{cardHeading}</h2> : null}
            {cardBody ? <p className="mb-[22px] text-[0.98rem] text-[var(--ink-2)]">{cardBody}</p> : null}
            {cta?.label && cta.href ? (
              <a href={cta.href} className={button({ variant: "inverse", size: "md", shape: "pill" })}>
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
  return <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}