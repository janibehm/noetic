"use client";

import { useSyncExternalStore } from "react";

export type BillingMode = "monthly" | "annual";

let billingMode: BillingMode = "monthly";
const listeners = new Set<() => void>();

export function setPricingBillingMode(nextMode: BillingMode) {
  if (billingMode === nextMode) return;
  billingMode = nextMode;
  listeners.forEach((listener) => listener());
}

export function usePricingBillingMode() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => billingMode,
    () => "monthly",
  );
}