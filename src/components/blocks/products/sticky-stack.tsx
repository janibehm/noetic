import { cn } from "@/lib/styles";
import { Reveal } from "../reveal";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { AuroraTone, SanityImageRef } from "../types";
import { StickyStackSync } from "./sticky-stack-sync";

export type StackStep = {
  _key: string;
  title?: string;
  body?: string;
  image?: SanityImageRef;
  auroraTone?: AuroraTone;
};

export type ProductStickyStackBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  steps?: StackStep[];
};

export default function ProductStickyStackBlock({ heading, headingLevel, lead, steps = [] }: ProductStickyStackBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="relative py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading || lead ? (
          <Reveal className="mb-[clamp(36px,5vw,64px)] max-w-[60ch]">
            {heading ? renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading) : null}
            {lead ? <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)]">{lead}</p> : null}
          </Reveal>
        ) : null}
        <StickyStackSync steps={steps} />
      </div>
    </section>
  );
}