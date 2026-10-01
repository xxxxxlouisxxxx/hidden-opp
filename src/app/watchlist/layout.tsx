import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "觀察名單",
};

export default function WatchlistLayout({ children }: { children: ReactNode }) {
  return children;
}
