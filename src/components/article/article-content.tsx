import { pageContainer, pageSection, stackY } from "@/lib/styles";
import { ProseRenderer } from "@/components/prose-renderer";
import { sanityImageProps } from "@/lib/sanity-image";
import { MediaAsset } from "@/components/blocks/shared/media-asset";
import type { Article } from "@/lib/articles";

/**
 * Renders a full article. Shared verbatim between the standalone route
 * (`/articles/[slug]`) and the intercepted modal so the two views never
 * drift. Pure server component — it receives already-fetched data and
 * does no I/O of its own.
 *
 * The cover renders in a fixed 16:9 frame at a standard width, so every
 * article — whatever its source image's dimensions — gets a consistent
 * shape and download size.
 */
export function ArticleContent({ article }: { article: Article }) {
  const hasCover = Boolean(article.coverVideo || article.coverImage);
  const avatar = article.author?.avatar
    ? sanityImageProps(article.author.avatar, 128)
    : null;
  const published = article.publishedAt ? new Date(article.publishedAt) : null;
  const publishedLabel = published?.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <header className={pageSection({ space: "lg" })}>
        <div className={pageContainer({ size: "md" })}>
          <div className={stackY({ gap: "md", align: "start" })}>
            {article.category?.title || publishedLabel || article.readingTimeMinutes ? (
              <div className="flex flex-wrap items-center gap-3">
                {article.category?.title ? (
                  <span className="inline-flex items-center rounded-full bg-[var(--void-soft)] px-3 py-1 text-[0.72rem] font-semibold uppercase leading-none tracking-[0.14em] text-[var(--ink)]">
                    {article.category.title}
                  </span>
                ) : null}
                {publishedLabel || article.readingTimeMinutes ? (
                  <span className="text-[0.85rem] leading-normal text-[var(--gray)]">
                    {publishedLabel ? (
                      <time dateTime={article.publishedAt}>{publishedLabel}</time>
                    ) : null}
                    {publishedLabel && article.readingTimeMinutes ? " · " : null}
                    {article.readingTimeMinutes ? `${article.readingTimeMinutes} min read` : null}
                  </span>
                ) : null}
              </div>
            ) : null}

            <h1 className="max-w-[20ch] text-[clamp(2.1rem,1.5rem+2.8vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.03em] text-balance">
              {article.title}
            </h1>

            {article.excerpt ? (
              <p className="max-w-[60ch] text-[clamp(1.15rem,1.05rem+0.5vw,1.4rem)] leading-[1.6] text-[var(--gray)] text-pretty">
                {article.excerpt}
              </p>
            ) : null}

            {article.author ? (
              <div className="mt-2 flex items-center gap-3 border-t border-[var(--line)] pt-6">
                {avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <div className="text-sm font-medium leading-normal tracking-[0.01em] text-[var(--ink)]">
                    {article.author.name}
                  </div>
                  {article.author.role ? (
                    <div className="text-sm leading-normal text-[var(--gray)]">
                      {article.author.role}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {hasCover ? (
        <section className={pageSection({ space: "sm" })}>
          <div className={pageContainer({ size: "lg" })}>
            <div className="overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-amb)] ring-1 ring-[var(--line)]">
              <MediaAsset
                image={article.coverImage}
                videoUrl={article.coverVideo}
                width={1600}
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className={pageSection({ space: "md" })}>
        <div className={pageContainer({ size: "md" })}>
          <ProseRenderer value={article.body} />
        </div>
      </section>
    </article>
  );
}
