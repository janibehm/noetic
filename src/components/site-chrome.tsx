"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/styles";

const navItems = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/articles", label: "Lab", activePrefix: "/articles" },
  { href: "/resources", label: "Resources" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

const footerColumns = [
  {
    title: "Platform",
    items: [
      { href: "/products", label: "Products" },
      { href: "/solutions", label: "Solutions" },
      { href: "/pricing", label: "Pricing" },
      { href: "/resources", label: "API & Resources" },
    ],
  },
  {
    title: "Explore",
    items: [
      { href: "/articles", label: "Lab" },
      { href: "/resources", label: "Resources" },
      { href: "/", label: "Home" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/company", label: "About" },
      { href: "/company", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

function Logo() {
  return (
    <Link className="logo" href="/" aria-label="noetic home">
      <span className="logo-mark">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 16V8l10 8V8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="logo-word">noetic</span>
    </Link>
  );
}

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isCurrentPath(pathname: string, item: { href: string; activePrefix?: string }) {
  if (item.href === "/") return pathname === "/";
  const activePrefix = item.activePrefix ?? item.href;
  return pathname === item.href || pathname.startsWith(`${activePrefix}/`);
}

function SiteNav() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setIsSolid(scrollY > 40);
      setIsHidden(scrollY > lastScrollY.current + 2 && scrollY > 260);
      if (Math.abs(scrollY - lastScrollY.current) > 1) {
        lastScrollY.current = scrollY;
      }
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
      className={cn(isHidden && !isSheetOpen && "nav-hidden", isSolid && "nav-solid")}
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

function CookieModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  return (
    <div
      className={cn("cookie-modal", isOpen && "open")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cookie-card glass-strong">
        <h2 id="cookie-title" className="h3">Cookie settings</h2>
        <p className="muted cookie-copy">
          We use cookies to keep the canvas fast and to understand how generations are used.
          Choose what we may store.
        </p>
        <div className="cookie-row">
          <span><b>Essential</b><br /><span className="muted">Required for the platform to function.</span></span>
          <span className="toggle on" data-locked aria-hidden="true" />
        </div>
        <div className="cookie-row">
          <span><b>Analytics</b><br /><span className="muted">Anonymous usage to improve models.</span></span>
          <button
            type="button"
            className={cn("toggle", analyticsEnabled && "on")}
            role="switch"
            aria-checked={analyticsEnabled}
            aria-label="Analytics cookies"
            onClick={() => setAnalyticsEnabled((enabled) => !enabled)}
          />
        </div>
        <div className="cookie-row">
          <span><b>Marketing</b><br /><span className="muted">Personalized content and offers.</span></span>
          <button
            type="button"
            className={cn("toggle", marketingEnabled && "on")}
            role="switch"
            aria-checked={marketingEnabled}
            aria-label="Marketing cookies"
            onClick={() => setMarketingEnabled((enabled) => !enabled)}
          />
        </div>
        <div className="cookie-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Reject all</button>
          <button type="button" className="btn btn-sm" onClick={onClose}>Save preferences</button>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer data-footer>
      <div className="wrap footer-grid">
        <div className="f-brand">
          <Logo />
          <p className="muted f-tag">
            Production-ready visuals, generated in seconds. The spatial canvas for AI image and video.
          </p>
          <Link href="/contact" className="btn btn-ghost btn-sm f-demo">Book a demo</Link>
        </div>
        <div className="f-cols">
          {footerColumns.map((column) => (
            <div key={column.title} className="f-col">
              <div className="f-head">{column.title}</div>
              {column.items.map((item) => (
                <Link key={`${column.title}-${item.label}`} href={item.href}>{item.label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span className="muted f-copy">&copy; {currentYear} noetic, inc.</span>
        <div className="f-legal">
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <button type="button" onClick={() => setIsCookieModalOpen(true)}>Cookie Settings</button>
          <Link href="/report">Report a Vulnerability</Link>
        </div>
      </div>
      <CookieModal isOpen={isCookieModalOpen} onClose={() => setIsCookieModalOpen(false)} />
    </footer>
  );
}

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