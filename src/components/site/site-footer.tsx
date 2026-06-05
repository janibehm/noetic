"use client";

import Link from "next/link";
import { useState } from "react";
import { CookieModal } from "./cookie-modal";
import { Logo } from "./logo";
import { footerColumns } from "./navigation";

export function SiteFooter() {
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