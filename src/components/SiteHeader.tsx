"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWatchlist } from "@/lib/watchlist";

const links = [
  { href: "/", label: "雷達" },
  { href: "/watchlist", label: "觀察名單" },
  { href: "/methodology", label: "計分方法" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { ids, hydrated } = useWatchlist();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-2xl leading-none tracking-tight text-volt">
            LANE
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-mist sm:inline">
            波鞋隱市雷達
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[12px] uppercase tracking-[0.16em]">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const count =
              link.href === "/watchlist" && hydrated ? ids.length : null;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 ${
                  active ? "text-volt" : "text-mist hover:text-paper"
                }`}
              >
                {link.label}
                {count ? (
                  <span className="ml-2 font-mono text-paper/70">{count}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
