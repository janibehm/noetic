"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 45; // per character while typing
const DELETE_MS = 25; // per character while deleting
const HOLD_MS = 1800; // pause on a fully-typed idea before clearing

/**
 * Types the hero prompt ideas one character at a time, holds, deletes,
 * and cycles to the next — so the prompt bar reads as if someone is
 * typing into it. The first idea is rendered fully on the server (and as
 * the initial client state) so there's no hydration mismatch and no-JS /
 * reduced-motion users still see a complete prompt.
 */
export function PromptTypewriter({
  ideas,
  className,
}: {
  ideas: string[];
  className?: string;
}) {
  const [text, setText] = useState(ideas[0] ?? "");

  useEffect(() => {
    if (ideas.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ideaIndex = 0;
    let charIndex = ideas[0].length; // start from the fully-shown first idea
    let deleting = true;
    let holding = true;
    let timeout: ReturnType<typeof setTimeout>;

    function step() {
      if (holding) {
        holding = false;
        timeout = setTimeout(step, HOLD_MS);
        return;
      }

      if (deleting) {
        charIndex -= 1;
        setText(ideas[ideaIndex].slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          ideaIndex = (ideaIndex + 1) % ideas.length;
        }
        timeout = setTimeout(step, DELETE_MS);
        return;
      }

      const next = ideas[ideaIndex];
      charIndex += 1;
      setText(next.slice(0, charIndex));
      if (charIndex >= next.length) {
        deleting = true;
        holding = true;
      }
      timeout = setTimeout(step, TYPE_MS);
    }

    timeout = setTimeout(step, HOLD_MS);
    return () => clearTimeout(timeout);
  }, [ideas]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden
        className="ms-px inline-block h-[1.1em] w-0.5 bg-[var(--a2)] align-[-2px] animate-[caretBlink_1s_step-end_infinite]"
      />
    </span>
  );
}
