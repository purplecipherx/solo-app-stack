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
          <div className="text-sm font-bold uppercase tracking-normal text-[var(--accent-dark)]">{post.category}</div>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[var(--ink)] md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-[var(--muted)]">
            <span>By {post.author.name}</span>
            <span>Published {formatDate(post.publishedAt)}</span>
            <LastUpdated date={post.updatedAt} />
            <span>{post.readingTime}</span>
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
