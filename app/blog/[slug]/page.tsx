import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {AffiliateDisclosure} from "@/components/AffiliateDisclosure";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {FAQAccordion} from "@/components/FAQAccordion";
import {LastUpdated} from "@/components/LastUpdated";
import {PostCard} from "@/components/PostCard";
import {RenderBody} from "@/components/RenderBody";
import {ScriptJsonLd} from "@/components/ScriptJsonLd";
import {TableOfContents} from "@/components/TableOfContents";
import {ToolCard} from "@/components/ToolCard";
import {ToolLogoStrip} from "@/components/ToolLogoStrip";
import {blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd} from "@/lib/schema";
import {getPost, getPosts, getTools} from "@/lib/content";
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
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: "article",
      url: `/blog/${post.slug}`,
      images: post.featuredImage ? [{url: post.featuredImage, alt: post.featuredImageAlt || post.title}] : undefined
    },
    twitter: {card: "summary_large_image", title: post.seoTitle, description: post.metaDescription, images: post.featuredImage ? [post.featuredImage] : undefined}
  };
}

export default async function BlogPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const [allPosts, tools] = await Promise.all([getPosts(), getTools()]);
  const related = allPosts.filter((item) => post.relatedPosts.includes(item.slug)).slice(0, 3);
  const mentionedTools = tools.filter((tool) => post.relatedTools.includes(tool.slug));
  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <ScriptJsonLd data={blogPostingJsonLd(post)} />
      <ScriptJsonLd data={faqJsonLd(post.faqs)} />
      <ScriptJsonLd data={breadcrumbJsonLd([{name: "Blog", path: "/blog"}, {name: post.title, path: `/blog/${post.slug}`}])} />
      <Breadcrumbs items={[{label: "Blog", href: "/blog"}, {label: post.title, href: `/blog/${post.slug}`}]} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] shadow-sm">
            <div className="relative min-h-72 bg-[var(--ink)] p-6 text-white md:p-8">
              {post.featuredImage ? (
                <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill priority className="object-cover" sizes="(min-width: 1024px) 760px, 100vw" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/42 to-black/10" />
              <div className="relative">
                <div className="text-sm font-black uppercase tracking-normal text-[#f6c453]">{post.category}</div>
                <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-5xl">{post.title}</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#edf5ef]">{post.excerpt}</p>
                <ToolLogoStrip tools={mentionedTools} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-[var(--line)] p-5 text-sm font-semibold text-[var(--muted)]">
              <span>By {post.author.name}</span>
              <span>Published {formatDate(post.publishedAt)}</span>
              <LastUpdated date={post.updatedAt} />
              <span>{post.readingTime}</span>
            </div>
          </div>
          {(post.affiliateDisclosureRequired ?? post.affiliateDisclosure) ? <div className="mt-6"><AffiliateDisclosure /></div> : null}
          {mentionedTools.length ? (
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">Tools mentioned in this guide</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mentionedTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
              </div>
            </section>
          ) : null}
          <div className="mt-8"><RenderBody body={post.body} /></div>
          {post.featuredImageCredit || post.featuredImageLicense ? (
            <p className="mt-4 text-xs font-semibold text-[var(--muted)]">
              Image: {[post.featuredImageCredit, post.featuredImageLicense].filter(Boolean).join(" / ")}
            </p>
          ) : null}
          {post.internalLinks?.length ? (
            <section className="mt-10 rounded-md border border-[var(--line)] bg-[var(--card)] p-5">
              <h2 className="text-2xl font-black text-[var(--ink)]">Keep building the stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.internalLinks.map((href) => (
                  <a key={href} href={href} className="rounded-md border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]">
                    {href}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
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
