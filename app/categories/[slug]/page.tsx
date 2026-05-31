import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {PostCard} from "@/components/PostCard";
import {getCategories, getCategory, getPosts} from "@/lib/content";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({slug: category.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  return category ? {title: category.title, description: category.description, alternates: {canonical: `/categories/${category.slug}`}} : {};
}

export default async function CategoryPage({params}: {params: Promise<{slug: string}>}) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();
  const posts = (await getPosts()).filter((post) => post.category === category.title);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">{category.title}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">{category.description}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
