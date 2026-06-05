import { cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";

type FaqItem = { _key: string; question?: string; answer?: string };

export type PricingFaqBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  items?: FaqItem[];
};

export default function PricingFaqBlock({ heading, headingLevel, items = [] }: PricingFaqBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="py-[clamp(72px,11vw,160px)] pt-0">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mx-auto mb-[clamp(30px,4vw,52px)] max-w-[50ch] text-center">
            {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading)}
          </Reveal>
        ) : null}
        <Reveal className="mx-auto max-w-[760px]">
          {items.map((item) => (
            <details key={item._key} className="group border-t border-[var(--line)] py-1 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-[1.1rem] font-medium tracking-[-0.01em] text-[var(--ink)] marker:hidden [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="relative h-[26px] w-[26px] flex-none before:absolute before:left-1 before:right-1 before:top-3 before:h-[1.5px] before:bg-[var(--ink-2)] after:absolute after:bottom-1 after:left-3 after:top-1 after:w-[1.5px] after:bg-[var(--ink-2)] after:transition-transform after:duration-300 after:ease-[var(--ease-spring)] group-open:after:scale-y-0" />
              </summary>
              {item.answer ? <div className="max-w-[64ch] pb-6 leading-[1.6] text-[var(--gray)]">{item.answer}</div> : null}
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}