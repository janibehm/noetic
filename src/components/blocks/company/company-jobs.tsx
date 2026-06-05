import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type Job = {
  _key: string;
  title?: string;
  team?: string;
  location?: string;
  href?: string;
};

export type CompanyJobsBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  jobs?: Job[];
};

export default function CompanyJobsBlock({ heading, headingLevel, jobs = [] }: CompanyJobsBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");
  if (!jobs.length) return null;

  return (
    <section className="py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mb-[clamp(30px,4vw,52px)]">
            {renderHeading(headingTag, headingLevelStyles[headingTag], heading)}
          </Reveal>
        ) : null}
        <Reveal className="flex flex-col">
          {jobs.map((job) => (
            <a key={job._key} href={job.href || "#"} className="group flex items-center gap-5 border-t border-[var(--line)] px-1 py-[26px] text-[var(--ink)] no-underline transition-[padding] duration-400 ease-[var(--ease-spring)] last:border-b hover:pl-3.5 max-[640px]:flex-wrap max-[640px]:gap-3">
              {job.title ? <span className="text-xl font-[550] leading-[1.25] tracking-[-0.02em]">{job.title}</span> : null}
              <span className="ml-auto flex items-center gap-2.5 max-[640px]:ml-0 max-[640px]:w-full">
                {job.team ? <span className="inline-flex items-center rounded-full bg-white/60 px-3.5 py-[7px] text-sm leading-none shadow-[inset_0_0_0_1px_var(--line)] whitespace-nowrap">{job.team}</span> : null}
                {job.location ? <span className="inline-flex items-center rounded-full bg-white/60 px-3.5 py-[7px] text-sm leading-none shadow-[inset_0_0_0_1px_var(--line)] whitespace-nowrap">{job.location}</span> : null}
                <span className="grid h-[42px] w-[42px] place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-[background,color,box-shadow] duration-300 group-hover:bg-[var(--ink)] group-hover:text-white group-hover:shadow-none" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}