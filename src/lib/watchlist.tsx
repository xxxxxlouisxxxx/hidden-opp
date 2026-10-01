"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "lane-watchlist";
const EMPTY: string[] = [];
const CHANGE_EVENT = "lane-watchlist";

let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function parseList(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function snapshotFromStorage() {
  if (typeof window === "undefined") return EMPTY;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  cachedIds = parseList(raw);
  return cachedIds;
}

function subscribe(listener: () => void) {
  const onChange = () => listener();
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot() {
  return snapshotFromStorage();
}

function getServerSnapshot() {
  return EMPTY;
}

function persist(next: string[]) {
  const raw = JSON.stringify(next);
  localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedIds = next;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function toggleId(id: string) {
  const current = snapshotFromStorage();
  persist(
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
  );
}

type WatchlistContextValue = {
  ids: string[];
  hydrated: boolean;
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

function subscribeHydration() {
  return () => {};
}

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback((id: string) => toggleId(id), []);

  const value = useMemo(
    () => ({ ids, hydrated, isSaved, toggle }),
    [ids, hydrated, isSaved, toggle],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
