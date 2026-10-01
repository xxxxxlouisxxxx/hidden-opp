export const REGIONS = ["HK", "TW", "SG"] as const;
export type Region = (typeof REGIONS)[number];

export const INTENTS = [
  "buy",
  "compare",
  "restock",
  "review",
  "size",
  "resale",
  "service",
] as const;
export type Intent = (typeof INTENTS)[number];

export const PLAY_TYPES = [
  "content",
  "resale",
  "local-retail",
  "ai-visibility",
  "product-gap",
  "service",
] as const;
export type PlayType = (typeof PLAY_TYPES)[number];

export const CATEGORIES = [
  "lifestyle",
  "running",
  "basketball",
  "trail",
  "training",
  "service",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const EFFORTS = ["low", "medium", "high"] as const;
export type Effort = (typeof EFFORTS)[number];

export type SerpResult = {
  title: string;
  domain: string;
  type: "shop" | "media" | "forum" | "brand" | "ugc" | "marketplace";
};

export type CityDemand = {
  city: string;
  demand: number;
  supply: number;
};

export type OpportunityPlay = {
  title: string;
  whyHidden: string;
  suggestedMove: string;
  effort: Effort;
  timeToSignal: string;
};

export type OpportunityScores = {
  demand: number;
  seoGap: number;
  geoGap: number;
  trend: number;
  hidden: number;
};

export type RawOpportunity = {
  id: string;
  query: string;
  queryZh: string;
  brand: string;
  model: string;
  category: Category;
  region: Region;
  intent: Intent;
  playType: PlayType;
  monthlyVolume: number;
  volumeTrendPct: number;
  trendSeries: number[];
  keywordDifficulty: number;
  serpSaturation: number;
  topResults: SerpResult[];
  relatedQueries: string[];
  chatgptMentioned: boolean;
  perplexityCited: boolean;
  aiOverviewPresent: boolean;
  citationCount: number;
  aiShareOfVoice: number;
  unansweredAngle: string;
  cities: CityDemand[];
  play: OpportunityPlay;
};

export type Opportunity = RawOpportunity & {
  scores: OpportunityScores;
};

export type SortKey = "hidden" | "demand" | "geoGap" | "rising";
