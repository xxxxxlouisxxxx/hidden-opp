import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Noto_Sans_TC, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WatchlistProvider } from "@/lib/watchlist";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const ibm = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LANE · 波鞋隱市雷達",
    template: "%s · LANE",
  },
  description:
    "用 SEO 搜尋需求同 GEO（AI 搜尋可見度）搵運動波鞋市場入面未飽和嘅生意機會。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${syne.variable} ${ibm.variable} ${ibmMono.variable} ${noto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink font-sans text-paper">
        <WatchlistProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </WatchlistProvider>
      </body>
    </html>
  );
}
