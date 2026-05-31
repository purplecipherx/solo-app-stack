import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {AffiliateDisclosure} from "@/components/AffiliateDisclosure";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {FAQAccordion} from "@/components/FAQAccordion";
import {LastUpdated} from "@/components/LastUpdated";
import {PostCard} from "@/components/PostCard";
import {RenderBody} from "@/components/RenderBody";
import {ScriptJsonLd} from "@/components/ScriptJsonLd";
import {TableOfContents} from "@/components/TableOfContents";
import {blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd} from "@/lib/schema";
import {getPost, getPosts} from "@/lib/content";
import {absoluteUrl} from "@/lib/site";
import {formatDate} from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: {canonical: post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`)},
    robots: post.noindex ? {index: false, follow: false} : undefined,
    openGraph: {title: post.seoTitle, description: post.metaDescription, type: "article", url: `/blog/${post.slug}`},
    twitter: {card: "summary_large_image", title: post.seoTitle, description: post.metaDescription}
  };
}

export default async function BlogPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const allPosts = await getPosts();
  const related = allPosts.filter((item) => post.relatedPosts.includes(item.slug)).slice(0, 3);
  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <ScriptJsonLd data={blogPostingJsonLd(post)} />
      <ScriptJsonLd data={faqJsonLd(post.faqs)} />
      <ScriptJsonLd data={breadcrumbJsonLd([{name: "Blog", path: "/blog"}, {name: post.title, path: `/blog/${post.slug}`}])} />
      <Breadcrumbs items={[{label: "Blog", href: "/blog"}, {label: post.title, href: `/blog/${post.slug}`}]} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] shadow-sm">
            <div className="relative min-h-56 bg-[var(--ink)] p-6 text-white md:p-8">
              <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 20% 20%, #f6c453 0, transparent 24%), radial-gradient(circle at 80% 30%, #c44524 0, transparent 20%), linear-gradient(135deg, #12312b, #315f72)"}} />
              <div className="relative">
                <div className="text-sm font-black uppercase tracking-normal text-[#f6c453]">{post.category}</div>
                <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-5xl">{post.title}</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#edf5ef]">{post.excerpt}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-[var(--line)] p-5 text-sm font-semibold text-[var(--muted)]">
              <span>By {post.author.name}</span>
              <span>Published {formatDate(post.publishedAt)}</span>
              <LastUpdated date={post.updatedAt} />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <div className="mt-6"><AffiliateDisclosure /></div>
          <div className="mt-8"><RenderBody body={post.body} /></div>
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">FAQ</h2>
            <FAQAccordion faqs={post.faqs} />
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {post.tableOfContents ? <TableOfContents body={post.body} /> : null}
          <AffiliateDisclosure compact />
        </aside>
      </div>
      {related.length ? (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-[var(--ink)]">Related guides</h2>
          <div className="grid gap-4 md:grid-cols-3">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div>
        </section>
      ) : null}
    </article>
  );
}
