import { cinematicStage, cn } from "@/lib/styles";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { CardLink } from "../shared/card-link";
import { Reveal } from "../reveal";
import type { AuroraTone } from "../types";

type LabArticleCard = {
  _key: string;
  title?: string;
  tag?: string;
  category?: string;
  meta?: string;
  href?: string;
  imageUrl?: string;
  auroraTone?: AuroraTone;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type LabArticleGridBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  countLabel?: string;
  layout?: "featured" | "masonry";
  items?: LabArticleCard[];
};

export default function LabArticleGridBlock({ heading, headingLevel, countLabel, layout = "masonry", items = [] }: LabArticleGridBlockProps) {
  if (!items.length) return null;
  const headingTag = getHeadingLevel(headingLevel, "h2");
  const isFeatured = layout === "featured";

  return (
    <section className="py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading ? (
          <Reveal className="mb-[clamp(26px,3vw,40px)] flex items-baseline gap-4">
            {renderHeading(headingTag, "text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]", heading)}
            {countLabel ? <span className="text-sm leading-normal text-[var(--gray-soft)]">{countLabel}</span> : null}
          </Reveal>
        ) : null}
        {isFeatured ? <FeaturedGrid items={items} /> : <MasonryGrid items={items} />}
      </div>
    </section>
  );
}

function FeaturedGrid({ items }: { items: LabArticleCard[] }) {
  const [lead, ...sideItems] = items;
  return (
    <div className="grid items-stretch gap-[clamp(16px,2vw,26px)] md:grid-cols-[1.4fr_1fr]">
      {lead ? (
        <Reveal className="flex flex-col">
          <LabCard card={lead} featured />
        </Reveal>
      ) : null}
      {sideItems.length ? (
        <div className="flex flex-col gap-[clamp(16px,2vw,26px)]">
          {sideItems.map((item, index) => (
            <Reveal key={item._key} delay={((index + 1) % 4) as 0 | 1 | 2 | 3} className="flex flex-1 flex-col">
              <LabCard card={item} compact />
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MasonryGrid({ items }: { items: LabArticleCard[] }) {
  return (
    <div className="columns-[280px] gap-[clamp(16px,2vw,26px)] [column-count:3] max-lg:[column-count:2] max-sm:[column-count:1]">
      {items.map((item, index) => (
        <Reveal key={item._key} delay={(index % 4) as 0 | 1 | 2 | 3} className="mb-[clamp(16px,2vw,26px)] inline-block w-full break-inside-avoid">
          <LabCard card={item} />
        </Reveal>
      ))}
    </div>
  );
}

function LabCard({ card, featured = false, compact = false }: { card: LabArticleCard; featured?: boolean; compact?: boolean }) {
  const href = card.href || "#";
  // `featured`/`compact` cards belong to the first "featured"-layout grid,
  // which sits above the fold — eager-load them (lead card high priority)
  // and lazy-load everything in the masonry grids below.
  const aboveFold = featured || compact;
  return (
    <CardLink href={href} className="group relative inline-block w-full cursor-pointer text-[var(--ink)] no-underline">
      <div className={cn("photo relative mb-3 overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]", featured ? "min-h-80 flex-1 max-md:aspect-video max-md:min-h-0" : compact ? "flex-1 max-md:aspect-video" : "aspect-[4/3]")}> 
        {card.tag ? (
          <span className="absolute left-3 top-3 z-[4] inline-flex h-7 items-center rounded-full bg-white/25 px-3 text-[0.72rem] font-semibold leading-none tracking-[0.04em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-[14px]">
            {card.tag}
          </span>
        ) : null}
        {card.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.imageUrl} alt="" loading={aboveFold ? "eager" : "lazy"} fetchPriority={featured ? "high" : "auto"} decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.06]" />
        ) : (
          <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[card.auroraTone ?? "default"] }), "absolute inset-0 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.06]")} />
        )}
      </div>
      {(card.category || card.meta) && featured ? (
        <div className="mb-[9px] flex items-center gap-2.5 text-sm leading-normal text-[var(--gray)]">
          {card.category ? <span>{card.category}</span> : null}
          {card.category && card.meta ? <span>·</span> : null}
          {card.meta ? <span>{card.meta}</span> : null}
        </div>
      ) : null}
      {card.title ? <h3 className={cn("font-medium leading-[1.3] tracking-[-0.02em] text-[var(--ink)] transition-transform duration-400 ease-[var(--ease-spring)] group-hover:-translate-y-1", featured ? "text-2xl" : "text-[1.04rem]")}>{card.title}</h3> : null}
    </CardLink>
  );
}