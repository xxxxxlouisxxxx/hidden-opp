"use client";

import { useState } from "react";
import { uniqueBrands, searchOpportunities, sortOpportunities } from "@/lib/opportunities";
import { PLAY_LABEL, REGION_LABEL, SORT_LABEL } from "@/lib/labels";
import type { Opportunity, PlayType, Region, SortKey } from "@/lib/types";
import { PLAY_TYPES, REGIONS } from "@/lib/types";
import { OpportunityCard } from "./OpportunityCard";

const sorts: SortKey[] = ["hidden", "demand", "geoGap", "rising"];

export function RadarBoard({ items }: { items: Opportunity[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [playType, setPlayType] = useState<PlayType | "all">("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState<SortKey>("hidden");
  const brands = uniqueBrands();

  let filtered = searchOpportunities(items, query);
  if (region !== "all") filtered = filtered.filter((item) => item.region === region);
  if (playType !== "all") {
    filtered = filtered.filter((item) => item.playType === playType);
  }
  if (brand !== "all") filtered = filtered.filter((item) => item.brand === brand);
  filtered = sortOpportunities(filtered, sort);

  return (
    <div>
      <div className="border border-line bg-panel p-4 sm:p-5">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
            掃描型號 / 關鍵詞
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：Kayano、清洗、西貢、尺碼"
            className="mt-2 w-full border-b border-line bg-transparent py-2 text-lg text-paper outline-none placeholder:text-mist/50 focus:border-volt"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip
            active={region === "all"}
            onClick={() => setRegion("all")}
            label="全部地區"
          />
          {REGIONS.map((value) => (
            <FilterChip
              key={value}
              active={region === value}
              onClick={() => setRegion(value)}
              label={REGION_LABEL[value]}
            />
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <FilterChip
            active={playType === "all"}
            onClick={() => setPlayType("all")}
            label="全部打法"
          />
          {PLAY_TYPES.map((value) => (
            <FilterChip
              key={value}
              active={playType === value}
              onClick={() => setPlayType(value)}
              label={PLAY_LABEL[value]}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <select
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="border border-line bg-ink px-3 py-2 font-mono text-xs text-paper"
          >
            <option value="all">全部品牌</option>
            {brands.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {sorts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setSort(value)}
                className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                  sort === value ? "text-volt" : "text-mist hover:text-paper"
                }`}
              >
                {SORT_LABEL[value]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
        {filtered.length} 個機會 · 按 {SORT_LABEL[sort]} 排
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => (
          <OpportunityCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 border border-dashed border-line px-6 py-12 text-center text-mist">
          呢個樣本集入面未有匹配。MVP 用種子數據，下一版先接真實 SEO / GEO API。
        </p>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
        active
          ? "border-volt bg-volt text-ink"
          : "border-line text-mist hover:border-paper/40 hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}
