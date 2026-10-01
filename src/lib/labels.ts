import type { Effort, Intent, PlayType, Region, SortKey } from "./types";

export const REGION_LABEL: Record<Region, string> = {
  HK: "香港",
  TW: "台灣",
  SG: "新加坡",
};

export const INTENT_LABEL: Record<Intent, string> = {
  buy: "購買",
  compare: "比較",
  restock: "補貨",
  review: "評測",
  size: "尺碼",
  resale: "轉售",
  service: "服務",
};

export const PLAY_LABEL: Record<PlayType, string> = {
  content: "內容缺口",
  resale: "轉售套利",
  "local-retail": "本地零售",
  "ai-visibility": "GEO 可見度",
  "product-gap": "貨源缺口",
  service: "服務缺口",
};

export const EFFORT_LABEL: Record<Effort, string> = {
  low: "低投入",
  medium: "中投入",
  high: "高投入",
};

export const SORT_LABEL: Record<SortKey, string> = {
  hidden: "隱市分數",
  demand: "搜尋需求",
  geoGap: "GEO 缺口",
  rising: "升勢",
};
