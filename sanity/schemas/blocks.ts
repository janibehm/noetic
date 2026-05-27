import { defineField, defineType } from "sanity";

/**
 * Hero block — title, eyebrow, lead paragraph, optional image and CTA.
 */
export const heroBlock = defineType({
  name: "heroBlock",
  type: "object",
  title: "Hero",
  fields: [
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 3 }),
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Canvas", value: "canvas" },
          { title: "Surface", value: "surface" },
          { title: "Subtle", value: "subtle" },
          { title: "Inverse", value: "inverse" },
          { title: "Accent", value: "accent" },
        ],
        layout: "radio",
      },
      initialValue: "canvas",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary CTA",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Hero",
      subtitle: subtitle || "Hero block",
    }),
  },
});

/**
 * Rich-text block — body copy rendered through Portable Text and
 * constrained to a comfortable reading measure.
 */
export const richTextBlock = defineType({
  name: "richTextBlock",
  type: "object",
  title: "Rich text",
  fields: [
    defineField({
      name: "content",
      type: "portableText",
      title: "Content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tone",
      type: "string",
      title: "Tone",
      options: {
        list: [
          { title: "Canvas", value: "canvas" },
          { title: "Surface", value: "surface" },
          { title: "Subtle", value: "subtle" },
          { title: "Accent", value: "accent" },
        ],
      },
      initialValue: "canvas",
    }),
  ],
  preview: { prepare: () => ({ title: "Rich text block" }) },
});

/**
 * Callout block — short, emphasized message.
 */
export const calloutBlock = defineType({
  name: "calloutBlock",
  type: "object",
  title: "Callout",
  fields: [
    defineField({
      name: "intent",
      type: "string",
      title: "Intent",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Danger", value: "danger" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "body", type: "portableText", title: "Body" }),
  ],
  preview: {
    select: { title: "title", subtitle: "intent" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Callout",
      subtitle,
    }),
  },
});

/**
 * Feature grid block — list of cards with icon/image, heading, body.
 */
export const featureGridBlock = defineType({
  name: "featureGridBlock",
  type: "object",
  title: "Feature grid",
  fields: [
    defineField({ name: "heading", type: "string", title: "Heading" }),
    defineField({ name: "lead", type: "text", title: "Lead", rows: 2 }),
    defineField({
      name: "columns",
      type: "number",
      title: "Columns",
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Feature grid",
      subtitle: "Feature grid block",
    }),
  },
});

/**
 * Media block — image or video with optional caption, full or contained.
 */
export const mediaBlock = defineType({
  name: "mediaBlock",
  type: "object",
  title: "Media",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
    defineField({
      name: "width",
      type: "string",
      title: "Width",
      options: {
        list: [
          { title: "Measure (text width)", value: "measure" },
          { title: "Container", value: "container" },
          { title: "Full bleed", value: "full" },
        ],
      },
      initialValue: "container",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Media",
      media,
    }),
  },
});
