import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "計分方法",
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt">
        Why these features, and only these
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
        第一版做咩、唔做咩
      </h1>
      <p className="mt-5 text-base leading-7 text-paper/80">
        Hidden Opp 嘅假設好窄：運動波鞋市場入面，真正難發現嘅生意，通常唔係最熱嘅 Dunk
        關鍵詞，而係「有人搜、供應薄、Google 未捲、AI 答案亦引用唔到」嘅巷。所以 MVP
        唔做社交平台，而係一部機會雷達。
      </p>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">入面有嘅功能</h2>
        <ol className="mt-4 list-decimal space-y-4 pl-5 text-paper/85">
          <li>
            <strong className="text-paper">機會雷達：</strong>
            把每條查詢排成一張卡。用戶 30 秒內要睇到隱市分數、需求、SEO 缺口、GEO 缺口。
          </li>
          <li>
            <strong className="text-paper">SEO 層：</strong>
            月搜、趨勢、關鍵詞難度、SERP 飽和同現有結果類型。用來判斷「Google 有冇人認真答」。
          </li>
          <li>
            <strong className="text-paper">GEO 層：</strong>
            ChatGPT / Perplexity / AI Overview 有冇提及、AI 佔有率、無人回答嘅角度。呢層係同普通 keyword tool 嘅分別。
          </li>
          <li>
            <strong className="text-paper">地理供需：</strong>
            同一鞋款喺邊個地區搜得多但買唔到。波鞋生意好本地。
          </li>
          <li>
            <strong className="text-paper">建議打法：</strong>
            唔止話「呢個詞有機會」，而係指出內容、轉售、零售定服務。冇呢步，數據唔會變成生意。
          </li>
          <li>
            <strong className="text-paper">觀察名單：</strong>
            唯一嘅保留動作，用來驗證有冇人想跟進。
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">刻意唔做</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-paper/80">
          <li>帳戶、付費牆、團隊 workspace</li>
          <li>即時爬蟲、Ahrefs / DataForSEO 真 API（而家用樣本數據）</li>
          <li>交易、寄賣、聊天、內容 CMS</li>
          <li>每日電郵警報、Chrome 插件、自動化上架</li>
        </ul>
        <p className="mt-4 text-paper/80">
          呢啲要等雷達本身有人反覆用，先值得接。否則會變成一個空嘅「波鞋社群」。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">隱市分數</h2>
        <p className="mt-4 leading-7 text-paper/80">
          <code className="font-mono text-sm text-volt">
            hidden = 0.30·demand + 0.25·seoGap + 0.30·geoGap + 0.15·trend
          </code>
        </p>
        <p className="mt-3 leading-7 text-paper/80">
          另外：90 日下跌扣 10；關鍵詞難度 ≥40 扣 8；AI 佔有率 ≥40 扣 8。用來把 Dunk Panda
          呢類已經唔隱嘅熱詞壓下去。
        </p>
        <ul className="mt-4 space-y-3 text-paper/80">
          <li>
            <strong className="text-paper">demand</strong> 用 log 月搜，避免 10 萬大詞壓死 2
            千嘅本地詞。
          </li>
          <li>
            <strong className="text-paper">seoGap</strong> 由低難度同低 SERP 飽和組成。
          </li>
          <li>
            <strong className="text-paper">geoGap</strong> 由低 AI 佔有率組成；ChatGPT /
            Perplexity / AI Overview 空白會再加權。呢個係 MVP 最想驗證嘅訊號。
          </li>
          <li>
            <strong className="text-paper">trend</strong> 獎勵 90 日上升，懲罰已經見頂嘅熱詞。
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">數據現況</h2>
        <p className="mt-4 leading-7 text-paper/80">
          而家 24 條機會係編輯過嘅樣本，用來把產品形狀做實，並示範正例（Vomero 平替、Omni
          9 GEO）同負例（Dunk Panda、Samba 主詞）。下一版先把 SEO 接到真實搜尋 API，把 GEO
          接到定期 prompt 抽樣。
        </p>
      </section>
    </main>
  );
}
