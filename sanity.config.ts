import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, SINGLETON_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Noetic Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Hide create/duplicate/delete for singleton document types.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              !["unpublish", "delete", "duplicate"].includes(action),
          )
        : input,
  },
});
