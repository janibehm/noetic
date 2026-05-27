"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false },
);

import config from "../../../../sanity.config";

export function StudioShell() {
  return <NextStudio config={config} />;
}
