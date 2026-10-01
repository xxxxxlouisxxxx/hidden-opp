import type { OpportunityScores, RawOpportunity } from "./types";

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

/**
 * Hidden score is the MVP core: demand that is poorly served in Google (SEO)
 * and poorly cited in AI answers (GEO / generative engine optimization).
 *
 * Demand uses log volume so a 80k query does not drown a 2k local niche.
 * GEO gap is the largest differentiator versus a generic keyword tool.
 */
export function scoreOpportunity(raw: RawOpportunity): OpportunityScores {
  const demand = clamp((Math.log10(raw.monthlyVolume + 1) / 5) * 100);
  const trend = clamp(50 + raw.volumeTrendPct * 0.9);
  const seoGap = clamp(
    (100 - raw.keywordDifficulty) * 0.55 + (100 - raw.serpSaturation) * 0.45,
  );

  let geoGap = 100 - raw.aiShareOfVoice;
  if (!raw.chatgptMentioned) geoGap += 8;
  if (!raw.perplexityCited) geoGap += 6;
  if (!raw.aiOverviewPresent) geoGap += 6;
  geoGap = clamp(geoGap);

  const hidden = clamp(
    demand * 0.32 + seoGap * 0.28 + geoGap * 0.28 + trend * 0.12,
  );

  return {
    demand: round1(demand),
    seoGap: round1(seoGap),
    geoGap: round1(geoGap),
    trend: round1(trend),
    hidden: Math.round(hidden),
  };
}

export function supplyGap(city: { demand: number; supply: number }) {
  return clamp(city.demand - city.supply);
}
