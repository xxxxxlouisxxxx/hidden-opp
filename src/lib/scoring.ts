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
 * Demand uses log volume so an 80k query does not drown a 2k local niche.
 * Saturated or declining terms get explicit penalties so the radar can say no.
 */
export function scoreOpportunity(raw: RawOpportunity): OpportunityScores {
  const demand = clamp((Math.log10(raw.monthlyVolume + 1) / 5) * 100);
  const trend = clamp(50 + raw.volumeTrendPct * 0.8);
  const seoGap = clamp(
    (100 - raw.keywordDifficulty) * 0.55 + (100 - raw.serpSaturation) * 0.45,
  );

  const blankEngines =
    Number(!raw.chatgptMentioned) +
    Number(!raw.perplexityCited) +
    Number(!raw.aiOverviewPresent);
  const geoGap = clamp(100 - raw.aiShareOfVoice + blankEngines * 4);

  let hidden =
    demand * 0.3 + seoGap * 0.25 + geoGap * 0.3 + trend * 0.15;
  if (raw.volumeTrendPct < 0) hidden -= 10;
  if (raw.keywordDifficulty >= 40) hidden -= 8;
  if (raw.aiShareOfVoice >= 40) hidden -= 8;
  hidden = clamp(hidden);

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
