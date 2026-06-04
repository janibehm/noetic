import { defineField, defineType } from "sanity";
import { blockNameField } from "./_block-name";
import { headingLevelField } from "./_heading-level";

/**
 * Shared — CTA banner.
 *
 * Reusable call-to-action card used across the site (home final CTA,
 * pricing final CTA, careers, lab spotlight, products/solutions demo
 * banners, resources newsletter). Supports:
 *
 *  - Heading, body, optional supporting bullets
 *  - Primary CTA (required) + optional secondary CTA
 *  - Alignment (center | start)
 *  - Tone (inverse cinematic vs. surface card)
 *  - Optional background image + aurora gradient tone
 */
export const ctaBannerBlock = defineType({
  name: "ctaBannerBlock",
  type: "object",
  title: "CTA banner",
  fieldsets: [{ name: "heading", title: "Heading", options: { columns: 2 } }],
  fields: [
    blockNameField,
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      fieldset: "heading",
      validation: (r) => r.required(),
    }),
    headingLevelField("h2"),
    defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
    defineField({
      name: "bullets",
      type: "array",
      title: "Supporting bullets",
      description: "Optional list of supporting points (e.g. Solutions demo).",
      of: [{ type: "string" }],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary CTA",
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "href",
          type: "string",
          title: "URL",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      type: "object",
      title: "Secondary CTA",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Start", value: "start" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Inverse (cinematic dark)", value: "inverse" },
          { title: "Surface (light card)", value: "surface" },
          { title: "Subtle", value: "subtle" },
          { title: "Accent", value: "accent" },
        ],
        layout: "radio",
      },
      initialValue: "inverse",
    }),
    defineField({
      name: "background",
      type: "object",
      title: "Background",
      fields: [
        defineField({
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
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
          initialValue: "default",
        }),
      ],
    }),
  ],
  preview: {
    select: { blockName: "blockName", title: "heading", subtitle: "primaryCta.label" },
    prepare: ({ blockName, title, subtitle }) => ({
      title: blockName || title || "CTA banner",
      subtitle,
    }),
  },
});
