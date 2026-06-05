import { cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type ComparisonGroup = {
  _key: string;
  name?: string;
  rows?: { _key: string; feature?: string; values?: string[] }[];
};

export type PricingComparisonBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  plans?: string[];
  featuredPlanIndex?: number;
  groups?: ComparisonGroup[];
};

export default function PricingComparisonBlock({ heading, headingLevel, plans = [], featuredPlanIndex = 2, groups = [] }: PricingComparisonBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mx-auto mb-[clamp(30px,4vw,52px)] max-w-[50ch] text-center">
            {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading)}
          </Reveal>
        ) : null}
        <Reveal className="mt-[clamp(20px,3vw,40px)] overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th className="px-[18px] py-4 text-left" />
                {plans.map((plan, index) => (
                  <th key={plan} className={cn("w-[14%] px-[18px] py-4 text-center text-[0.95rem] font-semibold", index === featuredPlanIndex ? "text-[var(--a2)]" : "text-[var(--ink)]")}>
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => <GroupRows key={group._key} group={group} planCount={plans.length} />)}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function GroupRows({ group, planCount }: { group: ComparisonGroup; planCount: number }) {
  return (
    <>
      {group.name ? (
        <tr>
          <td colSpan={planCount + 1} className="bg-[var(--void-soft)] px-[18px] py-3 text-[var(--t-micro)] font-semibold uppercase tracking-[0.1em] text-[var(--gray)]">
            {group.name}
          </td>
        </tr>
      ) : null}
      {group.rows?.map((row) => (
        <tr key={row._key} className="hover:[&>td]:bg-[rgba(138,92,255,0.03)]">
          <td className="border-t border-[var(--line)] px-[18px] py-4 text-[0.92rem] font-medium text-[var(--ink)]">{row.feature}</td>
          {Array.from({ length: planCount }).map((_, index) => (
            <td key={`${row._key}-${index}`} className="border-t border-[var(--line)] px-[18px] py-4 text-center text-[0.92rem] text-[var(--ink-2)]">
              <ComparisonValue value={row.values?.[index]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function ComparisonValue({ value }: { value?: string }) {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "yes" || normalized === "true") return <span className="inline-flex justify-center text-[var(--ink)]"><CheckIcon /></span>;
  if (normalized === "no" || normalized === "false") return <span className="inline-flex justify-center text-[var(--line-2)]"><MinusIcon /></span>;
  return <>{value}</>;
}

function CheckIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MinusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}