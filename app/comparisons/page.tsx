import type {Metadata} from "next";
import Link from "next/link";
import {getComparisons} from "@/lib/content";
import {formatDate} from "@/lib/utils";

export const metadata: Metadata = {title: "Comparisons", description: "Head-to-head software comparisons for solo operators."};

export default async function ComparisonsPage() {
  const comparisons = await getComparisons();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Comparison pages</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link key={comparison.slug} href={`/comparisons/${comparison.slug}`} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm hover:border-[var(--accent)]">
            <p className="text-sm font-bold text-[var(--accent-dark)]">Updated {formatDate(comparison.updatedAt)}</p>
            <h2 className="mt-2 text-2xl font-black text-[var(--ink)]">{comparison.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{comparison.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
