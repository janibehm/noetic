#!/usr/bin/env node
// One-off seed: create a generic Resources page matching
// noetic_CLAUDE_DESIGN/resources.html. Safe to re-run.
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

const doc = {
  _id: "page-resources",
  _type: "page",
  title: "Resources",
  slug: { _type: "slug", current: "resources" },
  seoDescription: "Guides, API documentation, tutorials, research, and product updates for noetic.",
  blocks: [
    {
      _key: "featured",
      _type: "resourcesFeaturedBlock",
      blockName: "resources-featured-article",
      badge: "Featured",
      heading: "The complete guide to production-grade prompting",
      headingLevel: "h1",
      lead: "A field manual for getting consistent, on-brand results - structure, references, seeds and the parameters that actually matter.",
      href: "/articles/complete-guide-to-production-grade-prompting",
      auroraTone: "cool",
      imageUrl: assets.url("SQUARE_abstract4.jpg"),
      author: {
        name: "Iris Tanaka",
        meta: "Lead Applied Researcher · 12 min read",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=70",
      },
    },
    {
      _key: "library",
      _type: "resourcesLibraryBlock",
      blockName: "resources-library",
      heading: "Learn the canvas.",
      headingLevel: "h2",
      items: [
        { _key: "prompt-anatomy", category: "Prompt Guides", title: "Anatomy of a reliable prompt", href: "/articles/anatomy-of-a-reliable-prompt", auroraTone: "default" },
        { _key: "batch-pipeline", category: "Tutorials", title: "Your first batch pipeline", href: "/articles/your-first-batch-pipeline", imageUrl: assets.url("SQUARE_abstract6.jpg") },
        { _key: "composition-rules", category: "AI Art", title: "Composition rules the model loves", href: "/articles/composition-rules-the-model-loves", auroraTone: "warm" },
        { _key: "ad-variants", category: "Marketing", title: "50 ad variants from one brief", href: "/articles/50-ad-variants-from-one-brief", auroraTone: "cool" },
        { _key: "product-shots", category: "E-commerce", title: "Studio product shots, no studio", href: "/articles/studio-product-shots-no-studio", imageUrl: assets.url("SQUARE_blueberries.jpg") },
        { _key: "vantage-case", category: "Case Studies", title: "How Vantage cut creative time 70%", href: "/articles/how-vantage-cut-creative-time-70", auroraTone: "default" },
        { _key: "reproducible-seeds", category: "Research", title: "Why seeds make results reproducible", href: "/articles/why-seeds-make-results-reproducible", imageUrl: assets.url("SQUARE_aquarium.png") },
        { _key: "image-3", category: "Product Updates", title: "Introducing noetic-image-3", href: "/articles/introducing-noetic-image-3", auroraTone: "cool" },
        { _key: "outpainting-wide", category: "Tutorials", title: "Outpainting for wide formats", href: "/articles/outpainting-for-wide-formats", auroraTone: "warm" },
      ],
    },
    {
      _key: "api",
      _type: "resourcesApiBlock",
      blockName: "resources-api-docs",
      heading: "A premium API for generation at scale.",
      headingLevel: "h2",
      lead: "Typed SDKs, predictable rate limits and webhooks for every job. Generate your first image in three lines.",
      codeSamples: [
        {
          _key: "javascript",
          label: "JavaScript",
          language: "js",
          code: `import { Noetic } from "@noetic/sdk";

const noetic = new Noetic(process.env.NOETIC_KEY);

const image = await noetic.images.generate({
  model: "noetic-image-3",
  prompt: "a glass perfume bottle on wet stone",
  aspect_ratio: "16:9",
});`,
        },
        {
          _key: "python",
          label: "Python",
          language: "py",
          code: `from noetic import Noetic

noetic = Noetic(api_key=os.environ["NOETIC_KEY"])

image = noetic.images.generate(
    model="noetic-image-3",
    prompt="a glass perfume bottle on wet stone",
    aspect_ratio="16:9",
)`,
        },
        {
          _key: "curl",
          label: "cURL",
          language: "curl",
          code: `# POST a generation
curl https://api.noetic.ai/v1/images/generations \
  -H "Authorization: Bearer $NOETIC_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "model": "noetic-image-3",
       "prompt": "a glass perfume bottle on wet stone",
       "aspect_ratio": "16:9" }'`,
        },
      ],
      endpointGroup: {
        heading: "Image Generation API",
        baseUrl: "https://api.noetic.ai/v1",
        rows: [
          { _key: "generations", method: "POST", endpoint: "/images/generations", description: "Text-to-image generation with model selection & prompt parameters." },
          { _key: "edits", method: "POST", endpoint: "/images/edits", description: "Inpainting, object removal, background replacement & outpainting." },
          { _key: "image-id", method: "GET", endpoint: "/images/{id}", description: "Retrieve a generation, its metadata and available aspect ratios." },
          { _key: "assets", method: "GET", endpoint: "/assets", description: "List, organize and manage generations in your asset library." },
          { _key: "asset-delete", method: "DEL", endpoint: "/assets/{id}", description: "Permanently delete an asset and its metadata." },
        ],
      },
      cards: [
        { _key: "overview", title: "API Overview", href: "#", items: ["Authentication", "Rate limits", "SDKs", "API architecture"] },
        { _key: "image-generation", title: "Image Generation API", href: "#", items: ["Text-to-image", "Model selection", "Prompt parameters", "Aspect ratios"] },
        { _key: "image-editing", title: "Image Editing API", href: "#", items: ["Inpainting", "Object removal", "Background replacement", "Outpainting"] },
        { _key: "asset-management", title: "Asset Management API", href: "#", items: ["Upload assets", "Organize generations", "Metadata management"] },
        { _key: "webhooks", title: "Webhooks", href: "#", items: ["Generation completed", "Failed jobs", "Processing status"] },
        { _key: "sdks", title: "SDKs & Examples", href: "#", items: ["JavaScript", "Python", "REST API", "Next.js examples"] },
        { _key: "changelog", title: "API Changelog", href: "#", items: ["New endpoints", "Deprecations", "Model updates"] },
      ],
    },
    {
      _key: "newsletter",
      _type: "ctaBannerBlock",
      blockName: "resources-newsletter",
      heading: "Ship notes, model drops, and prompts.",
      headingLevel: "h2",
      body: "One concise email when something genuinely new lands. No noise.",
      alignment: "center",
      tone: "inverse",
      background: { auroraTone: "default" },
      emailCapture: {
        enabled: true,
        placeholder: "you@studio.com",
        buttonLabel: "Subscribe",
        successTitle: "You're in.",
        successBody: "Watch your inbox.",
      },
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded resources page: ${res._id}`);