# LANE · Hidden Opp

運動波鞋隱市機會雷達。用 **SEO 搜尋需求** 同 **GEO（Generative Engine Optimization / AI 搜尋可見度）** 去排「有人搵、但市場同 AI 答案都未佔領」嘅生意巷。

## 第一版做咩

MVP 只驗證一個問題：人會唔會用 SEO × GEO 分數，去決定跟邊個波鞋機會。

| 有 | 冇（刻意） |
| --- | --- |
| 機會雷達、篩選、搜尋、排序 | 帳戶 / 付費 |
| SEO：量、趨勢、難度、SERP | 即時爬蟲、Ahrefs API |
| GEO：ChatGPT / Perplexity / AI Overview 覆蓋 | 全網 LLM 監測 |
| 地區供需缺口 | 交易、寄賣、聊天 |
| 建議打法（內容 / 轉售 / 零售 / 服務） | CMS、電郵警報 |
| 本地觀察名單 | Chrome 插件 |

樣本數據覆蓋香港為主，另有台灣、新加坡。入面有正例（例如 Vomero 平替、Omni 9 GEO），亦有負例（Dunk Panda、Samba 主詞），避免把高搜尋量當成機會。

計分：

```
hidden = 0.30·demand + 0.25·seoGap + 0.30·geoGap + 0.15·trend
```

下跌、高難度、高 AI 佔有率會扣分，避免把熱詞當成隱市。

詳情見 app 入面 `/methodology`。

## 本機行

```bash
npm install
npm run dev
```

開 [http://localhost:3000](http://localhost:3000)。

## 下一版先考慮

1. 接真實 SEO API（搜尋量、相關詞、SERP）
2. 定期用固定 prompt 抽樣 ChatGPT / Perplexity / Google AI Overview，更新 GEO
3. 用戶輸入一個型號，即時出機會草稿
4. 先做帳戶，先做警報
