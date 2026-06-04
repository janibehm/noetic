import { css } from "../../styled-system/css";
import { pageContainer, pageSection, stackY, button } from "../../styled-system/recipes";
import { BlockRenderer } from "@/components/block-renderer";
import { client } from "../../sanity/client";
import { homePageQuery, legacyHomePageQuery } from "../../sanity/queries";

type HomePage = {
  _id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  blocks: Array<{ _key: string; _type: string } & Record<string, unknown>>;
};

async function getHomePage(): Promise<HomePage | null> {
  // Skip the Sanity round-trip if env vars are not configured yet, so
  // the starter renders out-of-the-box without credentials.
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET
  ) {
    return null;
  }
  try {
    // Prefer the new `homePage` singleton; fall back to a legacy
    // `page` document with slug "home" for backwards compatibility.
    const singleton = await client.fetch<HomePage | null>(homePageQuery);
    if (singleton?.blocks?.length) return singleton;
    return await client.fetch<HomePage | null>(legacyHomePageQuery);
  } catch (error) {
    // Surface the failure in dev so misconfigured envs / GROQ are obvious.
    if (process.env.NODE_ENV !== "production") {
      console.error("[home] Sanity fetch failed:", error);
    }
    return null;
  }
}

export async function generateMetadata() {
  const page = await getHomePage();
  if (!page) return {};
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription,
  };
}

export default async function Home() {
  const page = await getHomePage();

  if (page?.blocks?.length) {
    return <BlockRenderer blocks={page.blocks} />;
  }

  // Fallback design-system showcase landing page so the starter
  // renders without a configured Sanity dataset.
  return (
    <main>
      <section className={pageSection({ space: "xl", tone: "canvas" })}>
        <div className={pageContainer({ size: "lg" })}>
          <div className={stackY({ gap: "lg", align: "start" })}>
            <span className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              Noetic starter
            </span>
            <h1
              className={css({
                textStyle: "display.xl",
                maxWidth: "measureWide",
              })}
            >
              Next.js, Sanity, and PandaCSS, wired with a fluid design system.
            </h1>
            <p
              className={css({
                textStyle: "body.lg",
                color: "fg.muted",
                maxWidth: "measure",
              })}
            >
              Type and spacing fold smoothly across viewports using a
              Utopia-style{" "}
              <code
                className={css({
                  paddingInline: "3xs",
                  backgroundColor: "bg.subtle",
                  borderRadius: "xs",
                })}
              >
                clamp()
              </code>{" "}
              scale. Semantic color tokens drive automatic dark mode. Sanity
              blocks compose into pages and render through the{" "}
              <code>BlockRenderer</code>.
            </p>
            <div
              className={css({ display: "flex", gap: "sm", flexWrap: "wrap" })}
            >
              <a
                href="/studio"
                className={button({ variant: "solid", size: "md" })}
              >
                Open Studio
              </a>
              <a
                href="https://panda-css.com"
                className={button({ variant: "outline", size: "md" })}
              >
                PandaCSS docs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={pageSection({ space: "lg", tone: "subtle" })}>
        <div className={pageContainer({ size: "lg" })}>
          <div className={stackY({ gap: "md" })}>
            <h2 className={css({ textStyle: "heading.h2" })}>Type scale</h2>
            <p className={css({ textStyle: "display.lg" })}>Display lg</p>
            <p className={css({ textStyle: "heading.h1" })}>Heading 1</p>
            <p className={css({ textStyle: "heading.h2" })}>Heading 2</p>
            <p className={css({ textStyle: "heading.h3" })}>Heading 3</p>
            <p className={css({ textStyle: "body.lg" })}>
              Body lg — the quick brown fox jumps over the lazy dog.
            </p>
            <p className={css({ textStyle: "body.md", color: "fg.muted" })}>
              Body md — the quick brown fox jumps over the lazy dog.
            </p>
            <p className={css({ textStyle: "label.sm", color: "fg.muted" })}>
              Label sm
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
