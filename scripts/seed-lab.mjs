#!/usr/bin/env node
// One-off seed: create a generic Lab page matching
// noetic_CLAUDE_DESIGN/lab.html. Safe to re-run.
import "dotenv/config";
import { createClient } from "@sanity/client";
import { createAssetResolver } from "./lib/assets.mjs";
import { articleCovers } from "./lib/article-covers.mjs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const assets = await createAssetResolver(client);

// Card image for an article-linked card — kept identical to the article's own
// cover (scripts/lib/article-covers.mjs) so the preview matches the hero.
const coverUrl = (slug) => {
  const cover = articleCovers[slug];
  return cover && assets.url(cover.image);
};

const doc = {
  _id: "page-lab",
  _type: "page",
  title: "Lab",
  slug: { _type: "slug", current: "lab" },
  seoDescription: "Open notes from the noetic team on image generation, creative workflows, and production experiments.",
  blocks: [
    {
      _key: "hero",
      _type: "labHeroBlock",
      blockName: "lab-hero",
      eyebrow: "noetic Lab",
      heading: "Research & Experiments",
      headingLevel: "h1",
      lead: "Open notes from the team teaching machines to see, compose and create. Methods, models and the occasional beautiful failure.",
      stats: [
        { _key: "notes", value: "142", label: "published notes" },
        { _key: "models", value: "9", label: "model generations" },
        { _key: "experiments", value: "∞", label: "experiments running" },
      ],
    },
    {
      _key: "discoveries",
      _type: "labArticleGridBlock",
      blockName: "lab-latest-discoveries",
      heading: "Latest discoveries",
      headingLevel: "h2",
      countLabel: "featured",
      layout: "featured",
      items: [
        {
          _key: "latent-navigation",
          title: "Latent navigation: steering a model through its own imagination",
          tag: "Featured",
          category: "Diffusion",
          meta: "Mar 2026",
          href: "/articles/latent-navigation",
          imageUrl: coverUrl("latent-navigation"),
          auroraTone: "cool",
        },
        {
          _key: "real-generation",
          title: "What makes a generation feel real",
          tag: "Method",
          href: "/articles/what-makes-a-generation-feel-real",
          imageUrl: assets.url("SQUARE_abstract3.jpg"),
        },
        {
          _key: "style-series",
          title: "Holding aesthetics constant across a series",
          tag: "Style",
          href: "/articles/holding-aesthetics-constant-across-a-series",
          imageUrl: coverUrl("holding-aesthetics-constant-across-a-series"),
          auroraTone: "warm",
        },
      ],
    },
    {
      _key: "image-research",
      _type: "labArticleGridBlock",
      blockName: "lab-image-generation-research",
      heading: "Image generation research",
      headingLevel: "h2",
      countLabel: "04 topics",
      layout: "masonry",
      items: [
        { _key: "cascaded-diffusion", title: "Cascaded diffusion at 4K without the artifacts", tag: "Diffusion models", href: "/articles/cascaded-diffusion-at-4k", imageUrl: coverUrl("cascaded-diffusion-at-4k"), auroraTone: "cool" },
        { _key: "prompt-grammar", title: "The grammar of a great prompt", tag: "Prompt engineering", href: "/articles/the-grammar-of-a-great-prompt", imageUrl: assets.url("SQUARE_abstract5.jpg") },
        { _key: "reference-locking", title: "Reference-locking across a 60-frame sequence", tag: "Style consistency", href: "/articles/reference-locking-across-a-sequence", imageUrl: coverUrl("reference-locking-across-a-sequence"), auroraTone: "warm" },
        { _key: "personalizing-model", title: "Personalizing a model on twelve images", tag: "Fine-tuning", href: "/articles/personalizing-a-model-on-twelve-images", imageUrl: coverUrl("personalizing-a-model-on-twelve-images"), auroraTone: "default" },
        { _key: "faster-samplers", title: "Faster samplers, sharper edges", tag: "Diffusion models", href: "/articles/faster-samplers-sharper-edges", imageUrl: assets.url("snowy_landscape.jpg") },
        { _key: "sparse-prompts", title: "Auto-expanding sparse prompts", tag: "Prompt engineering", href: "/articles/auto-expanding-sparse-prompts", imageUrl: coverUrl("auto-expanding-sparse-prompts"), auroraTone: "cool" },
      ],
    },
    {
      _key: "workflow-research",
      _type: "labArticleGridBlock",
      blockName: "lab-creative-workflow-research",
      heading: "Creative workflow research",
      headingLevel: "h2",
      countLabel: "05 topics",
      layout: "masonry",
      items: [
        { _key: "tokens", title: "Tokens that prompt themselves", tag: "Design systems", href: "/articles/tokens-that-prompt-themselves", imageUrl: coverUrl("tokens-that-prompt-themselves"), auroraTone: "default" },
        { _key: "spreadsheet-assets", title: "From spreadsheet to 10,000 assets", tag: "Asset pipelines", href: "/articles/from-spreadsheet-to-10000-assets", imageUrl: assets.url("SQUARE_CITY_BUS.jpg") },
        { _key: "human-loop", title: "Where humans stay in the loop", tag: "AI-assisted production", href: "/articles/where-humans-stay-in-the-loop", imageUrl: coverUrl("where-humans-stay-in-the-loop"), auroraTone: "warm" },
        { _key: "shared-canvases", title: "Shared canvases across a studio", tag: "Collaboration", href: "/articles/shared-canvases-across-a-studio", imageUrl: coverUrl("shared-canvases-across-a-studio"), auroraTone: "cool" },
        { _key: "approval-flows", title: "Approval flows people actually use", tag: "Governance", href: "/articles/approval-flows-people-actually-use", imageUrl: assets.url("SQUARE_street_view.jpg") },
        { _key: "generation-cache", title: "Caching generations for reuse", tag: "Asset pipelines", href: "/articles/caching-generations-for-reuse", imageUrl: coverUrl("caching-generations-for-reuse"), auroraTone: "default" },
      ],
    },
    {
      _key: "spotlight",
      _type: "labSpotlightBlock",
      blockName: "lab-product-spotlight",
      eyebrow: "From research to product",
      heading: "Every experiment here ships into the platform.",
      headingLevel: "h2",
      body: "See how the latest models power generation, editing and automation at scale.",
      cta: { label: "Explore the platform", href: "/products" },
      backgroundVideo: assets.file("HORIZONTAL_abstract_background_wide-hd_1920_1080_25fps.mp4"),
    },
    {
      _key: "latest",
      _type: "labArticleGridBlock",
      blockName: "lab-latest-articles",
      heading: "Latest articles",
      headingLevel: "h2",
      countLabel: "recent",
      layout: "masonry",
      items: [
        { _key: "color-memory", title: "Color memory in generative models", tag: "Perception", href: "/articles/color-memory-in-generative-models", imageUrl: assets.url("VERTICAL_flowers_image_3.jpg") },
        { _key: "outpainting", title: "Outpainting beyond the frame", tag: "Method", href: "/articles/outpainting-beyond-the-frame", imageUrl: coverUrl("outpainting-beyond-the-frame"), auroraTone: "warm" },
        { _key: "taste", title: "Measuring 'taste' quantitatively", tag: "Research", href: "/articles/measuring-taste-quantitatively", imageUrl: coverUrl("measuring-taste-quantitatively"), auroraTone: "cool" },
        { _key: "relighting", title: "Depth-aware relighting", tag: "Control", href: "/articles/depth-aware-relighting", imageUrl: assets.url("SQUARE_mountain_landscape.jpg") },
        { _key: "determinism", title: "Seeds, determinism and reproducibility", tag: "Method", href: "/articles/seeds-determinism-and-reproducibility", imageUrl: coverUrl("seeds-determinism-and-reproducibility"), auroraTone: "default" },
        { _key: "canvas-versioning", title: "Versioning a creative canvas", tag: "Systems", href: "/articles/versioning-a-creative-canvas", imageUrl: coverUrl("versioning-a-creative-canvas"), auroraTone: "cool" },
      ],
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded lab page: ${res._id}`);