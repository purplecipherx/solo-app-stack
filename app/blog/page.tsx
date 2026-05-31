import type {Metadata} from "next";
import {PostCard} from "@/components/PostCard";
import {filterPosts, getCategories, getPosts} from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI tools, app comparisons, and practical software stack guides for one-person businesses."
};

export default async function BlogPage({searchParams}: {searchParams: Promise<{category?: string; sort?: string; q?: string}>}) {
  const params = await searchParams;
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const selectedCategory = categories.find((category) => category.slug === params.category)?.title;
  const filtered = filterPosts(posts, selectedCategory, params.sort, params.q);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Guides and comparisons</h1>
      <form className="mt-6 grid gap-3 rounded-md border border-[var(--line)] bg-[var(--card)] p-4 md:grid-cols-[1fr_220px_180px]">
        <input name="q" defaultValue={params.q || ""} placeholder="Search guides" className="min-h-11 rounded-md border border-[var(--line)] px-3" />
        <select name="category" defaultValue={params.category || ""} className="min-h-11 rounded-md border border-[var(--line)] px-3">
          <option value="">All categories</option>
          {categories.map((category) => <option key={category.slug} value={category.slug}>{category.title}</option>)}
        </select>
        <select name="sort" defaultValue={params.sort || "latest"} className="min-h-11 rounded-md border border-[var(--line)] px-3">
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
        </select>
        <button className="min-h-11 rounded-md bg-[var(--ink)] px-4 font-black text-white md:col-start-3" type="submit">Apply</button>
      </form>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
