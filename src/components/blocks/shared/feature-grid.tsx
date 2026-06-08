import { cn, pageContainer, pageSection, stackY } from "@/lib/styles";
import { sanityImageProps } from "@/lib/sanity-image";
import { getHeadingLevel, headingLevelStyles, renderHeading, type HeadingLevel } from "../heading-level";
import type { SanityImageRef } from "../types";

export type FeatureGridBlockProps = {
  heading?: string;
  headingLevel?: HeadingLevel;
  lead?: string;
  columns?: 2 | 3 | 4;
  items?: Array<{
    _key: string;
    title?: string;
    body?: string;
    image?: SanityImageRef;
  }>;
};

export default function FeatureGridBlock({
  heading,
  headingLevel,
  lead,
  columns = 3,
  items = [],
}: FeatureGridBlockProps) {
  const headingTag = getHeadingLevel(headingLevel, "h2");
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg" })}>
          {heading ? (
            renderHeading(headingTag, cn(headingLevelStyles[headingTag], "max-w-[78ch]"), heading)
          ) : null}
          {lead ? (
            <p
              className="max-w-[65ch] text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65] text-[var(--gray)] text-pretty"
            >
              {lead}
            </p>
          ) : null}
          <ul
            className={cn(
              "grid list-none gap-6 p-0 sm:grid-cols-2",
              columns === 2 && "lg:grid-cols-2",
              columns === 3 && "lg:grid-cols-3",
              columns === 4 && "lg:grid-cols-4",
            )}
          >
            {items.map((item) => {
              const img = item.image ? sanityImageProps(item.image, 800) : null;
              return (
                <li
                  key={item._key}
                  className="flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-white p-8 shadow-[var(--shadow-amb-s)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-amb)]"
                >
                  {img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="aspect-video w-full rounded-2xl object-cover"
                    />
                  ) : null}
                  {item.title ? (
                    <h3 className="text-[clamp(1.44rem,1.2rem+1.16vw,2.07rem)] font-semibold leading-[1.3]">{item.title}</h3>
                  ) : null}
                  {item.body ? (
                    <p className="text-[clamp(1rem,.91rem+.45vw,1.25rem)] leading-[1.65] text-[var(--gray)]">
                      {item.body}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
