import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks";
import { client } from "../../../sanity/client";
import { pageBySlugQuery, pageSlugsQuery } from "../../../sanity/queries";

type PageDocument = {
  _id: string;
  title: string;
  seoDescription?: string;
  blocks: Array<{ _key: string; _type: string } & Record<string, unknown>>;
};

function envConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  );
}

async function getPage(slug: string): Promise<PageDocument | null> {
  if (!envConfigured()) return null;
  try {
    return await client.fetch<PageDocument | null>(pageBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  if (!envConfigured()) return [];
  try {
    const slugs = await client.fetch<string[]>(pageSlugsQuery);
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
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.seoDescription,
  };
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return <BlockRenderer blocks={page.blocks} />;
}