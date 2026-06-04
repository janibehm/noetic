import { defineField } from "sanity";

/**
 * Editor-only "Block name" field.
 *
 * Added to every block schema as the first field so authors can
 * label individual instances inside the page builder list (e.g.
 * "Homepage hero", "Pricing CTA"). The value is never rendered on
 * the front-end — it is purely a Studio aid surfaced through each
 * block's `preview.prepare`.
 */
export const blockNameField = defineField({
  name: "blockName",
  type: "string",
  title: "Block name",
  description:
    "Editor-only label shown in the page builder list. Not rendered on the site.",
});
