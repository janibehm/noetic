#!/usr/bin/env node
// One-off seed: create a generic Solutions page matching
// noetic_CLAUDE_DESIGN/solutions.html. Safe to re-run.
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
  _id: "page-solutions",
  _type: "page",
  title: "Solutions",
  slug: { _type: "slug", current: "solutions" },
  seoDescription: "A visual engine for marketing, e-commerce, game studios, and creative agencies.",
  blocks: [
    {
      _key: "hero",
      _type: "solutionHeroBlock",
      blockName: "solutions-hero",
      eyebrow: "Solutions",
      heading: "A visual engine for every kind of team.",
      headingLevel: "h1",
      lead: "Marketing, e-commerce, game studios and agencies all run on noetic - one canvas that adapts to how each team creates.",
      cardHeading: "From brief to campaign in an afternoon.",
      cardBody: "Tell us the outcome. noetic handles the variations, formats and exports.",
      cta: { label: "Talk to us", href: "/contact" },
    },
    {
      _key: "logos",
      _type: "logoMarqueeBlock",
      blockName: "solutions-logo-marquee",
      logos: ["Helio", "Northwind", "Vantage", "Lumen", "Atlas", "Forge", "Quanta", "Nimbus"],
    },
    {
      _key: "workflow",
      _type: "howItWorksBlock",
      blockName: "solutions-workflow",
      heading: "One flow, infinitely repeatable.",
      headingLevel: "h2",
      steps: [
        { _key: "brief", title: "Brief the canvas", body: "Drop references, brand kit and a goal.", icon: "prompt" },
        { _key: "generate", title: "Generate & refine", body: "Branch directions, lock the winners.", icon: "grid" },
        { _key: "ship", title: "Ship everywhere", body: "Export every format and channel.", icon: "export" },
      ],
    },
    {
      _key: "useCases",
      _type: "solutionAccordionBlock",
      blockName: "solutions-use-cases",
      heading: "Pick a team. Watch it adapt.",
      headingLevel: "h2",
      items: [
        { _key: "marketing", title: "Marketing Teams", body: "Generate on-brand campaign visuals for every channel, ratio and locale in minutes.", auroraTone: "warm" },
        { _key: "ecommerce", title: "E-commerce", body: "Create product imagery and lifestyle shots without a photo studio or shipping samples.", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=70" },
        { _key: "games", title: "Game Development", body: "Explore concept art, environments and character design at the speed of ideation.", auroraTone: "cool" },
        { _key: "agencies", title: "Creative Agencies", body: "Move from rapid ideation to client-ready concepts in a single working session.", imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=70" },
      ],
    },
    {
      _key: "quote",
      _type: "pullQuoteBlock",
      blockName: "solutions-quote",
      quote: "We replaced three vendors and a month of lead time with one canvas.",
      alignment: "center",
      author: {
        name: "Daniel Osei",
        role: "Creative Director, Vantage",
      },
    },
    {
      _key: "solutionSections",
      _type: "solutionFeatureSectionsBlock",
      blockName: "solutions-feature-sections",
      sections: [
        {
          _key: "marketing",
          eyebrow: "Marketing Teams",
          heading: "Campaigns that keep up with the calendar.",
          body: "Spin up a full set of on-brand assets the moment a brief lands.",
          bullets: ["Ad creatives", "Social campaigns", "Landing page visuals"],
          auroraTone: "default",
        },
        {
          _key: "ecommerce",
          eyebrow: "E-commerce",
          heading: "A studio behind every product.",
          body: "Photoreal product and lifestyle imagery from a single reference shot.",
          bullets: ["Product photos", "Background replacement", "Marketplace assets"],
          flip: true,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=70",
        },
        {
          _key: "games",
          eyebrow: "Game Development",
          heading: "Worlds, faster than you can sketch them.",
          body: "Concept entire worlds and casts before the first asset is modeled.",
          bullets: ["Character concepts", "Environment concepts", "Moodboards"],
          auroraTone: "cool",
        },
        {
          _key: "agencies",
          eyebrow: "Creative Agencies",
          heading: "Pitch in pictures, not promises.",
          body: "Turn a kickoff into client-ready concepts the same day.",
          bullets: ["Creative exploration", "Pitch decks", "Storyboards"],
          flip: true,
          imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=70",
        },
      ],
    },
    {
      _key: "demo",
      _type: "demoFormBlock",
      blockName: "solutions-demo-form",
      heading: "Find your team's workflow.",
      body: "Tell us what you create. We'll show you the fastest path on noetic.",
      submitLabel: "Request demo",
      showCompanyField: false,
      selectLabel: "Your team",
      selectOptions: ["Marketing", "E-commerce", "Game development", "Agency", "Other"],
      messagePlaceholder: "What are you trying to create?",
      successTitle: "Thanks - we'll be in touch shortly.",
      successBody: "A specialist will tailor a walkthrough to your team.",
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded solutions page: ${res._id}`);