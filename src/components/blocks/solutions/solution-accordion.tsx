"use client";

import { useState } from "react";
import { cinematicStage, cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { Reveal } from "../reveal";
import type { AuroraTone } from "../types";

type AccordionItem = {
  _key: string;
  title?: string;
  body?: string;
  imageUrl?: string;
  auroraTone?: AuroraTone;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type SolutionAccordionBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  items?: AccordionItem[];
};

export default function SolutionAccordionBlock({ heading, headingLevel, items = [] }: SolutionAccordionBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mb-[clamp(36px,5vw,64px)] max-w-[60ch]">
            {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading)}
          </Reveal>
        ) : null}
        <Reveal className="grid items-center gap-[clamp(30px,5vw,80px)] md:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col">
            {items.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item._key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="border-t border-[var(--line)] py-[26px] text-left last:border-b"
                >
                  <div className="text-[var(--t-micro)] font-semibold uppercase tracking-[0.1em] text-[var(--gray-soft)]">{String(index + 1).padStart(2, "0")}</div>
                  {item.title ? <h3 className={cn("text-[clamp(1.5rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] transition-colors duration-400", active ? "text-[var(--ink)]" : "text-[var(--gray-soft)] max-md:text-[var(--ink)]")}>{item.title}</h3> : null}
                  <div className={cn("grid transition-[grid-template-rows] duration-400", active ? "grid-rows-[1fr]" : "grid-rows-[0fr] max-md:grid-rows-[1fr]")}>
                    <div className="overflow-hidden">
                      {item.body ? <p className={cn("mt-3 max-w-[44ch] text-[var(--gray)] transition-opacity duration-400", active ? "opacity-100" : "opacity-0 max-md:opacity-100")}>{item.body}</p> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-amb)]">
            {items.map((item, index) => <AccordionMedia key={`${item._key}-media`} item={item} active={index === activeIndex} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AccordionMedia({ item, active }: { item: AccordionItem; active: boolean }) {
  return (
    <div className={cn("absolute inset-0 transition-opacity duration-[800ms] ease-[var(--ease-out)]", active ? "opacity-100" : "opacity-0")}>
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[item.auroraTone ?? "default"] }), "absolute inset-0")} />
      )}
    </div>
  );
}