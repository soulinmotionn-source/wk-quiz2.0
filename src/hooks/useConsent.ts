import { useSyncExternalStore } from 'react';

export type ConsentState = 'unset' | 'granted' | 'denied';

const KEY = 'wkquiz_consent';
const listeners = new Set<() => void>();

function read(): ConsentState {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : 'unset';
  } catch {
    return 'unset';
  }
}

let state: ConsentState = typeof window === 'undefined' ? 'unset' : read();
let bannerForced = false;

function emit() {
  listeners.forEach(l => l());
}

export function setConsent(next: ConsentState) {
  state = next;
  bannerForced = false;
  try {
    if (next === 'unset') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {
    // storage blocked: the choice only lasts for this visit
  }
  if (next === 'granted') (window as unknown as { wkLoadAnalytics?: () => void }).wkLoadAnalytics?.();
  emit();
}

/** Footer "Cookie settings" link: show the banner again. */
export function reopenConsent() {
  bannerForced = true;
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, () => state, () => 'unset' as ConsentState);
  const forced = useSyncExternalStore(subscribe, () => bannerForced, () => false);
  return { consent, showBanner: consent === 'unset' || forced };
}
