"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/styles";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "p" | "span";

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  ...props
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const revealClassName = cn("reveal", visible && "in", delay > 0 && `reveal-d${delay}`, className);
  const setNode = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10%", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  if (as === "section") return <section {...props} ref={setNode} className={revealClassName}>{children}</section>;
  if (as === "article") return <article {...props} ref={setNode} className={revealClassName}>{children}</article>;
  if (as === "li") return <li {...props} ref={setNode} className={revealClassName}>{children}</li>;
  if (as === "ul") return <ul {...props} ref={setNode} className={revealClassName}>{children}</ul>;
  if (as === "p") return <p {...props} ref={setNode} className={revealClassName}>{children}</p>;
  if (as === "span") return <span {...props} ref={setNode} className={revealClassName}>{children}</span>;
  return <div {...props} ref={setNode} className={revealClassName}>{children}</div>;
}