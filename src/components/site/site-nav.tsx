"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/styles";
import { ArrowIcon } from "./icons";
import { Logo } from "./logo";
import { isCurrentPath, navItems } from "./navigation";

export function SiteNav() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setIsSolid(scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSheetOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentPathname = pathname || "/";

  return (
    <header
      data-nav
      className={cn(isSolid && "nav-solid")}
    >
      <div className="nav-pill glass">
        <Logo />
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", isCurrentPath(currentPathname, item) && "current")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-sm nav-cta">
          Start creating
          <ArrowIcon />
        </Link>
        <button
          type="button"
          className={cn("nav-burger", isSheetOpen && "open")}
          aria-label="Menu"
          aria-expanded={isSheetOpen}
          aria-controls="site-nav-sheet"
          onClick={() => setIsSheetOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="site-nav-sheet" className="nav-sheet glass-strong" hidden={!isSheetOpen}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(isCurrentPath(currentPathname, item) && "current")}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="sheet-cta">
          Start creating
          <ArrowIcon />
        </Link>
      </div>
    </header>
  );
}