import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Lazily-constructed Sanity client. `createClient` throws when
 * `projectId` is missing, so we defer construction until the
 * client is actually used — letting the starter build without
 * configured environment variables.
 */
let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (_client) return _client;
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — copy .env.example to .env.local and fill in your Sanity credentials.",
    );
  }
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    // Static builds need fresh page slugs immediately after seed/deploy writes.
    useCdn: false,
    perspective: "published",
    stega: { studioUrl: "/studio" },
  });
  return _client;
}

export const client = {
  fetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
    return getClient().fetch<T>(query, params);
  },
};
