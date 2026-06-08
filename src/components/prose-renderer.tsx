"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { urlFor } from "../../sanity/image";

type AnyBlock = Record<string, unknown> & { _type: string; _key: string };

/**
 * PortableText -> React component mapping. Output relies on the
 * `prose` slot recipe for typography, so individual elements stay
 * minimal and styling lives in the design system.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const newTab = (value as { openInNewTab?: boolean } | undefined)
        ?.openInNewTab;
      return (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
  types: {
    image: ({ value }) => {
      const v = value as { alt?: string; caption?: string; asset?: unknown };
      if (!v?.asset) return null;
      const src = urlFor(value as never).width(1600).url();
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={v.alt ?? ""} loading="lazy" />
          {v.caption ? <figcaption>{v.caption}</figcaption> : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const v = value as { code?: string; language?: string; filename?: string };
      return (
        <pre>
          <code data-language={v.language}>{v.code}</code>
        </pre>
      );
    },
  },
};

export function ProseRenderer({
  value,
}: {
  value: AnyBlock[] | undefined | null;
}) {
  if (!value?.length) return null;
  return (
    <div className="prose-root">
      <PortableText value={value} components={components} />
    </div>
  );
}
