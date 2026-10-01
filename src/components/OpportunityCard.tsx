import Link from "next/link";
import { formatPct, formatVolume } from "@/lib/format";
import { PLAY_LABEL, REGION_LABEL } from "@/lib/labels";
import type { Opportunity } from "@/lib/types";
import { ScoreBar } from "./ScoreBar";
import { Sparkline } from "./Sparkline";
import { WatchButton } from "./WatchButton";

export function OpportunityCard({ item }: { item: Opportunity }) {
  const hot = item.scores.hidden >= 75;

  return (
    <article className={`border bg-panel ${hot ? "border-volt/40" : "border-line"}`}>
      <Link href={`/opportunities/${item.id}`} className="block p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              {REGION_LABEL[item.region]} · {PLAY_LABEL[item.playType]} · {item.brand}
            </p>
            <h2 className="mt-2 pr-2 text-xl font-bold leading-snug text-paper sm:text-2xl">
              {item.queryZh}
            </h2>
            <p className="mt-2 font-mono text-xs text-mist">{item.query}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
              隱市
            </p>
            <p
              className={`font-display text-5xl leading-none ${
                hot ? "text-volt" : "text-paper"
              }`}
            >
              {item.scores.hidden}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <ScoreBar label="需求" value={item.scores.demand} />
            <ScoreBar label="SEO缺口" value={item.scores.seoGap} />
            <ScoreBar label="GEO缺口" value={item.scores.geoGap} tone="heat" />
          </div>
          <div className="flex flex-col items-end justify-between">
            <Sparkline series={item.trendSeries} />
            <p className="font-mono text-[11px] text-mist">
              {formatVolume(item.monthlyVolume)} / 月 ·{" "}
              <span className={item.volumeTrendPct >= 0 ? "text-volt" : "text-heat"}>
                {formatPct(item.volumeTrendPct)}
              </span>
            </p>
          </div>
        </div>

        <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-paper/80">
          {item.play.title}
        </p>
      </Link>
      <div className="flex items-center justify-between border-t border-line px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
          {item.play.effort === "low"
            ? "低投入"
            : item.play.effort === "medium"
              ? "中投入"
              : "高投入"}{" "}
          · {item.play.timeToSignal}
        </p>
        <WatchButton id={item.id} compact />
      </div>
    </article>
  );
}
