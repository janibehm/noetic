import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";

/**
 * Home — Hero with prompt bar.
 *
 * Full-bleed cinematic hero featuring an animated prompt input that
 * cycles through example ideas. Matches the design in
 * `noetic_CLAUDE_DESIGN/index.html` → section (1) "INTERACTIVE HERO".
 */
export const heroPromptBlock = defineType({
  name: "heroPromptBlock",
  type: "object",
  title: "Home · Hero with prompt",
  fields: [
    blockNameField,
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Small kicker line above the headline.",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lead",
      type: "text",
      title: "Lead",
      rows: 3,
    }),
    defineField({
      name: "promptIdeas",
      type: "array",
      title: "Prompt typewriter ideas",
      description:
        "Phrases cycled in the prompt bar placeholder. Keep each under ~80 chars.",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary CTA (submit button)",
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          initialValue: "Generate",
        }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
    }),
    defineField({
      name: "background",
      type: "object",
      title: "Background",
      fields: [
        defineField({
          name: "video",
          type: "file",
          title: "Background video",
          options: { accept: "video/*" },
        }),
        defineField({
          name: "poster",
          type: "image",
          title: "Poster image",
          description:
            "Shown while the video loads or as a fallback when video is absent.",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "showScrollCue",
      type: "boolean",
      title: "Show scroll cue",
      initialValue: true,
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", subtitle: "eyebrow" },
    prepare: ({ blockName, title, subtitle }) => ({
      title: blockName || title || "Home hero",
      subtitle: subtitle || "Hero with prompt",
    }),
  },
});
