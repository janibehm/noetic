#!/usr/bin/env node
// One-off seed: create the homePage singleton with content matching
// noetic_CLAUDE_DESIGN/index.html. Safe to re-run — uses createOrReplace.
import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const bentoCategories = [
  { _id: "articleCategory-flagship", title: "Flagship", slug: "flagship" },
  { _id: "articleCategory-editing", title: "Editing", slug: "editing" },
  { _id: "articleCategory-background-removal", title: "Background removal", slug: "background-removal" },
  { _id: "articleCategory-product", title: "Product", slug: "product" },
  { _id: "articleCategory-upscaling", title: "Upscaling", slug: "upscaling" },
  { _id: "articleCategory-character-design", title: "Character design", slug: "character-design" },
  { _id: "articleCategory-marketing", title: "Marketing", slug: "marketing" },
  { _id: "articleCategory-lab", title: "Lab", slug: "lab" },
];

const bentoArticles = [
  {
    _id: "article-ai-image-generation",
    title: "AI Image Generation",
    slug: "ai-image-generation",
    excerpt: "Text-to-image at up to 4K, with photoreal and stylized model families.",
    categoryId: "articleCategory-flagship",
    publishedAt: "2026-06-04T12:00:00.000Z",
  },
  {
    _id: "article-image-editing",
    title: "Image Editing",
    slug: "image-editing",
    excerpt: "Inpaint, replace, recompose.",
    categoryId: "articleCategory-editing",
    publishedAt: "2026-06-04T11:00:00.000Z",
  },
  {
    _id: "article-background-removal",
    title: "Background Removal",
    slug: "background-removal",
    excerpt: "Pixel-perfect cutouts, instantly.",
    categoryId: "articleCategory-background-removal",
    publishedAt: "2026-06-04T10:00:00.000Z",
  },
  {
    _id: "article-product-photography",
    title: "Product Photography",
    slug: "product-photography",
    excerpt: "Studio-grade product shots from a single reference.",
    categoryId: "articleCategory-product",
    publishedAt: "2026-06-04T09:00:00.000Z",
  },
  {
    _id: "article-upscaling",
    title: "Upscaling",
    slug: "upscaling",
    excerpt: "Up to 10x detail recovery.",
    categoryId: "articleCategory-upscaling",
    publishedAt: "2026-06-04T08:00:00.000Z",
  },
  {
    _id: "article-character-design",
    title: "Character Design",
    slug: "character-design",
    excerpt: "Consistent characters across scenes.",
    categoryId: "articleCategory-character-design",
    publishedAt: "2026-06-04T07:00:00.000Z",
  },
  {
    _id: "article-marketing-visuals",
    title: "Marketing Visuals",
    slug: "marketing-visuals",
    excerpt: "Campaign-ready creative in every aspect ratio.",
    categoryId: "articleCategory-marketing",
    publishedAt: "2026-06-04T06:00:00.000Z",
  },
  {
    _id: "article-diffusion-edge-perception",
    title: "Diffusion at the edge of perception",
    slug: "diffusion-edge-perception",
    excerpt: "A closer look at the subtle thresholds that make generated images feel real.",
    categoryId: "articleCategory-lab",
    publishedAt: "2026-06-04T05:00:00.000Z",
  },
  {
    _id: "article-prompt-geometry-latent-navigation",
    title: "Prompt geometry and latent navigation",
    slug: "prompt-geometry-latent-navigation",
    excerpt: "How spatial prompt structure can steer visual systems with more repeatability.",
    categoryId: "articleCategory-lab",
    publishedAt: "2026-06-04T04:00:00.000Z",
  },
  {
    _id: "article-holding-style-constant",
    title: "Holding style constant across a series",
    slug: "holding-style-constant",
    excerpt: "Techniques for keeping a visual language stable across many generated frames.",
    categoryId: "articleCategory-lab",
    publishedAt: "2026-06-04T03:00:00.000Z",
  },
  {
    _id: "article-twelve-reference-frames",
    title: "Fine-tuning on twelve reference frames",
    slug: "twelve-reference-frames",
    excerpt: "What small reference sets can teach a production image model.",
    categoryId: "articleCategory-lab",
    publishedAt: "2026-06-04T02:00:00.000Z",
  },
  {
    _id: "article-generation-feels-real",
    title: "What makes a generation feel real",
    slug: "generation-feels-real",
    excerpt: "Texture, lighting, context, and the tiny errors that decide believability.",
    categoryId: "articleCategory-lab",
    publishedAt: "2026-06-04T01:00:00.000Z",
  },
];

