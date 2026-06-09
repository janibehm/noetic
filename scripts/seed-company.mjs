#!/usr/bin/env node
// One-off seed: create a generic Company page matching
// noetic_CLAUDE_DESIGN/company.html. Safe to re-run.
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

const photo = (id) => `https://images.unsplash.com/photo-${id}?w=500&q=70`;

const doc = {
  _id: "page-company",
  _type: "page",
  title: "Company",
  slug: { _type: "slug", current: "company" },
  seoDescription: "Meet noetic's mission, team, partners, and open roles.",
  blocks: [
    {
      _key: "mission",
      _type: "companyHeroBlock",
      blockName: "company-mission",
      eyebrow: "Our mission",
      heading: "Empowering anyone to create professional visual content with AI.",
      highlight: "professional visual content",
      headingLevel: "h1",
      lead: "noetic began with a simple belief: the gap between an idea and a finished image should be measured in seconds, not weeks - and it shouldn't require a studio, a budget or a decade of craft.",
      stats: [
        { _key: "founded", value: "2022", label: "founded" },
        { _key: "people", value: "120+", label: "people" },
        { _key: "assets", value: "38M", label: "assets generated" },
        { _key: "countries", value: "60+", label: "countries" },
      ],
    },
    {
      _key: "team",
      _type: "companyTeamBlock",
      blockName: "company-team",
      heading: "Researchers, artists and engineers.",
      headingLevel: "h2",
      members: [
        { _key: "iris", name: "Iris Tanaka", role: "Lead Applied Researcher", imageUrl: photo("1494790108377-be9c29b29330") },
        { _key: "daniel", name: "Daniel Osei", role: "Head of Design", imageUrl: photo("1500648767791-00dcc994a43e") },
        { _key: "mara", name: "Mara Delgado", role: "VP Product", imageUrl: photo("1534528741775-53994a69daeb") },
        { _key: "leo", name: "Leo Bauer", role: "Principal Engineer", imageUrl: photo("1507003211169-0a1dd7228f2d") },
        { _key: "sana", name: "Sana Iqbal", role: "Research Scientist", imageUrl: photo("1438761681033-6461ffad8d80") },
        { _key: "marco", name: "Marco Reyes", role: "Model Infrastructure", imageUrl: photo("1472099645785-5658abf4ff4e") },
        { _key: "nadia", name: "Nadia Khan", role: "Creative Lead", imageUrl: photo("1517841905240-472988babdf9") },
      ],
    },
    {
      _key: "partners",
      _type: "companyPartnersBlock",
      blockName: "company-partners",
      heading: "Teams of every size build on noetic.",
      headingLevel: "h2",
      logos: ["Helio", "Northwind", "Vantage", "Lumen", "Atlas", "Forge", "Quanta", "Nimbus", "Verve", "Orbital"],
    },
    {
      _key: "jobs",
      _type: "companyJobsBlock",
      blockName: "company-careers",
      heading: "Open positions.",
      headingLevel: "h2",
      jobs: [
        { _key: "researcher", title: "Senior Diffusion Researcher", team: "Research", location: "Remote", href: "#" },
        { _key: "designer", title: "Product Designer, Canvas", team: "Design", location: "London", href: "#" },
        { _key: "inference", title: "Staff Engineer, Inference", team: "Engineering", location: "Remote", href: "#" },
        { _key: "advocate", title: "Developer Advocate", team: "Growth", location: "New York", href: "#" },
        { _key: "brand", title: "Brand & Motion Designer", team: "Marketing", location: "Remote", href: "#" },
      ],
    },
    {
      _key: "careerCta",
      _type: "ctaBannerBlock",
      blockName: "company-careers-cta",
      heading: "Don't see your role?",
      headingLevel: "h2",
      body: "We're always looking for people who care about craft. Tell us what you'd build.",
      primaryCta: { label: "Get in touch", href: "/contact" },
      alignment: "center",
      tone: "inverse",
      background: { auroraTone: "default", video: assets.file("11904052_1280_720_24fps.mp4") },
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded company page: ${res._id}`);