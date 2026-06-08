#!/usr/bin/env node
// One-off seed: create a generic Products page matching
// noetic_CLAUDE_DESIGN/products.html. Safe to re-run.
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
  _id: "page-products",
  _type: "page",
  title: "Products",
  slug: { _type: "slug", current: "products" },
  seoDescription: "Generate, edit, and manage visual assets at scale with noetic.",
  blocks: [
    {
      _key: "productsHero",
      _type: "productHeroBlock",
      blockName: "products-hero",
      eyebrow: "Enterprise AI Image Platform",
      heading: "Generate, edit and manage visual assets at scale.",
      headingLevel: "h1",
      lead: "One governed platform for every team that ships imagery — from a single hero shot to a hundred thousand localized variants.",
      primaryCta: { label: "Book a demo", href: "/contact" },
      secondaryCta: { label: "Read the docs", href: "/resources" },
      promptText: "a cinematic product shot of a glass perfume bottle on wet stone...",
      dashboardItems: [
        { _key: "generate", label: "Generate" },
        { _key: "editing", label: "Editing Studio", color: "#3ba2ff" },
        { _key: "brand", label: "Brand Assets", color: "#45e0c8" },
        { _key: "workflows", label: "Workflows", color: "#ff6fae" },
        { _key: "library", label: "Library", color: "#c6ff7a" },
      ],
      thumbnails: [
        { _key: "t1", featured: true, auroraTone: "warm", video: assets.file("SQUARE_ABSTRACT_SPHERE.mp4"), image: assets.image("SQUARE_abstract4.jpg", "Abstract sphere") },
        { _key: "t2", auroraTone: "warm", image: assets.image("SQUARE_abstract2.jpg", "Abstract render") },
        { _key: "t3", auroraTone: "default", image: assets.image("SQUARE_abstract3.jpg", "Abstract render") },
        { _key: "t4", auroraTone: "cool", image: assets.image("SQUARE_aquarium.png", "Aquarium scene") },
        { _key: "t5", auroraTone: "cool", image: assets.image("SQUARE_city_view.jpg", "City view") },
      ],
    },
    {
      _key: "logos",
      _type: "logoMarqueeBlock",
      blockName: "logo-marquee",
      heading: "Trusted to generate production imagery by teams at",
      highlightedText: "production imagery",
      logos: ["Helio", "Northwind", "Vantage", "Lumen", "Atlas", "Forge", "Quanta", "Nimbus", "Verve", "Orbital"],
    },
    {
      _key: "productCards",
      _type: "productCardGridBlock",
      blockName: "product-cards",
      heading: "Four products. One pipeline.",
      headingLevel: "h2",
      items: [
        { _key: "generation", title: "AI Image Generation", body: "Create visuals from text prompts across photoreal and stylized model families, up to 4K.", href: "/articles/ai-image-generation", auroraTone: "default", image: assets.image("SQUARE_abstract5.jpg", "AI-generated abstract") },
        { _key: "editing", title: "AI Editing Studio", body: "Remove objects, replace backgrounds and inpaint regions with prompt-level control.", href: "/articles/ai-editing-studio", auroraTone: "cool", image: assets.image("SQUARE_street_view.jpg", "Street scene edit") },
        { _key: "brand", title: "Brand Asset Generator", body: "Produce ad creatives, banners and social visuals locked to your brand kit.", href: "/articles/brand-asset-generator", auroraTone: "warm", image: assets.image("SQUARE_blueberries.jpg", "On-brand product visual") },
        { _key: "workflows", title: "Visual Workflow Automation", body: "Generate hundreds of assets automatically from a spreadsheet, feed or API call.", href: "/articles/visual-workflow-automation", auroraTone: "cool", image: assets.image("SQUARE_CITY_BUS.jpg", "Batch-generated visual") },
      ],
    },
    {
      _key: "enterprise",
      _type: "productStickyStackBlock",
      blockName: "enterprise-stack",
      heading: "Built for the way teams actually ship.",
      headingLevel: "h2",
      steps: [
        { _key: "brand", title: "Brand consistency", body: "Lock palettes, typography and references so every generation stays unmistakably on-brand.", auroraTone: "default", image: assets.image("SQUARE_abstract6.jpg", "Brand palette abstract") },
        { _key: "team", title: "Team collaboration", body: "Shared canvases, comments and version history keep designers, marketers and PMs in one space.", auroraTone: "cool", image: assets.image("SQUARE_desert_landscape.jpg", "Expansive desert landscape") },
        { _key: "governance", title: "Asset governance", body: "Roles, approvals and audit trails give legal and brand teams full control before anything ships.", auroraTone: "cool", image: assets.image("SQUARE_mountain_landscape.jpg", "Mountain landscape") },
        { _key: "pipelines", title: "Fast generation pipelines", body: "Batch thousands of assets through reproducible pipelines with sub-second queue times.", auroraTone: "warm", image: assets.image("pexels-wolfgang-weiser-467045605-31140640.jpg", "Generated scene") },
      ],
    },
    {
      _key: "articles",
      _type: "articleCarouselBlock",
      blockName: "platform-team-articles",
      heading: "From the platform team.",
      headingLevel: "h2",
      source: "latest",
      limit: 6,
    },
    {
      _key: "trust",
      _type: "productTrustGridBlock",
      blockName: "trust-grid",
      heading: "Enterprise trust, by default.",
      headingLevel: "h2",
      items: [
        { _key: "privacy", icon: "shield", title: "Data privacy", body: "Your prompts and assets are never used to train base models. Full deletion on request." },
        { _key: "security", icon: "lock", title: "Enterprise security", body: "SOC 2 Type II, SSO/SAML, SCIM provisioning and regional data residency." },
        { _key: "licensing", icon: "license", title: "Commercial licensing", body: "Every generation ships with clear commercial rights and indemnification for your business." },
      ],
    },
    {
      _key: "demo",
      _type: "demoFormBlock",
      blockName: "demo-form",
      heading: "See noetic on your assets.",
      body: "Book a 30-minute walkthrough. We'll generate a live set of visuals from your real brand brief.",
      bullets: ["Tailored to your use case", "Security & rollout Q&A", "Pricing for your team size"],
      submitLabel: "Request demo",
      successTitle: "Thanks - we'll be in touch within one business day.",
      successBody: "A product specialist will reach out to schedule your walkthrough.",
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded products page: ${res._id}`);