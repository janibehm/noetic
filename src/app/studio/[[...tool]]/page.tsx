/**
 * Embedded Sanity Studio route at /studio.
 *
 * Studio relies on browser-only React internals and cannot be
 * evaluated during Next.js page-data collection. We import it via
 * `next/dynamic` with `ssr: false` from a small client wrapper to
 * keep it out of the server bundle entirely.
 */
import { StudioShell } from "./studio-shell";

export const dynamic = "force-dynamic";

export const metadata = { title: "Studio" };

export default function StudioPage() {
  return <StudioShell />;
}
