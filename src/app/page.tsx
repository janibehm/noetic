import Link from "next/link";
import { button, pageContainer, pageSection, stackY } from "@/lib/styles";
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
            <span className="text-xs font-semibold uppercase leading-normal tracking-[0.06em] text-[var(--gray)]">
              Noetic starter
            </span>
            <h1
              className="max-w-[78ch] text-[clamp(2.99rem,1.94rem+6.55vw,6.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance"
            >
              Next.js, Sanity, and Tailwind CSS, wired with a fluid design system.
            </h1>
            <p
              className="max-w-[65ch] text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65] text-[var(--gray)] text-pretty"
            >
              Type and spacing fold smoothly across viewports using a
              Utopia-style{" "}
              <code
                className="rounded px-1 bg-[var(--void-soft)]"
              >
                clamp()
              </code>{" "}
              scale. Shared Tailwind utilities keep layout consistent. Sanity
              blocks compose into pages and render through the{" "}
              <code>BlockRenderer</code>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/studio"
                className={button({ variant: "solid", size: "md" })}
              >
                Open Studio
              </Link>
              <a
                href="https://tailwindcss.com"
                className={button({ variant: "outline", size: "md" })}
              >
                Tailwind docs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={pageSection({ space: "lg", tone: "subtle" })}>
        <div className={pageContainer({ size: "lg" })}>
          <div className={stackY({ gap: "md" })}>
            <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-balance">Type scale</h2>
            <p className="text-[clamp(2.49rem,1.74rem+4.34vw,4.86rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-balance">Display lg</p>
            <p className="text-[clamp(2.49rem,1.74rem+4.34vw,4.86rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance">Heading 1</p>
            <p className="text-[clamp(2.07rem,1.55rem+2.83vw,3.65rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-balance">Heading 2</p>
            <p className="text-[clamp(1.73rem,1.37rem+1.82vw,2.74rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-balance">Heading 3</p>
            <p className="text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65]">
              Body lg — the quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-[clamp(1rem,.91rem+.45vw,1.25rem)] leading-[1.65] text-[var(--gray)]">
              Body md — the quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-xs font-semibold uppercase leading-normal tracking-[0.06em] text-[var(--gray)]">
              Label sm
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
