import { css } from "../../../../styled-system/css";
import { pageContainer, pageSection, stackY } from "../../../../styled-system/recipes";
import { sanityImageProps } from "../../prose-renderer";
import { getHeadingLevel, headingLevelStyles, type HeadingLevel } from "../heading-level";
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
  const Heading = getHeadingLevel(headingLevel, "h2");
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg" })}>
          {heading ? (
            <Heading className={css({ ...headingLevelStyles[Heading], maxWidth: "measureWide" })}>
              {heading}
            </Heading>
          ) : null}
          {lead ? (
            <p
              className={css({
                textStyle: "body.lg",
                color: "fg.muted",
                maxWidth: "measure",
              })}
            >
              {lead}
            </p>
          ) : null}
          <ul
            className={css({
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: `repeat(${columns}, 1fr)`,
              },
              gap: "md",
              listStyle: "none",
              padding: 0,
            })}
          >
            {items.map((item) => {
              const img = item.image ? sanityImageProps(item.image, 800) : null;
              return (
                <li
                  key={item._key}
                  className={css({
                    backgroundColor: "bg.surface",
                    border: "subtle",
                    borderRadius: "3xl",
                    padding: "lg",
                    display: "flex",
                    flexDirection: "column",
                    gap: "sm",
                    boxShadow: "ambientSm",
                    transitionProperty: "transform, box-shadow",
                    transitionDuration: "slower",
                    transitionTimingFunction: "emphasized",
                    _hover: { transform: "translateY(-4px)", boxShadow: "ambient" },
                  })}
                >
                  {img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={css({
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        borderRadius: "2xl",
                      })}
                    />
                  ) : null}
                  {item.title ? (
                    <h3 className={css({ textStyle: "heading.h4" })}>{item.title}</h3>
                  ) : null}
                  {item.body ? (
                    <p className={css({ textStyle: "body.md", color: "fg.muted" })}>
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
