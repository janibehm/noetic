#!/usr/bin/env node
// One-off seed: create a generic Pricing page matching
// noetic_CLAUDE_DESIGN/pricing.html. Safe to re-run.
import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const groups = [
  {
    _key: "generation",
    name: "Generation",
    rows: [
      { _key: "monthlyCredits", feature: "Monthly credits", values: ["50", "1,200", "5,000", "Unlimited", "Custom"] },
      { _key: "imageModels", feature: "Image models", values: ["Standard", "All base", "All + premium", "All + premium", "Custom"] },
      { _key: "maxResolution", feature: "Max resolution", values: ["720p", "2K", "4K", "4K+", "Custom"] },
      { _key: "videoGeneration", feature: "Video generation", values: ["no", "Short clips", "yes", "yes", "yes"] },
      { _key: "concurrent", feature: "Concurrent generations", values: ["1", "3", "6", "12", "Custom"] },
    ],
  },
  {
    _key: "editing",
    name: "Editing",
    rows: [
      { _key: "inpainting", feature: "Inpainting & object removal", values: ["no", "yes", "yes", "yes", "yes"] },
      { _key: "background", feature: "Background replacement", values: ["no", "yes", "yes", "yes", "yes"] },
      { _key: "upscaling", feature: "Upscaling", values: ["no", "2x", "4x", "Max", "Max"] },
      { _key: "outpainting", feature: "Outpainting", values: ["no", "no", "yes", "yes", "yes"] },
    ],
  },
  {
    _key: "workflow",
    name: "Workflow",
    rows: [
      { _key: "brandKits", feature: "Brand kits", values: ["no", "no", "yes", "yes", "yes"] },
      { _key: "batch", feature: "Batch automation", values: ["no", "no", "yes", "yes", "yes"] },
      { _key: "api", feature: "API access", values: ["no", "no", "Trial", "Full", "Full"] },
      { _key: "seats", feature: "Team seats", values: ["1", "1", "1", "3", "Custom"] },
    ],
  },
  {
    _key: "supportLegal",
    name: "Support & legal",
    rows: [
      { _key: "license", feature: "Commercial license", values: ["no", "yes", "yes", "yes", "yes"] },
      { _key: "priority", feature: "Priority support", values: ["no", "no", "yes", "yes", "Dedicated"] },
      { _key: "sso", feature: "SSO / SAML", values: ["no", "no", "no", "no", "yes"] },
      { _key: "sla", feature: "SLA & governance", values: ["no", "no", "no", "no", "yes"] },
    ],
  },
];

