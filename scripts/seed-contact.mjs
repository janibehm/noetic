#!/usr/bin/env node
// One-off seed: create a generic Contact page matching
// noetic_CLAUDE_DESIGN/contact.html. Safe to re-run.
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
  _id: "page-contact",
  _type: "page",
  title: "Contact",
  slug: { _type: "slug", current: "contact" },
  seoDescription: "Contact noetic for demos, support, press, partnerships, or hard questions.",
  blocks: [
    {
      _key: "contact",
      _type: "contactBlock",
      blockName: "contact-page",
      eyebrow: "Contact",
      heading: "Let's make something.",
      headingLevel: "h1",
      lead: "Tell us what you're building. Whether it's a demo, a partnership or a hard question - a real person will reply.",
      channels: [
        { _key: "sales", label: "Sales & demos", email: "sales@noetic.ai" },
        { _key: "support", label: "Support", email: "help@noetic.ai" },
        { _key: "press", label: "Press", email: "press@noetic.ai" },
      ],
      submitLabel: "Send message",
      selectLabel: "Team size",
      selectOptions: ["Just me", "2-10", "11-50", "51-200", "200+"],
      messagePlaceholder: "Tell us a little about your project",
      successBadge: "Message sent",
      successTitle: "Thanks for reaching out.",
      successBody: "We've received your note and a member of the team will reply within one business day.",
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log(`Seeded contact page: ${res._id}`);