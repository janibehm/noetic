import { notFound } from "next/navigation";
import { ArticleModal } from "@/components/article/article-modal";
import { ArticleContent } from "@/components/article/article-content";
import { getArticle } from "@/lib/articles";

// Intercepts a client-side navigation to /articles/[slug] and renders the
// article inside the modal overlay instead of the standalone page. The
// `(.)` matcher resolves to the sibling `articles` segment because @modal
// is a slot at the app root, not a route segment.
export default async function ArticleModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <ArticleModal>
      <ArticleContent article={article} />
    </ArticleModal>
  );
}
