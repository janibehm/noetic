import { cinematicStage, cn } from "@/lib/styles";
import { getHeadingLevel, renderHeading, type HeadingLevel } from "../heading-level";
import { CardLink } from "../shared/card-link";
import { Reveal } from "../reveal";
import type { AuroraTone } from "../types";

type FeaturedAuthor = {
  name?: string;
  meta?: string;
  avatarUrl?: string;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type ResourcesFeaturedBlockProps = {
  badge?: string;
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  href?: string;
  imageUrl?: string;
  coverVideo?: string;
  auroraTone?: AuroraTone;
  author?: FeaturedAuthor;
};

export default function ResourcesFeaturedBlock({ badge, heading, headingLevel, lead, href = "#", imageUrl, coverVideo, auroraTone = "cool", author }: ResourcesFeaturedBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h1");

  return (
    <section className="pb-[clamp(48px,7vw,96px)] pt-[calc(var(--nav-h)+90px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        <div className="grid items-center gap-[clamp(28px,4vw,64px)] md:grid-cols-[1.2fr_1fr]">
          <Reveal className="photo relative aspect-[16/11] overflow-hidden rounded-[var(--r-lg)] bg-[var(--void-soft)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),var(--shadow-amb)]">
            {coverVideo ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={imageUrl}
                aria-hidden
              >
                <source src={coverVideo} />
              </video>
            ) : imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[auroraTone] }), "absolute inset-0")} />
            )}
          </Reveal>
          <Reveal delay={1}>
            {badge ? <span className="inline-block rounded-full bg-[var(--ink)] px-[11px] py-1 text-[var(--t-micro)] font-semibold leading-normal tracking-[0.04em] text-white">{badge}</span> : null}
            {heading ? (
              <CardLink href={href} className="block text-[var(--ink)] no-underline">
                {renderHeading(headingTag, "my-4 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] text-balance", heading)}
              </CardLink>
            ) : null}
            {lead ? <p className="max-w-[42ch] text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)] text-pretty">{lead}</p> : null}
            {author ? (
              <div className="mt-7 flex items-center gap-3">
                {author.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={author.avatarUrl} alt="" className="h-[42px] w-[42px] rounded-full object-cover" />
                ) : null}
                <div>
                  {author.name ? <div className="font-semibold text-[var(--ink)]">{author.name}</div> : null}
                  {author.meta ? <div className="text-[0.88rem] text-[var(--gray)]">{author.meta}</div> : null}
                </div>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}