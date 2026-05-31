import Link from "next/link";
import type {Category} from "@/lib/types";

export function CategoryCard({category}: {category: Category}) {
  return (
    <Link href={`/categories/${category.slug}`} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm hover:border-[var(--accent)]">
      <h3 className="text-lg font-black text-[var(--ink)]">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
    </Link>
  );
}
