import { css } from "../../styled-system/css";
import { pageContainer, pageSection, stackY, button } from "../../styled-system/recipes";
import { ProseRenderer, sanityImageProps } from "./prose-renderer";

type Block = {
  _key: string;
  _type: string;
} & Record<string, unknown>;

type Tone = "canvas" | "surface" | "subtle" | "inverse" | "accent";

/**
 * Top-level renderer. Iterates the `blocks` array from Sanity and
 * delegates each entry to a matching React component. Unknown
 * block types render a small warning in development.
 */
export function BlockRenderer({ blocks }: { blocks: Block[] | null | undefined }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "heroBlock":
            return <HeroBlock key={block._key} {...(block as unknown as HeroProps)} />;
          case "richTextBlock":
            return <RichTextBlock key={block._key} {...(block as unknown as RichTextProps)} />;
          case "calloutBlock":
            return <CalloutBlock key={block._key} {...(block as unknown as CalloutProps)} />;
          case "featureGridBlock":
            return <FeatureGridBlock key={block._key} {...(block as unknown as FeatureGridProps)} />;
          case "mediaBlock":
            return <MediaBlock key={block._key} {...(block as unknown as MediaProps)} />;
          default:
            if (process.env.NODE_ENV !== "production") {
              return (
                <div
                  key={block._key}
                  className={css({
                    padding: "md",
                    color: "fg.muted",
                    border: "subtle",
                    borderRadius: "md",
                  })}
                >
                  Unknown block type: <code>{block._type}</code>
                </div>
              );
            }
            return null;
        }
      })}
    </>
  );
}

/* ---------------- Hero ---------------- */

type HeroProps = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  tone?: Tone;
  image?: { alt?: string } & Record<string, unknown>;
  primaryCta?: { label?: string; href?: string };
};

function HeroBlock({ eyebrow, heading, lead, tone = "canvas", image, primaryCta }: HeroProps) {
  const img = image ? sanityImageProps(image, 2000) : null;
  return (
    <section className={pageSection({ space: "xl", tone })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg", align: "start" })}>
          {eyebrow ? (
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              {eyebrow}
            </span>
          ) : null}
          <h1 className={css({ textStyle: "display.xl", maxWidth: "measureWide" })}>
            {heading}
          </h1>
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
          {primaryCta?.label && primaryCta.href ? (
            <a
              href={primaryCta.href}
              className={button({ variant: "solid", size: "lg" })}
            >
              {primaryCta.label}
            </a>
          ) : null}
          {img ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={img.src}
              alt={img.alt}
              className={css({
                width: "100%",
                maxWidth: "containerLg",
                borderRadius: "lg",
                marginBlockStart: "lg",
                height: "auto",
              })}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Rich text ---------------- */

type RichTextProps = {
  tone?: Tone;
  content: Parameters<typeof ProseRenderer>[0]["value"];
};

function RichTextBlock({ tone = "canvas", content }: RichTextProps) {
  return (
    <section className={pageSection({ space: "md", tone })}>
      <div className={pageContainer({ size: "lg" })}>
        <ProseRenderer value={content} />
      </div>
    </section>
  );
}

/* ---------------- Callout ---------------- */

type CalloutProps = {
  intent?: "info" | "success" | "warning" | "danger";
  title?: string;
  body?: Parameters<typeof ProseRenderer>[0]["value"];
};

const intentTone: Record<NonNullable<CalloutProps["intent"]>, { bg: string; fg: string; border: string }> = {
  info:    { bg: "bg.accentSubtle", fg: "fg.default", border: "border.muted" },
  success: { bg: "bg.subtle",       fg: "fg.default", border: "border.muted" },
  warning: { bg: "bg.subtle",       fg: "fg.default", border: "border.muted" },
  danger:  { bg: "bg.subtle",       fg: "fg.default", border: "border.muted" },
};

function CalloutBlock({ intent = "info", title, body }: CalloutProps) {
  const t = intentTone[intent];
  return (
    <section className={pageSection({ space: "sm" })}>
      <div className={pageContainer({ size: "md" })}>
        <aside
          className={css({
            backgroundColor: t.bg,
            color: t.fg,
            borderInlineStart: "3px solid",
            borderColor: t.border,
            padding: "md",
            borderRadius: "md",
          })}
        >
          {title ? (
            <p className={css({ textStyle: "label.md", marginBlockEnd: "2xs" })}>
              {title}
            </p>
          ) : null}
          <ProseRenderer value={body} />
        </aside>
      </div>
    </section>
  );
}

/* ---------------- Feature grid ---------------- */

type FeatureGridProps = {
  heading?: string;
  lead?: string;
  columns?: 2 | 3 | 4;
  items?: Array<{
    _key: string;
    title?: string;
    body?: string;
    image?: Record<string, unknown>;
  }>;
};

function FeatureGridBlock({ heading, lead, columns = 3, items = [] }: FeatureGridProps) {
  return (
    <section className={pageSection({ space: "lg" })}>
      <div className={pageContainer({ size: "lg" })}>
        <div className={stackY({ gap: "lg" })}>
          {heading ? (
            <h2 className={css({ textStyle: "heading.h2", maxWidth: "measureWide" })}>
              {heading}
            </h2>
          ) : null}
          {lead ? (
            <p className={css({ textStyle: "body.lg", color: "fg.muted", maxWidth: "measure" })}>
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
                    borderRadius: "lg",
                    padding: "md",
                    display: "flex",
                    flexDirection: "column",
                    gap: "xs",
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
                        borderRadius: "md",
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

/* ---------------- Media ---------------- */

type MediaProps = {
  width?: "measure" | "container" | "full";
  caption?: string;
  image?: { alt?: string } & Record<string, unknown>;
};

function MediaBlock({ width = "container", caption, image }: MediaProps) {
  const img = image ? sanityImageProps(image, 2400) : null;
  if (!img) return null;
  const size =
    width === "measure" ? "prose" : width === "full" ? "full" : "lg";
  return (
    <section className={pageSection({ space: "md" })}>
      <div className={pageContainer({ size })}>
        <figure className={css({ margin: 0 })}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className={css({
              width: "100%",
              height: "auto",
              borderRadius: width === "full" ? "none" : "lg",
              display: "block",
            })}
          />
          {caption ? (
            <figcaption
              className={css({
                textStyle: "body.sm",
                color: "fg.muted",
                textAlign: "center",
                marginBlockStart: "2xs",
              })}
            >
              {caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
