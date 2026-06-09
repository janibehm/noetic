import { cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

export type LabHeroBlockProps = {
  eyebrow?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
};

export default function LabHeroBlock({ eyebrow, heading, headingLevel, lead }: LabHeroBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h1");

  return (
    <section className="pb-0 pt-[calc(var(--nav-h)+110px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {eyebrow ? (
          <Reveal className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
            <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">{eyebrow}</span>
          </Reveal>
        ) : null}
        {heading ? (
          <Reveal delay={1}>
            {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "mt-5 text-[clamp(3rem,9vw,8rem)] leading-[0.92] text-[var(--ink)]"), heading)}
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal as="p" delay={2} className="mt-[22px] max-w-[54ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}