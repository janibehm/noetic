#!/usr/bin/env node
// One-off seed: create the homePage singleton with content matching
// noetic_CLAUDE_DESIGN/index.html. Safe to re-run — uses createOrReplace.
import "dotenv/config";
import { createClient } from "@sanity/client";
import { createAssetResolver } from "./lib/assets.mjs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const assets = await createAssetResolver(client);

// Cover media per article (shown in the bento grid + article carousels).
// Keyed by article _id; image doubles as the poster when a video is set.
const covers = {
  "article-ai-image-generation": { image: "SQUARE_abstract1.jpg", video: "SQUARE_ABSTRACT1.mp4", alt: "Generated abstract imagery" },
  "article-image-editing": { image: "SQUARE_abstract3.jpg", alt: "Abstract editing canvas" },
  "article-background-removal": { image: "VERTICAL_tiger.jpg", alt: "Tiger isolated from its background" },
  "article-product-photography": { image: "SQUARE_blueberries.jpg", video: "SQUARE_PRODUCT.mp4", alt: "Studio product shot" },
  "article-upscaling": { image: "SQUARE_mountain_landscape.jpg", alt: "Highly detailed mountain landscape" },
  "article-character-design": { image: "robot.jpg", alt: "Robot character render" },
  "article-marketing-visuals": { image: "SQUARE_city_view.jpg", alt: "City marketing visual" },
  "article-diffusion-edge-perception": { image: "SQUARE_abstract2.jpg", video: "SQUARE_ABSTRACT (2).mp4", alt: "Diffusion abstract" },
  "article-prompt-geometry-latent-navigation": { image: "SQUARE_abstract5.jpg", alt: "Latent space abstract" },
  "article-holding-style-constant": { image: "SQUARE_abstract6.jpg", alt: "Consistent style abstract" },
  "article-twelve-reference-frames": { image: "SQUARE_aquarium.png", alt: "Aquarium reference scene" },
  "article-generation-feels-real": { image: "snowy_landscape.jpg", video: "SQUARE_LION.mp4", alt: "Photoreal generation" },
};

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
      background: {
        video: assets.file("HORIZONTAL_HERO_blue_ribbon_abstract_bg_1920_1080_30fps.mp4"),
        // First frame of the hero video, so the poster matches the footage
        // exactly until it loads.
        poster: assets.image("frame_000001.jpeg", "Cinematic blue ribbon abstract backdrop"),
      },
    },
    {
      _key: "scrubWords",
      _type: "scrubWordsBlock",
      blockName: "scrub-words",
      label: "One canvas. Every operation.",
      items: [
        { _key: "generate", word: "Generate.", video: assets.file("HORIZONTAL_ABSTRACT (3).mp4") },
        { _key: "edit", word: "Edit.", video: assets.file("7180709-hd_1366_720_25fps.mp4") },
        { _key: "upscale", word: "Upscale.", video: assets.file("HORIZONTAL_abstract_background_wide-hd_1920_1080_25fps.mp4") },
        { _key: "expand", word: "Expand.", video: assets.file("HORIZONTAL_night_city_drone_shot_1280_720_24fps (1).mp4") },
        { _key: "automate", word: "Automate.", video: assets.file("HORIZONTAL_ROBOTS.mp4") },
      ],
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
      background: { auroraTone: "default", video: assets.file("11904052_1280_720_24fps.mp4") },
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
  const cover = covers[article._id];
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
    coverImage: cover && assets.image(cover.image, cover.alt),
    coverVideo: cover?.video && assets.file(cover.video),
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
