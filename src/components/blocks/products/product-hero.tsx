import { button, cinematicStage, cn } from "@/lib/styles";
import { MediaAsset } from "../shared/media-asset";
import { Reveal } from "../reveal";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { AuroraTone, CtaLink, SanityImageRef } from "../types";

type DashboardItem = {
  _key: string;
  label?: string;
  color?: string;
};

type DashboardThumb = {
  _key: string;
  image?: SanityImageRef;
  video?: string;
  auroraTone?: AuroraTone;
  featured?: boolean;
};

export type ProductHeroBlockProps = {
  eyebrow?: string;
  heading: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  promptText?: string;
  dashboardItems?: DashboardItem[];
  thumbnails?: DashboardThumb[];
};

const DEFAULT_DASHBOARD_ITEMS: DashboardItem[] = [
  { _key: "generate", label: "Generate" },
  { _key: "editing", label: "Editing Studio", color: "#3ba2ff" },
  { _key: "brand", label: "Brand Assets", color: "#45e0c8" },
  { _key: "workflows", label: "Workflows", color: "#ff6fae" },
  { _key: "library", label: "Library", color: "#c6ff7a" },
];

const DEFAULT_THUMBS: DashboardThumb[] = [
  { _key: "a", featured: true, auroraTone: "warm" },
  { _key: "b", auroraTone: "warm" },
  { _key: "c", auroraTone: "default" },
  { _key: "d", auroraTone: "cool" },
  { _key: "e", auroraTone: "cool" },
];

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export default function ProductHeroBlock({
  eyebrow,
  heading,
  headingLevel,
  lead,
  primaryCta,
  secondaryCta,
  promptText = "a cinematic product shot of a glass perfume bottle on wet stone...",
  dashboardItems = DEFAULT_DASHBOARD_ITEMS,
  thumbnails = DEFAULT_THUMBS,
}: ProductHeroBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h1");

  return (
    <section className="relative overflow-hidden px-[var(--pad)] pb-[clamp(48px,7vw,96px)] pt-[calc(var(--nav-h)+90px)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] z-0 h-[80%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(138,92,255,.16),rgba(59,162,255,.10)_40%,transparent_70%)] blur-[20px]"
      />
      <div className="relative z-[2] mx-auto w-full max-w-[var(--maxw)]">
        {eyebrow ? (
          <Reveal className="flex justify-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]">
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--aurora-line)]" />
              {eyebrow}
            </span>
          </Reveal>
        ) : null}
        <Reveal delay={1}>
          {renderHeading(
            headingTag,
            cn(headingLevelStyles[headingTag], "mx-auto mt-[18px] max-w-[18ch] text-[var(--ink)]"),
            heading,
          )}
        </Reveal>
        {lead ? (
          <Reveal as="p" delay={2} className="mx-auto mt-[22px] max-w-[50ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">
            {lead}
          </Reveal>
        ) : null}
        {(primaryCta?.label && primaryCta.href) || (secondaryCta?.label && secondaryCta.href) ? (
          <Reveal delay={3} className="mt-9 flex flex-wrap justify-center gap-3">
            {primaryCta?.label && primaryCta.href ? (
              <a href={primaryCta.href} className={button({ variant: "inverse", size: "lg", shape: "pill" })}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta?.label && secondaryCta.href ? (
              <a href={secondaryCta.href} className={button({ variant: "outline", size: "lg", shape: "pill" })}>
                {secondaryCta.label}
              </a>
            ) : null}
          </Reveal>
        ) : null}
        <Reveal delay={2}>
          <DashboardMockup items={dashboardItems} promptText={promptText} thumbnails={thumbnails} />
        </Reveal>
      </div>
    </section>
  );
}

function DashboardMockup({
  items,
  promptText,
  thumbnails,
}: {
  items: DashboardItem[];
  promptText: string;
  thumbnails: DashboardThumb[];
}) {
  return (
    <div className="relative mx-auto mt-[clamp(50px,7vw,90px)] aspect-[16/9.6] w-full max-w-[1120px] overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-float)]">
      <div aria-hidden className={cn(cinematicStage({ tone: "cool" }), "absolute inset-0 z-0")} />
      <div className="absolute inset-0 z-[3] grid grid-cols-1 md:grid-cols-[210px_1fr]">
        <aside className="hidden flex-col gap-[7px] bg-white/55 p-4 shadow-[inset_-1px_0_0_var(--glass-edge)] backdrop-blur-[36px] md:flex">
          <span className="mb-4 inline-flex items-center gap-[9px] text-base font-semibold tracking-[-0.03em] text-[var(--ink)]">
            <span className="grid place-items-center">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 16V8l10 8V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            noetic
          </span>
          {items.map((item, index) => (
            <div
              key={item._key}
              className={cn(
                "flex items-center gap-2.5 rounded-[11px] px-3 py-[9px] text-[0.85rem] text-[var(--ink-2)]",
                index === 0 && "bg-white/70 font-[550] shadow-[inset_0_0_0_1px_var(--glass-edge)]",
              )}
            >
              <span
                className="h-4 w-4 rounded-[5px] bg-[var(--aurora-line)] opacity-85"
                style={item.color ? { background: item.color } : undefined}
              />
              {item.label}
            </div>
          ))}
        </aside>
        <div className="flex flex-col gap-3.5 p-[18px]">
          <div className="flex h-11 items-center gap-3 rounded-full bg-white/60 py-0 pl-[18px] pr-2 shadow-[inset_0_0_0_1px_var(--glass-edge)] backdrop-blur-[36px]">
            <span className="flex-1 truncate text-left text-[0.82rem] text-[var(--gray)]">{promptText}</span>
            <span className="grid h-[30px] place-items-center rounded-full bg-[var(--ink)] px-3.5 text-[0.78rem] text-white">Generate</span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2.5 md:grid-cols-4">
            {thumbnails.map((thumb) => (
              <DashboardThumb key={thumb._key} thumb={thumb} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardThumb({ thumb }: { thumb: DashboardThumb }) {
  const hasMedia = Boolean(thumb.video || thumb.image);
  return (
    <div className={cn("relative overflow-hidden rounded-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.4)]", thumb.featured && "col-span-2 row-span-2")}>
      {hasMedia ? (
        <MediaAsset image={thumb.image} videoUrl={thumb.video} width={700} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[thumb.auroraTone ?? "default"] }), "absolute inset-0 blur-[22px] saturate-150")} />
      )}
    </div>
  );
}