import type {Metadata} from "next";
import {CategoryCard} from "@/components/CategoryCard";
import {getCategories} from "@/lib/content";

export const metadata: Metadata = {title: "Categories", description: "Browse Solo App Stack categories."};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Categories</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
      </div>
    </div>
  );
}
