import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS, SINGLETON_TYPES } from "./schemas";

/**
 * Studio structure:
 *  - Pin singletons (e.g. Home page) at the top with a fixed `_id`.
 *  - List all other document types below, hiding singleton types from
 *    the generic list so editors can't create duplicates.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(
          S.document().schemaType("homePage").documentId(SINGLETON_IDS.homePage),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() ?? ""),
      ),
    ]);
