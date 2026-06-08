#!/usr/bin/env node
// One-off uploader: push every file under PHOTOS_AND_VIDEOS/ to Sanity as an
// image or file asset. Idempotent — assets already present (matched by their
// original filename) are skipped, so it is safe to re-run after adding media.
//
// Run this BEFORE the page seeds; the page seeds resolve these assets by
// filename via scripts/lib/assets.mjs.
import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, basename } from "node:path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "PHOTOS_AND_VIDEOS");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(ROOT);

// Originals already in Sanity — keyed by originalFilename.
const existing = new Set(
  await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && defined(originalFilename)].originalFilename`,
  ),
);

let uploaded = 0;
let skipped = 0;
for (const file of files) {
  const name = basename(file);
  const ext = extname(file).toLowerCase();
  const kind = IMAGE_EXT.has(ext) ? "image" : VIDEO_EXT.has(ext) ? "file" : null;
  if (!kind) {
    console.log(`-  skip (unsupported): ${name}`);
    continue;
  }
  if (existing.has(name)) {
    skipped++;
    continue;
  }
  const buffer = await readFile(file);
  const asset = await client.assets.upload(kind, buffer, { filename: name });
  uploaded++;
  console.log(`+  ${kind.padEnd(5)} ${name}  ->  ${asset._id}`);
}

console.log(`\nDone. Uploaded ${uploaded}, skipped ${skipped} (already present).`);
