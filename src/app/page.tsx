import { RadarBoard } from "@/components/RadarBoard";
import { formatVolume } from "@/lib/format";
import { opportunities, radarStats } from "@/lib/opportunities";

export default function Home() {
  const stats = radarStats();
  const volume = opportunities.reduce((sum, item) => sum + item.monthlyVolume, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
            MVP · Sample dataset · HK / TW / SG
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.12] sm:text-6xl">
            搵波鞋市場
            <span className="mt-1 block text-volt">未被人佔領嘅巷。</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-paper/80">
            第一版只做一件事：把 SEO 搜尋需求，對上 GEO（ChatGPT / Perplexity / AI
            Overview）同本地供應缺口，排出隱市分數。唔做社群、交易、付費牆。先證明呢個雷達值唔值得睇。
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <Stat label="樣本機會" value={String(stats.total)} />
          <Stat label="隱市 ≥80" value={String(stats.hidden)} />
          <Stat label="升勢詞" value={String(stats.rising)} />
          <Stat label="GEO 大缺口" value={String(stats.geoOpen)} />
          <Stat label="平均隱市" value={String(stats.avgHidden)} />
          <Stat label="覆蓋月搜" value={formatVolume(volume)} />
        </dl>
      </section>

      <section className="mt-8">
        <RadarBoard items={opportunities} />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-panel px-4 py-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
        {label}
      </dt>
      <dd className="mt-1 font-display text-3xl leading-none">{value}</dd>
    </div>
  );
}
