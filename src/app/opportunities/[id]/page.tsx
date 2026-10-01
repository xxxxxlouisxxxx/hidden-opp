import Link from "next/link";
import { notFound } from "next/navigation";
import { OpportunityDetail } from "@/components/OpportunityDetail";
import { getOpportunity, getRelated, opportunities } from "@/lib/opportunities";

export function generateStaticParams() {
  return opportunities.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getOpportunity(id);
  if (!item) return { title: "機會不存在" };
  return {
    title: item.queryZh,
    description: item.play.title,
  };
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getOpportunity(id);
  if (!item) notFound();
  const related = getRelated(id);

  return (
    <main>
      <OpportunityDetail item={item} />
      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <h2 className="text-2xl font-bold">相鄰機會</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.id}
                href={`/opportunities/${entry.id}`}
                className="border border-line bg-panel p-4 hover:border-volt/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
                  隱市 {entry.scores.hidden}
                </p>
                <p className="mt-2 text-lg font-bold leading-snug">
                  {entry.queryZh}
                </p>
                <p className="mt-2 text-sm text-mist">{entry.play.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
