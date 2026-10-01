"use client";

import Link from "next/link";
import { OpportunityCard } from "@/components/OpportunityCard";
import { opportunities } from "@/lib/opportunities";
import { useWatchlist } from "@/lib/watchlist";

export default function WatchlistPage() {
  const { ids, hydrated } = useWatchlist();
  const saved = opportunities.filter((item) => ids.includes(item.id));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt">
        Local watchlist
      </p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">觀察名單</h1>
      <p className="mt-3 max-w-xl text-paper/75">
        存喺你瀏覽器，未做帳戶。MVP 用嚟驗證：人會唔會把機會收藏，而唔係一睇完就走。
      </p>

      {!hydrated ? (
        <p className="mt-10 font-mono text-sm text-mist">讀緊名單…</p>
      ) : saved.length === 0 ? (
        <div className="mt-10 border border-dashed border-line px-6 py-12">
          <p className="text-paper/80">而家未有收藏。</p>
          <Link href="/" className="mt-3 inline-block text-volt">
            回到雷達揀機會 →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {saved.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
