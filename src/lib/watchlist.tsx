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
const listeners = new Set<() => void>();
let memory: string[] = EMPTY;
let didLoad = false;

function emit() {
  for (const listener of listeners) listener();
}

function loadFromStorage() {
  if (didLoad || typeof window === "undefined") return;
  didLoad = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    memory = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    memory = EMPTY;
  }
}

function subscribe(listener: () => void) {
  loadFromStorage();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  loadFromStorage();
  return memory;
}

function getServerSnapshot() {
  return EMPTY;
}

function persist(next: string[]) {
  memory = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

function toggleId(id: string) {
  loadFromStorage();
  persist(
    memory.includes(id) ? memory.filter((item) => item !== id) : [...memory, id],
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
