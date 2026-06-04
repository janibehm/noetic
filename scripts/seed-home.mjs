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
      eyebrow: "The spatial canvas for AI imagery",
      heading: "Generate production-ready visuals in seconds.",
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
      label: "One canvas. Every operation.",
      words: ["Generate.", "Edit.", "Upscale.", "Expand.", "Automate."],
      auroraTone: "cool",
    },
    {
      _key: "bento",
      _type: "bentoShowcaseBlock",
      heading: "Everything you'd open eight apps for.",
      lead: "One model family, one interface — from first prompt to final asset. Hover any surface to see it come alive.",
      items: [
        {
          _key: "b1",
          _type: "bentoItem",
          title: "AI Image Generation",
          body: "Text-to-image at up to 4K, with photoreal and stylized model families.",
          tag: "Flagship",
          media: { kind: "aurora", auroraTone: "default" },
          span: { columns: 2, rows: 2 },
        },
        {
          _key: "b2",
          _type: "bentoItem",
          title: "Image Editing",
          body: "Inpaint, replace, recompose.",
          media: { kind: "aurora", auroraTone: "default" },
          span: { columns: 1, rows: 1 },
        },
        {
          _key: "b3",
          _type: "bentoItem",
          title: "Background Removal",
          body: "Pixel-perfect cutouts, instantly.",
          media: { kind: "aurora", auroraTone: "warm" },
          span: { columns: 1, rows: 1 },
        },
        {
          _key: "b4",
          _type: "bentoItem",
          title: "Product Photography",
          body: "Studio-grade product shots from a single reference.",
          media: { kind: "aurora", auroraTone: "default" },
          span: { columns: 2, rows: 1 },
        },
        {
          _key: "b5",
          _type: "bentoItem",
          title: "Upscaling",
          body: "Up to 10× detail recovery.",
          media: { kind: "aurora", auroraTone: "cool" },
          span: { columns: 1, rows: 1 },
        },
        {
          _key: "b6",
          _type: "bentoItem",
          title: "Character Design",
          body: "Consistent characters across scenes.",
          media: { kind: "aurora", auroraTone: "warm" },
          span: { columns: 1, rows: 1 },
        },
        {
          _key: "b7",
          _type: "bentoItem",
          title: "Marketing Visuals",
          body: "Campaign-ready creative in every aspect ratio.",
          media: { kind: "aurora", auroraTone: "default" },
          span: { columns: 2, rows: 1 },
        },
      ],
    },
    {
      _key: "howItWorks",
      _type: "howItWorksBlock",
      heading: "Idea to export in three moves.",
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
      source: "latest",
      limit: 6,
      category: "lab",
      viewAllCta: { label: "Visit the Lab →", href: "/lab" },
    },
    {
      _key: "cta",
      _type: "ctaBannerBlock",
      heading: "Your next visual is one prompt away.",
      body: "Join the teams generating millions of production assets on noetic.",
      alignment: "center",
      tone: "inverse",
      primaryCta: { label: "Get started", href: "/contact" },
      background: { auroraTone: "default" },
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log("Seeded:", res._id, "rev", res._rev);
