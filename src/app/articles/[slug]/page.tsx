import { notFound } from "next/navigation";
import { pageContainer, pageSection, stackY } from "@/lib/styles";
import { client } from "../../../../sanity/client";
import {
  articleBySlugQuery,
  articleSlugsQuery,
} from "../../../../sanity/queries";
import { ProseRenderer, sanityImageProps } from "@/components/prose-renderer";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  readingTimeMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  category?: { title?: string; slug?: string };
  coverImage?: ({ alt?: string } & Record<string, unknown>) | null;
  author?: {
    name: string;
    role?: string;
    avatar?: ({ alt?: string } & Record<string, unknown>) | null;
  };
  body?: Parameters<typeof ProseRenderer>[0]["value"];
};

function envConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  );
}

async function getArticle(slug: string): Promise<Article | null> {
  if (!envConfigured()) return null;
  try {
    return await client.fetch<Article | null>(articleBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  if (!envConfigured()) return [];
  try {
    const slugs = await client.fetch<string[]>(articleSlugsQuery);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const cover = article.coverImage
    ? sanityImageProps(article.coverImage, 2000)
    : null;
  const avatar = article.author?.avatar
    ? sanityImageProps(article.author.avatar, 128)
    : null;
  const published = article.publishedAt
    ? new Date(article.publishedAt)
    : null;

  return (
    <article>
      <section className={pageSection({ space: "xl" })}>
        <div className={pageContainer({ size: "md" })}>
          <div className={stackY({ gap: "md", align: "start" })}>
            <span
              className="flex gap-2 text-[0.72rem] font-semibold uppercase leading-normal tracking-[0.18em] text-[var(--gray)]"
            >
              {article.category?.title ? <>{article.category.title}</> : null}
              {published ? (
                <>
                  {article.category?.title ? " · " : null}
                  <time dateTime={article.publishedAt}>
                    {published.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              ) : null}
              {article.readingTimeMinutes ? (
                <> · {article.readingTimeMinutes} min read</>
              ) : null}
            </span>
            <h1
              className="max-w-[78ch] text-[clamp(2.99rem,1.94rem+6.55vw,6.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance"
            >
              {article.title}
            </h1>
            {article.excerpt ? (
              <p
                className="max-w-[65ch] text-[clamp(1.2rem,1.05rem+0.72vw,1.6rem)] leading-[1.65] text-[var(--gray)] text-pretty"
              >
                {article.excerpt}
              </p>
            ) : null}
            {article.author ? (
              <span
                className="inline-flex items-center gap-4"
              >
                {avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : null}
                <span>
                  <span className="block text-sm font-medium leading-normal tracking-[0.02em]">
                    {article.author.name}
                  </span>
                  {article.author.role ? (
                    <span
                      className="block text-sm leading-normal text-[var(--gray)]"
                    >
                      {article.author.role}
                    </span>
                  ) : null}
                </span>
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {cover ? (
        <section className={pageSection({ space: "md" })}>
          <div className={pageContainer({ size: "lg" })}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              alt={cover.alt}
              className="block h-auto w-full rounded-xl"
            />
          </div>
        </section>
      ) : null}

      <section className={pageSection({ space: "lg" })}>
        <div className={pageContainer({ size: "md" })}>
          <ProseRenderer value={article.body} />
        </div>
      </section>
    </article>
  );
}