const doc = {
  _id: "homePage",
  _type: "homePage",
  title: "Home",
  seoTitle: "noetic — Generate production-ready visuals in seconds",
  seoDescription:
    "Describe an idea. noetic renders, edits and upscales cinematic images and video — all on one infinite canvas.",
  blocks: [
    {
      _key: "heroPrompt",
      _type: "heroPromptBlock",
      blockName: "hero-prompt",
      eyebrow: "The spatial canvas for AI imagery",
      heading: "Generate production-ready visuals in seconds.",
      headingLevel: "h1",
      lead: "Describe an idea. noetic renders, edits and upscales cinematic images and video — all on one infinite canvas.",
      promptIdeas: [
        "a cinematic product shot of a glass perfume bottle on wet stone…",
        "an isometric city at golden hour, soft volumetric light…",
        "a brand mascot — friendly arctic fox, 3D, studio lighting…",
        "editorial fashion in zero-gravity, motion blur, 85mm…",
      ],
      primaryCta: { label: "Generate", href: "/contact" },
      showScrollCue: true,
    },
    {
      _key: "scrubWords",
      _type: "scrubWordsBlock",
      blockName: "scrub-words",
      label: "One canvas. Every operation.",
      words: ["Generate.", "Edit.", "Upscale.", "Expand.", "Automate."],
      auroraTone: "cool",
    },
    {
      _key: "bento",
      _type: "bentoShowcaseBlock",
      blockName: "bento-showcase",
      heading: "Everything you'd open eight apps for.",
      headingLevel: "h2",
      lead: "One model family, one interface — from first prompt to final asset. Hover any surface to see it come alive.",
    },
    {
      _key: "howItWorks",
      _type: "howItWorksBlock",
      blockName: "how-it-works",
      heading: "Idea to export in three moves.",
      headingLevel: "h2",
      steps: [
        {
          _key: "s1",
          _type: "step",
          title: "Describe your idea",
          body: "Type a prompt or drop a reference. Natural language is the only interface.",
          icon: "prompt",
        },
        {
          _key: "s2",
          _type: "step",
          title: "Generate variations",
          body: "Get a grid of directions in seconds. Branch, refine and remix any frame.",
          icon: "grid",
        },
        {
          _key: "s3",
          _type: "step",
          title: "Export and publish",
          body: "Ship in any format and resolution, or pipe straight into your stack via API.",
          icon: "export",
        },
      ],
    },
    {
      _key: "featured",
      _type: "articleCarouselBlock",
      heading: "Stories from the canvas.",
      headingLevel: "h2",
      source: "latest",
      limit: 6,
    },
    {
      _key: "quote",
      _type: "pullQuoteBlock",
      quote:
        "noetic collapsed our entire creative pipeline into a single afternoon.",
      alignment: "center",
      author: { name: "Mara Delgado", role: "VP Brand, Helio Studios" },
    },
    {
      _key: "lab",
      _type: "articleCarouselBlock",
      heading: "Latest from the Lab.",
      headingLevel: "h2",
      source: "latest",
      limit: 6,
      category: "lab",
      viewAllCta: { label: "Visit the Lab →", href: "/lab" },
    },
    {
      _key: "cta",
      _type: "ctaBannerBlock",
      heading: "Your next visual is one prompt away.",
      headingLevel: "h2",
      body: "Join the teams generating millions of production assets on noetic.",
      alignment: "center",
      tone: "inverse",
      primaryCta: { label: "Get started", href: "/contact" },
      background: { auroraTone: "default" },
    },
  ],
};

for (const category of bentoCategories) {
  await client.createOrReplace({
    _id: category._id,
    _type: "articleCategory",
    title: category.title,
    slug: { _type: "slug", current: category.slug },
  });
}

for (const article of bentoArticles) {
  await client.createOrReplace({
    _id: article._id,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    category: { _type: "reference", _ref: article.categoryId },
    author: { name: "Noetic Editorial" },
    publishedAt: article.publishedAt,
    readingTimeMinutes: 3,
  });
}

const res = await client.createOrReplace(doc);
console.log(
  "Seeded:",
  bentoCategories.length,
  "categories,",
  bentoArticles.length,
  "articles,",
  res._id,
  "rev",
  res._rev,
);
