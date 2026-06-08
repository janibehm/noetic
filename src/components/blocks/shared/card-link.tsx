import Link from "next/link";

/**
 * Renders an internal path (e.g. `/articles/foo`) as a soft-navigating
 * <Link>, so the app-router intercepting route can open it as a modal.
 * External URLs and bare `#` placeholders fall back to a plain anchor
 * (hard navigation / no-op), which is never intercepted.
 */
export function CardLink({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href || "#"} className={className}>
      {children}
    </a>
  );
}
