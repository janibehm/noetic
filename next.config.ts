import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this project so Next.js doesn't walk
  // up the filesystem and pick up a stray parent lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
