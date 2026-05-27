export const apiVersion = "2024-10-01";

/**
 * Sanity credentials. We deliberately do NOT throw at module load
 * when these are missing — that would prevent the starter from
 * building without configured environment variables. The Studio
 * route and Sanity client will surface a clear error at runtime
 * if they are actually used without configuration.
 */
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const studioUrl = "/studio";
