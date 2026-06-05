"use client";

import { useState } from "react";
import { cn } from "@/lib/styles";

export function CookieModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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