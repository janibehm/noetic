import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type CompanyStat = {
  _key: string;
  value?: string;
  label?: string;
};

export type CompanyHeroBlockProps = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  stats?: CompanyStat[];
};

export default function CompanyHeroBlock({ eyebrow, heading, highlight, headingLevel, lead, stats = [] }: CompanyHeroBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h1");
  const headingContent = heading && highlight && heading.includes(highlight) ? (
    <>{heading.slice(0, heading.indexOf(highlight))}<span className="grad-text">{highlight}</span>{heading.slice(heading.indexOf(highlight) + highlight.length)}</>
  ) : heading;

  return (
    <section className="pb-[clamp(50px,7vw,90px)] pt-[calc(var(--nav-h)+120px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {eyebrow ? (
          <Reveal className="mb-6 flex items-center gap-3">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
            <span className="text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">{eyebrow}</span>
          </Reveal>
        ) : null}
        {headingContent ? (
          <Reveal delay={1}>
            {renderHeading(headingTag, "mt-[18px] max-w-[18ch] text-[clamp(2.4rem,5.6vw,5rem)] font-bold leading-none tracking-[-0.04em] text-[var(--ink)] text-balance", headingContent)}
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal as="p" delay={2} className="mt-[26px] max-w-[50ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
        {stats.length ? (
          <Reveal delay={2} className="mt-[clamp(50px,7vw,90px)] grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--line)] pt-10 min-[680px]:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat._key}>
                {stat.value ? <span className="block text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-[var(--ink)]">{stat.value}</span> : null}
                {stat.label ? <span className="mt-1.5 block text-sm leading-normal text-[var(--gray)]">{stat.label}</span> : null}
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}