"use client";

import { useWatchlist } from "@/lib/watchlist";

export function WatchButton({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const { isSaved, toggle, hydrated } = useWatchlist();
  const saved = hydrated && isSaved(id);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
      }}
      className={`whitespace-nowrap border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
        saved
          ? "border-volt bg-volt text-ink"
          : "border-line text-mist hover:border-paper/40 hover:text-paper"
      }`}
    >
      {compact ? (saved ? "移出" : "盯住") : saved ? "移出觀察" : "加入觀察"}
    </button>
  );
}
