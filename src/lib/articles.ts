import { cache } from "react";
import { client } from "../../sanity/client";
import {
  articleBySlugQuery,
  articleSlugsQuery,
} from "../../sanity/queries";
import type { ProseRenderer } from "@/components/prose-renderer";

export type Article = {
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
  coverVideo?: string | null;
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

/**
 * Fetch a single article by slug. Wrapped in React `cache()` so the
 * standalone page's `generateMetadata` and `Page` share one round-trip,
 * and so the modal route dedupes within its own render pass.
 */
export const getArticle = cache(async (slug: string): Promise<Article | null> => {
  if (!envConfigured()) return null;
  try {
    return await client.fetch<Article | null>(articleBySlugQuery, { slug });
  } catch {
    return null;
  }
});

export async function getArticleSlugs(): Promise<string[]> {
  if (!envConfigured()) return [];
  try {
    return (await client.fetch<string[]>(articleSlugsQuery)) ?? [];
  } catch {
    return [];
  }
}
