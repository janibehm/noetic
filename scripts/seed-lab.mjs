#!/usr/bin/env node
// One-off seed: create a generic Lab page matching
// noetic_CLAUDE_DESIGN/lab.html. Safe to re-run.
import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const photo = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=70`;

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
          href: "#",
          auroraTone: "cool",
        },
        {
          _key: "real-generation",
          title: "What makes a generation feel real",
          tag: "Method",
          href: "#",
          imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=70",
        },
        {
          _key: "style-series",
          title: "Holding aesthetics constant across a series",
          tag: "Style",
          href: "#",
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
        { _key: "cascaded-diffusion", title: "Cascaded diffusion at 4K without the artifacts", tag: "Diffusion models", href: "#", auroraTone: "cool" },
        { _key: "prompt-grammar", title: "The grammar of a great prompt", tag: "Prompt engineering", href: "#", imageUrl: photo("1635776062127-d379bfcba9f8") },
        { _key: "reference-locking", title: "Reference-locking across a 60-frame sequence", tag: "Style consistency", href: "#", auroraTone: "warm" },
        { _key: "personalizing-model", title: "Personalizing a model on twelve images", tag: "Fine-tuning", href: "#", auroraTone: "default" },
        { _key: "faster-samplers", title: "Faster samplers, sharper edges", tag: "Diffusion models", href: "#", imageUrl: photo("1620712943543-bcc4688e7485") },
        { _key: "sparse-prompts", title: "Auto-expanding sparse prompts", tag: "Prompt engineering", href: "#", auroraTone: "cool" },
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
        { _key: "tokens", title: "Tokens that prompt themselves", tag: "Design systems", href: "#", auroraTone: "default" },
        { _key: "spreadsheet-assets", title: "From spreadsheet to 10,000 assets", tag: "Asset pipelines", href: "#", imageUrl: photo("1547891654-e66ed7ebb968") },
        { _key: "human-loop", title: "Where humans stay in the loop", tag: "AI-assisted production", href: "#", auroraTone: "warm" },
        { _key: "shared-canvases", title: "Shared canvases across a studio", tag: "Collaboration", href: "#", auroraTone: "cool" },
        { _key: "approval-flows", title: "Approval flows people actually use", tag: "Governance", href: "#", imageUrl: photo("1600880292203-757bb62b4baf") },
        { _key: "generation-cache", title: "Caching generations for reuse", tag: "Asset pipelines", href: "#", auroraTone: "default" },
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
        { _key: "color-memory", title: "Color memory in generative models", tag: "Perception", href: "#", imageUrl: photo("1635776063043-ab23b4c226f6") },
        { _key: "outpainting", title: "Outpainting beyond the frame", tag: "Method", href: "#", auroraTone: "warm" },
        { _key: "taste", title: "Measuring 'taste' quantitatively", tag: "Research", href: "#", auroraTone: "cool" },
        { _key: "relighting", title: "Depth-aware relighting", tag: "Control", href: "#", imageUrl: photo("1604871000636-074fa5117945") },
        { _key: "determinism", title: "Seeds, determinism and reproducibility", tag: "Method", href: "#", auroraTone: "default" },
        { _key: "canvas-versioning", title: "Versioning a creative canvas", tag: "Systems", href: "#", auroraTone: "cool" },
      ],
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded lab page: ${res._id}`);