#!/usr/bin/env node
// One-off seed: create the four articles linked from the
// "Four products. One pipeline." product-card grid on the Products page.
// Safe to re-run — uses createOrReplace.
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

// Cover media per article. `article-ai-image-generation` is also seeded by
// scripts/seed-home.mjs — keep its cover identical there to avoid drift.
const covers = {
  "article-ai-image-generation": { image: "SQUARE_abstract1.jpg", video: "SQUARE_ABSTRACT1.mp4", alt: "Generated abstract imagery" },
  "article-ai-editing-studio": { image: "SQUARE_street_view.jpg", alt: "Street scene being edited" },
  "article-brand-asset-generator": { image: "SQUARE_blueberries.jpg", alt: "On-brand product visual" },
  "article-visual-workflow-automation": { image: "SQUARE_CITY_BUS.jpg", alt: "Batch-generated city visual" },
};

// Build a Portable Text block array from a compact description.
// Each entry is either a string (normal paragraph) or { style, text }.
let keySeq = 0;
const k = (prefix) => `${prefix}-${(keySeq++).toString(36)}`;

function body(entries) {
  return entries.map((entry) => {
    const { style = "normal", text } =
      typeof entry === "string" ? { text: entry } : entry;
    return {
      _type: "block",
      _key: k("b"),
      style,
      markDefs: [],
      children: [{ _type: "span", _key: k("s"), text, marks: [] }],
    };
  });
}

const articles = [
  {
    _id: "article-ai-image-generation",
    title: "AI Image Generation",
    slug: "ai-image-generation",
    categoryId: "articleCategory-flagship",
    excerpt:
      "Create visuals from text prompts across photoreal and stylized model families, up to 4K.",
    seoDescription:
      "Generate production-ready imagery from text prompts with photoreal and stylized model families, up to 4K resolution.",
    body: body([
      { style: "h2", text: "From a sentence to a finished frame" },
      "AI Image Generation turns a written prompt into production-ready imagery in seconds. Describe the subject, the lighting, the mood and the composition, and the model returns a frame you can ship — no camera, studio or stock licence required.",
      { style: "h3", text: "Model families for every look" },
      "Switch between photoreal families tuned for product and editorial work and stylized families for illustration, concept art and brand-specific aesthetics. Each family is versioned, so a look you approve today stays reproducible tomorrow.",
      { style: "h3", text: "Resolution that holds up in print" },
      "Generate at up to 4K natively, with detail that survives crops, hero placements and large-format export. Output ships with clear commercial rights, so creative can move straight into campaigns.",
      { style: "blockquote", text: "One prompt, a dozen on-brand variations, ready before the next meeting." },
    ]),
  },
  {
    _id: "article-ai-editing-studio",
    title: "AI Editing Studio",
    slug: "ai-editing-studio",
    categoryId: "articleCategory-editing",
    excerpt:
      "Remove objects, replace backgrounds and inpaint regions with prompt-level control.",
    seoDescription:
      "Edit imagery with prompt-level control — remove objects, replace backgrounds and inpaint regions without leaving the canvas.",
    body: body([
      { style: "h2", text: "Edit with words, not masks" },
      "The AI Editing Studio brings prompt-level control to retouching. Select a region, describe the change, and the model rebuilds the pixels to match — lighting, perspective and texture included.",
      { style: "h3", text: "Object removal and inpainting" },
      "Erase distractions, extend backgrounds and fill gaps seamlessly. Inpainting respects the surrounding scene, so repairs disappear instead of standing out.",
      { style: "h3", text: "Background replacement" },
      "Drop a subject into a new setting in one step. Swap a studio sweep for a lifestyle scene, or recolour an environment to fit a campaign, while keeping the subject crisp and consistent.",
      { style: "blockquote", text: "The fastest path from a usable shot to the exact shot you needed." },
    ]),
  },
  {
    _id: "article-brand-asset-generator",
    title: "Brand Asset Generator",
    slug: "brand-asset-generator",
    categoryId: "articleCategory-marketing",
    excerpt:
      "Produce ad creatives, banners and social visuals locked to your brand kit.",
    seoDescription:
      "Generate ad creatives, banners and social visuals locked to your brand kit — palettes, type and references stay on-brand by default.",
    body: body([
      { style: "h2", text: "On-brand by default" },
      "The Brand Asset Generator locks every generation to your brand kit — palettes, typography, logos and reference imagery — so creative comes out on-brand without a round of corrections.",
      { style: "h3", text: "Every format, one brief" },
      "Produce ad creatives, banners, social posts and display variants from a single brief. Resize and recompose across aspect ratios while the brand system stays intact.",
      { style: "h3", text: "Guardrails for the whole team" },
      "Because the brand kit is enforced at generation time, marketers and partners can self-serve assets without drifting off-system. Brand teams keep control; everyone else keeps moving.",
      { style: "blockquote", text: "Campaign-ready creative that never leaves the brand behind." },
    ]),
  },
  {
    _id: "article-visual-workflow-automation",
    title: "Visual Workflow Automation",
    slug: "visual-workflow-automation",
    categoryId: "articleCategory-product",
    excerpt:
      "Generate hundreds of assets automatically from a spreadsheet, feed or API call.",
    seoDescription:
      "Automate visual production at scale — generate hundreds of assets from a spreadsheet, feed or API call through reproducible pipelines.",
    body: body([
      { style: "h2", text: "Production at scale, on autopilot" },
      "Visual Workflow Automation turns a single template into hundreds of finished assets. Point a pipeline at a spreadsheet, product feed or API call and let it generate every variant you need.",
      { style: "h3", text: "Data in, assets out" },
      "Map columns to prompt fields, layers and copy. Each row becomes a generation, so localized, per-SKU and per-audience variants are produced automatically — no manual duplication.",
      { style: "h3", text: "Reproducible pipelines" },
      "Pipelines are versioned and deterministic, with sub-second queue times for batch runs. Re-run a job and get the same result, or update one step and regenerate the whole set.",
      { style: "blockquote", text: "One pipeline, a hundred thousand localized variants." },
    ]),
  },
];

for (const article of articles) {
  const cover = covers[article._id];
  const res = await client.createOrReplace({
    _id: article._id,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    seoDescription: article.seoDescription,
    category: { _type: "reference", _ref: article.categoryId },
    author: { name: "Noetic Editorial" },
    publishedAt: "2026-06-05T12:00:00.000Z",
    readingTimeMinutes: 3,
    body: article.body,
    coverImage: cover && assets.image(cover.image, cover.alt),
    coverVideo: cover?.video && assets.file(cover.video),
  });
  console.log(`Seeded article: ${res._id} (/articles/${article.slug})`);
}
