import { defineField, defineType } from "sanity";
import { blockNameField } from "../shared/_block-name";

/**
 * Home — Scroll-scrub typography.
 *
 * Sticky stage that cycles a sequence of single words as the viewer scrolls.
 * Matches `noetic_CLAUDE_DESIGN/index.html` → section (2).
 */
export const scrubWordsBlock = defineType({
  name: "scrubWordsBlock",
  type: "object",
  title: "Home · Scrub words",
  fields: [
    blockNameField,
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "Small kicker shown above the scrubbing word.",
      initialValue: "One canvas. Every operation.",
    }),
    defineField({
      name: "words",
      type: "array",
      title: "Words",
      description:
        "Sequence of words revealed as the user scrolls. 3–8 words works best.",
      of: [{ type: "string" }],
      validation: (r) => r.min(2).max(10),
    }),
    defineField({
      name: "auroraTone",
      type: "string",
      title: "Aurora tone",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Cool", value: "cool" },
          { title: "Warm", value: "warm" },
        ],
        layout: "radio",
      },
      initialValue: "cool",
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "label", words: "words" },
    prepare: ({ blockName, title, words }) => ({
      title: blockName || title || "Scrub words",
      subtitle: Array.isArray(words) ? words.join(" · ") : undefined,
    }),
  },
});
