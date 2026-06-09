"use client";

import { useState } from "react";
import { cinematicStage, cn } from "@/lib/styles";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import { CardLink } from "../shared/card-link";
import { Reveal } from "../reveal";
import type { AuroraTone } from "../types";

type ResourceItem = {
  _key: string;
  title?: string;
  category?: string;
  href?: string;
  imageUrl?: string;
  auroraTone?: AuroraTone;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type ResourcesLibraryBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  items?: ResourceItem[];
};

export default function ResourcesLibraryBlock({ heading, headingLevel, items = [] }: ResourcesLibraryBlockProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const headingTag = getHeadingLevel(headingLevel, "h2");
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[];
  const visibleItems = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

  if (!items.length) return null;

  return (
    <section className="py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mb-[clamp(30px,4vw,48px)]">
            {renderHeading(headingTag, cn(headingLevelStyles[headingTag], "text-[var(--ink)]"), heading)}
          </Reveal>
        ) : null}
        <Reveal className="mb-[clamp(30px,4vw,48px)] flex flex-wrap gap-2.5" role="group" aria-label="Filter resources">
          <FilterButton label="All" active={activeCategory === "all"} onClick={() => setActiveCategory("all")} />
          {categories.map((category) => (
            <FilterButton key={category} label={category} active={activeCategory === category} onClick={() => setActiveCategory(category)} />
          ))}
        </Reveal>
        <Reveal className="grid gap-[clamp(16px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visibleItems.map((item) => <ResourceCard key={item._key} item={item} />)}
        </Reveal>
      </div>
    </section>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-[34px] items-center justify-center rounded-full px-4 text-[var(--t-small)] font-medium leading-none shadow-[inset_0_0_0_1px_var(--line)] transition-[background,color,box-shadow] duration-300 hover:shadow-[inset_0_0_0_1px_var(--gray-soft)]",
        active ? "bg-[var(--ink)] text-white shadow-none" : "bg-white/55 text-[var(--ink)]",
      )}
    >
      {label}
    </button>
  );
}

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <CardLink href={item.href || "#"} className="group block text-[var(--ink)] no-underline">
      <div className="photo relative mb-3.5 aspect-[16/11] overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.05]" />
        ) : (
          <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[item.auroraTone ?? "default"] }), "absolute inset-0 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.05]")} />
        )}
      </div>
      {item.category ? <div className="mb-[9px] flex items-center gap-2.5 text-sm leading-normal text-[var(--gray)]">{item.category}</div> : null}
      {item.title ? <h3 className="text-[1.12rem] font-[550] leading-[1.3] tracking-[-0.02em] text-[var(--ink)]">{item.title}</h3> : null}
    </CardLink>
  );
}