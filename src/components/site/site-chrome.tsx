"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return children;
  }

  return (
    <>
      <SiteNav key={pathname ?? "/"} />
      {children}
      <SiteFooter />
    </>
  );
}