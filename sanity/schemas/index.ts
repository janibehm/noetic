import type { SchemaTypeDefinition } from "sanity";
import { portableText } from "./portable-text";
import { codeBlock } from "./code-block";
import {
  heroBlock,
  richTextBlock,
  calloutBlock,
  featureGridBlock,
  mediaBlock,
} from "./blocks";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Primitives & shared
  portableText,
  codeBlock,
  // Blocks
  heroBlock,
  richTextBlock,
  calloutBlock,
  featureGridBlock,
  mediaBlock,
  // Documents
  page,
];
