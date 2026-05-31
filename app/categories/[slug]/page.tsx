import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {PostCard} from "@/components/PostCard";
import {getCategories, getCategory, getPosts} from "@/lib/content";
import {categoryImages} from "@/lib/seed";

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
  const categoryImage = categoryImages[category.title];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] shadow-sm">
        <div className="relative min-h-72 p-6 text-white md:p-8">
          {categoryImage ? <Image src={categoryImage.src} alt={categoryImage.alt} fill priority className="object-cover" sizes="100vw" /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/42 to-black/10" />
          <div className="relative">
            <h1 className="text-4xl font-black">{category.title}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-white/90">{category.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
