import { cinematicStage, cn } from "@/lib/styles";
import { sanityImageProps } from "@/lib/sanity-image";
import { CardLink } from "../shared/card-link";
import { Reveal } from "../reveal";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { AuroraTone, SanityImageRef } from "../types";

type ProductCard = {
  _key: string;
  title?: string;
  body?: string;
  href?: string;
  image?: SanityImageRef;
  auroraTone?: AuroraTone;
};

const AURORA_TONE = {
  default: "spectral",
  cool: "cool",
  warm: "warm",
} as const;

export type ProductCardGridBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  items?: ProductCard[];
};

export default function ProductCardGridBlock({ heading, headingLevel, lead, items = [] }: ProductCardGridBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");

  return (
    <section className="relative py-[clamp(72px,11vw,160px)]">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--pad)]">
        {heading || lead ? (
          <Reveal className="mb-[clamp(36px,5vw,64px)] max-w-[60ch]">
            {heading ? renderHeading(headingTag, cn(headingLevelStyles[headingTag], "my-[14px_0] text-[var(--ink)]"), heading) : null}
            {lead ? <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.45rem)] leading-[1.45] text-[var(--gray)]">{lead}</p> : null}
          </Reveal>
        ) : null}
        <div className="grid gap-[clamp(16px,2vw,26px)] md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item._key} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <ProductCardItem item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardItem({ item }: { item: ProductCard }) {
  const image = item.image ? sanityImageProps(item.image, 900) : null;
  const content = (
    <>
      <div className="relative mb-[26px] h-[150px] overflow-hidden rounded-[var(--r-md)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
        ) : (
          <div aria-hidden className={cn(cinematicStage({ tone: AURORA_TONE[item.auroraTone ?? "default"] }), "absolute inset-0 blur-[26px] saturate-150")} />
        )}
      </div>
      {item.title ? <h3 className="mb-2.5 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</h3> : null}
      {item.body ? <p className="max-w-[38ch] text-[var(--gray)]">{item.body}</p> : null}
      <span className="mt-5 inline-flex items-center gap-[7px] text-[0.95rem] font-medium">
        Explore
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  const className = "block overflow-hidden rounded-[var(--r-lg)] p-[clamp(26px,3vw,40px)] shadow-[inset_0_0_0_1px_var(--line)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-spring)] hover:-translate-y-[5px] hover:shadow-[inset_0_0_0_1px_var(--line),var(--shadow-amb)]";
  return item.href ? <CardLink href={item.href} className={className}>{content}</CardLink> : <article className={className}>{content}</article>;
}