"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Overlay shell for the intercepted article route. Children are the
 * server-rendered <ArticleContent>, so the article itself stays a
 * Server Component — only this dialog chrome is client-side.
 *
 * Closing always calls router.back(), which pops the history entry the
 * Link navigation pushed. That returns the user to their previous
 * position on the underlying page (which Next keeps mounted in the
 * `children` slot), so scroll is preserved for free.
 */
export function ArticleModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  // Close on Escape.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll while open; restore on close. overflow:hidden
  // keeps the underlying page exactly where it was, so closing lands the
  // user back at their original scroll position.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm animate-[modalBackdropIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative my-[clamp(1rem,5vh,4rem)] h-fit w-full max-w-[min(72rem,calc(100vw-2rem))] rounded-[1.75rem] bg-[var(--canvas,#fff)] shadow-[0_40px_120px_rgba(0,0,0,0.45)] outline-none animate-[modalPanelIn_0.32s_cubic-bezier(0.22,1,0.36,1)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="sticky right-4 top-4 z-[1] ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--canvas,#fff)]/80 text-[var(--ink)] shadow-[var(--shadow-amb)] ring-1 ring-[var(--line)] backdrop-blur transition-colors hover:bg-[var(--void-soft,rgba(0,0,0,0.06))]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(2rem,5vw,4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
