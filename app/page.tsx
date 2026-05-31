import Link from "next/link";
import {AffiliateDisclosure} from "@/components/AffiliateDisclosure";
import {CategoryCard} from "@/components/CategoryCard";
import {Hero} from "@/components/Hero";
import {NewsletterSignup} from "@/components/NewsletterSignup";
import {PostCard} from "@/components/PostCard";
import {ToolCard} from "@/components/ToolCard";
import {getCategories, getPosts, getTools} from "@/lib/content";

export const revalidate = 3600;

const headlines = [
  "Best AI tools for one-person businesses",
  "Best scheduling apps for solo service businesses",
  "Best mileage tracker apps for gig workers",
  "Best invoicing software for freelancers",
  "Best website builders for local service businesses",
  "Best cheap CRM for solo operators"
];

export default async function HomePage() {
  const [posts, categories, tools] = await Promise.all([getPosts(), getCategories(), getTools()]);
  return (
    <>
      <Hero />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10">
        <AffiliateDisclosure compact />
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-[var(--ink)]">Featured categories</h2>
            <Link href="/categories" className="text-sm font-bold text-[var(--accent-dark)]">Browse all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.slice(0, 6).map((category) => <CategoryCard key={category.slug} category={category} />)}
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-black text-[var(--ink)]">Best software lists</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {headlines.map((headline) => (
              <Link key={headline} href="/blog" className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] font-black text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md">
                <span className="block h-2 bg-[var(--accent)]" />
                <span className="block p-4">{headline}</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-black text-[var(--ink)]">Latest guides</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-black text-[var(--ink)]">Useful tools</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.slice(0, 4).map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>
        <NewsletterSignup />
      </div>
    </>
  );
}
