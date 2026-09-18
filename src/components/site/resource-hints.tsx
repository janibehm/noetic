"use client";

import ReactDOM from "react-dom";

/** Origin every Sanity image and video asset is served from. */
const SANITY_CDN = "https://cdn.sanity.io";

/**
 * Opens the connection to the Sanity CDN during HTML parse.
 *
 * Without this, the browser only discovers `cdn.sanity.io` when it reaches
 * the first `<img>` or `<video>` in the markup, and then pays DNS + TLS to
 * a cold origin before a single byte of the hero arrives.
 *
 * `<link rel="preconnect">` is not part of the Metadata API, so these go
 * through the ReactDOM resource-hint methods, which hoist into `<head>`.
 */
export function ResourceHints() {
  ReactDOM.preconnect(SANITY_CDN);
  return null;
}

/**
 * Requests an image at high priority from `<head>`, ahead of the element
 * that uses it. Used for the hero poster, so the stage paints while the
 * video is still streaming rather than after it.
 */
export function PreloadImage({ href }: { href: string }) {
  ReactDOM.preload(href, { as: "image", fetchPriority: "high" });
  return null;
}
