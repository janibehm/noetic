import { defineField } from "sanity";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function headingLevelField(initialValue: HeadingLevel = "h2") {
  return defineField({
    name: "headingLevel",
    type: "string",
    title: "Heading level",
    fieldset: "heading",
    description: "Controls the heading tag and approved visual size for this block heading.",
    initialValue,
    options: {
      list: [
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
      ],
      layout: "radio",
    },
  });
}