const doc = {
  _id: "page-pricing",
  _type: "page",
  title: "Pricing",
  slug: { _type: "slug", current: "pricing" },
  seoDescription: "Start free with noetic and upgrade for more credits, higher resolution, commercial licensing, and enterprise governance.",
  blocks: [
    {
      _key: "pricingHero",
      _type: "pricingHeroBlock",
      blockName: "pricing-hero",
      eyebrow: "Pricing",
      heading: "Create at any scale.",
      headingLevel: "h1",
      lead: "Start free. Upgrade when you need more credits, higher resolution and the full pipeline. Cancel anytime.",
      monthlyLabel: "Monthly",
      annualLabel: "Annual",
      saveBadge: "Save 20%",
    },
    {
      _key: "tiers",
      _type: "pricingTiersBlock",
      blockName: "pricing-tiers",
      creditsNote: "Credits are spent per generation - an image ~= 1 credit, a second of video ~= 10 credits. Relaxed generations on Unlimited never touch your balance.",
      plans: [
        {
          _key: "free",
          name: "Free",
          description: "For exploring what noetic can do.",
          monthlyPrice: 0,
          annualPrice: 0,
          monthlyBillNote: "Free forever",
          annualBillNote: "Free forever",
          cta: { label: "Get started", href: "/contact" },
          ctaVariant: "ghost",
          features: [
            { _key: "credits", highlight: "50 credits", text: "/ month" },
            { _key: "model", text: "Standard image model" },
            { _key: "resolution", text: "Up to 720p resolution" },
            { _key: "personal", text: "Personal use only", muted: true },
            { _key: "watermark", text: "noetic watermark", muted: true },
          ],
        },
        {
          _key: "plus",
          name: "Plus",
          description: "For creators shipping regularly.",
          monthlyPrice: 12,
          annualPrice: 9,
          monthlyBillNote: "Billed monthly",
          annualBillNote: "Billed annually",
          cta: { label: "Choose Plus", href: "/contact" },
          ctaVariant: "solid",
          features: [
            { _key: "credits", highlight: "1,200 credits", text: "/ month" },
            { _key: "models", text: "All base image models" },
            { _key: "media", text: "Up to 2K - image + short video" },
            { _key: "license", text: "Commercial license" },
            { _key: "watermark", text: "No watermark" },
          ],
        },
        {
          _key: "pro",
          name: "Pro",
          description: "For professionals and small teams.",
          monthlyPrice: 30,
          annualPrice: 24,
          monthlyBillNote: "Billed monthly",
          annualBillNote: "Billed annually",
          cta: { label: "Choose Pro", href: "/contact" },
          ctaVariant: "solid",
          featured: true,
          badge: "Most popular",
          features: [
            { _key: "credits", highlight: "5,000 credits", text: "/ month" },
            { _key: "models", text: "All models, incl. premium" },
            { _key: "studio", text: "4K upscaling + Editing Studio" },
            { _key: "priority", text: "Priority generation queue" },
            { _key: "api", text: "API access (trial)" },
          ],
        },
        {
          _key: "unlimited",
          name: "Unlimited",
          description: "For power users and studios.",
          monthlyPrice: 80,
          annualPrice: 64,
          monthlyBillNote: "Billed monthly",
          annualBillNote: "Billed annually",
          cta: { label: "Choose Unlimited", href: "/contact" },
          ctaVariant: "ghost",
          features: [
            { _key: "unlimited", highlight: "Unlimited", text: "relaxed generations" },
            { _key: "resolution", text: "Max resolution & video length" },
            { _key: "api", text: "Full API access" },
            { _key: "brand", text: "Brand kits & batch automation" },
            { _key: "support", text: "3 team seats - priority support" },
          ],
        },
      ],
      enterprise: {
        heading: "Enterprise",
        body: "Governance, single sign-on, custom models and the support to roll noetic out across your whole organization.",
        cta: { label: "Contact sales", href: "/contact" },
      },
    },
    {
      _key: "comparison",
      _type: "pricingComparisonBlock",
      blockName: "pricing-comparison",
      heading: "Compare every plan.",
      headingLevel: "h2",
      featuredPlanIndex: 2,
      plans: ["Free", "Plus", "Pro", "Unlimited", "Enterprise"],
      groups,
    },
    {
      _key: "faq",
      _type: "pricingFaqBlock",
      blockName: "pricing-faq",
      heading: "Questions, answered.",
      headingLevel: "h2",
      items: [
        { _key: "credits", question: "What exactly is a credit?", answer: "Credits are how generations are metered. A single image costs about one credit, and a second of generated video costs about ten. You'll always see the cost before you generate, and your balance refreshes at the start of each billing cycle." },
        { _key: "change", question: "Can I change or cancel my plan anytime?", answer: "Yes. Upgrade, downgrade or cancel from your account at any time. Upgrades take effect immediately and we prorate the difference; downgrades apply at the start of your next cycle." },
        { _key: "rollover", question: "Do unused credits roll over?", answer: "Monthly credits reset at the start of each cycle and don't roll over. On the Unlimited plan, relaxed-speed generations are uncapped, so you never have to think about a balance." },
        { _key: "commercial", question: "Can I use what I generate commercially?", answer: "On Plus and above, every generation ships with a commercial license and clear usage rights. The Free plan is for personal, non-commercial exploration." },
        { _key: "priority", question: "What's the difference between priority and relaxed generation?", answer: "Priority generations jump to the front of the queue for the fastest possible result and draw from your credits. Relaxed generations run when capacity is available - slightly slower, but unlimited on the Unlimited plan." },
        { _key: "annual", question: "How does annual billing work?", answer: "Switch the toggle to Annual and you'll pay for twelve months up front at a 20% discount versus paying month to month. You can still cancel and we'll refund the unused remainder per our terms." },
      ],
    },
    {
      _key: "cta",
      _type: "ctaBannerBlock",
      blockName: "pricing-cta",
      heading: "Start creating for free.",
      headingLevel: "h2",
      body: "No card required. Bring your first idea - keep what you make.",
      alignment: "center",
      tone: "inverse",
      primaryCta: { label: "Get started", href: "/contact" },
      background: { auroraTone: "default" },
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded pricing page: ${res._id}`);