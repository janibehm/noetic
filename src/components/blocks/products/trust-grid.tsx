import { cn } from "@/lib/styles";
import { Reveal } from "../reveal";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";

type TrustItem = {
  _key: string;
  icon?: "shield" | "lock" | "license";
  title?: string;
  body?: string;
};

export type ProductTrustGridBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  items?: TrustItem[];
};

export default function ProductTrustGridBlock({ heading, headingLevel, lead, items = [] }: ProductTrustGridBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="relative py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading || lead ? (
          <Reveal className="mx-auto mb-[clamp(36px,5vw,64px)] max-w-[60ch] text-center">
            {heading ? renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading) : null}
            {lead ? <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)]">{lead}</p> : null}
          </Reveal>
        ) : null}
        <div className="grid gap-[clamp(16px,2vw,24px)] md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal as="article" key={item._key} delay={(index % 3) as 0 | 1 | 2} className="rounded-[var(--r-lg)] p-8 shadow-[inset_0_0_0_1px_var(--line)]">
              <div className="mb-[22px] grid h-11 w-11 place-items-center rounded-xl bg-[var(--ink)] text-white">
                <TrustIcon icon={item.icon} />
              </div>
              {item.title ? <h3 className="mb-2 text-[1.2rem] font-semibold text-[var(--ink)]">{item.title}</h3> : null}
              {item.body ? <p className="text-[0.95rem] text-[var(--gray)]">{item.body}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustIcon({ icon = "shield" }: { icon?: TrustItem["icon"] }) {
  const paths = {
    shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" /></>,
    license: <path d="M5 7h14M5 12h14M5 17h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  };

  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[icon]}</svg>;
}