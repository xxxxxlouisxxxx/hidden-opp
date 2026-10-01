import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-heat">404</p>
      <h1 className="mt-3 font-display text-5xl">呢條巷唔存在。</h1>
      <Link href="/" className="mt-6 inline-block text-volt">
        回到雷達
      </Link>
    </main>
  );
}
