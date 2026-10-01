import { formatPct, formatVolume } from "@/lib/format";
import { EFFORT_LABEL, INTENT_LABEL, PLAY_LABEL, REGION_LABEL } from "@/lib/labels";
import { supplyGap } from "@/lib/scoring";
import type { Opportunity } from "@/lib/types";
import { ScoreBar } from "./ScoreBar";
import { Sparkline } from "./Sparkline";
import { WatchButton } from "./WatchButton";

function Flag({ on, label }: { on: boolean; label: string }) {
  return (
    <div
      className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
        on ? "border-line text-mist" : "border-volt/50 text-volt"
      }`}
    >
      {label}
      <span className="mt-1 block text-paper">{on ? "有覆蓋" : "空白"}</span>
    </div>
  );
}

export function OpportunityDetail({ item }: { item: Opportunity }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        {REGION_LABEL[item.region]} · {item.brand} · {INTENT_LABEL[item.intent]} ·{" "}
        {PLAY_LABEL[item.playType]}
      </p>
      <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-paper sm:text-5xl">
            {item.queryZh}
          </h1>
          <p className="mt-3 font-mono text-sm text-mist">{item.query}</p>
        </div>
        <div className="flex items-end gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
              隱市分數
            </p>
            <p className="font-display text-7xl leading-none text-volt">
              {item.scores.hidden}
            </p>
          </div>
          <WatchButton id={item.id} />
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <Stat label="月搜尋量" value={formatVolume(item.monthlyVolume)} />
        <Stat
          label="90 日趨勢"
          value={formatPct(item.volumeTrendPct)}
          hot={item.volumeTrendPct >= 0}
        />
        <Stat label="關鍵詞難度" value={String(item.keywordDifficulty)} />
        <Stat label="AI 佔有率" value={`${item.aiShareOfVoice}%`} />
      </div>

      <section className="mt-10 border border-volt/30 bg-panel p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-volt">
          建議打法
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-snug text-paper sm:text-3xl">
          {item.play.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-paper/85">
          {item.play.whyHidden}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-paper/85">
          {item.play.suggestedMove}
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
          {EFFORT_LABEL[item.play.effort]} · 見到信號大約 {item.play.timeToSignal}
        </p>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="border border-line bg-panel p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-2xl tracking-tight">SEO</h3>
              <p className="mt-1 text-sm text-mist">Google 需求同競爭密度</p>
            </div>
            <Sparkline series={item.trendSeries} />
          </div>
          <div className="mt-6 space-y-3">
            <ScoreBar label="需求" value={item.scores.demand} />
            <ScoreBar label="SEO缺口" value={item.scores.seoGap} />
            <ScoreBar label="SERP飽和" value={item.serpSaturation} tone="heat" />
          </div>
          <ul className="mt-6 space-y-3">
            {item.topResults.map((result) => (
              <li
                key={result.domain + result.title}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-2"
              >
                <span className="text-sm text-paper">{result.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
                  {result.domain} · {result.type}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-line bg-panel p-6">
          <h3 className="font-display text-2xl">GEO</h3>
          <p className="mt-1 text-sm text-mist">
            Generative Engine Optimization：AI 答案有冇引用到呢個題。
          </p>
          <div className="mt-6 space-y-3">
            <ScoreBar label="GEO缺口" value={item.scores.geoGap} tone="heat" />
            <ScoreBar label="AI 佔有" value={item.aiShareOfVoice} tone="paper" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <Flag on={item.chatgptMentioned} label="ChatGPT" />
            <Flag on={item.perplexityCited} label="Perplexity" />
            <Flag on={item.aiOverviewPresent} label="AI Overview" />
          </div>
          <p className="mt-6 text-sm leading-6 text-paper/85">
            引用數 {item.citationCount}。{item.unansweredAngle}
          </p>
        </section>
      </div>

      <section className="mt-4 border border-line bg-panel p-6">
        <h3 className="font-display text-2xl">地理需求 vs 供應</h3>
        <p className="mt-1 text-sm text-mist">
          同一關鍵詞喺邊個地區搜得多、但供應跟唔上。
        </p>
        <div className="mt-6 space-y-4">
          {item.cities.map((city) => {
            const gap = supplyGap(city);
            return (
              <div key={city.city} className="grid gap-2 sm:grid-cols-[88px_1fr_48px]">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist">
                  {city.city}
                </p>
                <div className="space-y-1">
                  <div className="h-1.5 bg-line">
                    <div
                      className="h-full bg-paper/70"
                      style={{ width: `${city.demand}%` }}
                    />
                  </div>
                  <div className="h-1.5 bg-line">
                    <div
                      className="h-full bg-volt"
                      style={{ width: `${city.supply}%` }}
                    />
                  </div>
                </div>
                <p className="text-right font-mono text-xs text-volt">{gap}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
          上條需求 · 下條供應 · 右欄缺口
        </p>
      </section>

      <section className="mt-4 border border-line bg-panel p-6">
        <h3 className="font-display text-2xl">相關搜尋</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.relatedQueries.map((query) => (
            <span
              key={query}
              className="border border-line px-3 py-1 font-mono text-xs text-paper/80"
            >
              {query}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hot,
}: {
  label: string;
  value: string;
  hot?: boolean;
}) {
  return (
    <div className="border border-line bg-panel p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
        {label}
      </p>
      <p className={`mt-2 font-display text-3xl ${hot === false ? "text-heat" : "text-paper"}`}>
        {value}
      </p>
    </div>
  );
}
