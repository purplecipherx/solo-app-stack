import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {AffiliateDisclosure} from "@/components/AffiliateDisclosure";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {CTAButton} from "@/components/CTAButton";
import {PostCard} from "@/components/PostCard";
import {ProsCons} from "@/components/ProsCons";
import {RatingBadge} from "@/components/RatingBadge";
import {ScriptJsonLd} from "@/components/ScriptJsonLd";
import {getPosts, getTool, getTools} from "@/lib/content";
import {breadcrumbJsonLd, softwareJsonLd} from "@/lib/schema";
import {formatDate} from "@/lib/utils";

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({slug: tool.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const tool = await getTool((await params).slug);
  return tool ? {title: `${tool.name} Review`, description: tool.shortDescription} : {};
}

export default async function ToolPage({params}: {params: Promise<{slug: string}>}) {
  const tool = await getTool((await params).slug);
  if (!tool) notFound();
  const posts = (await getPosts()).filter((post) => tool.relatedPosts.includes(post.slug));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <ScriptJsonLd data={softwareJsonLd(tool)} />
      <ScriptJsonLd data={breadcrumbJsonLd([{name: "Tools", path: "/tools"}, {name: tool.name, path: `/tools/${tool.slug}`}])} />
      <Breadcrumbs items={[{label: "Tools", href: "/tools"}, {label: tool.name, href: `/tools/${tool.slug}`}]} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-[var(--ink)]">{tool.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">{tool.shortDescription}</p>
            </div>
            <RatingBadge score={tool.ratings.overallScore} />
          </div>
          <div className="mt-6 grid gap-4 rounded-md border border-[var(--line)] bg-[var(--card)] p-5 md:grid-cols-2">
            <p><strong>Best for:</strong> {tool.bestFor}</p>
            <p><strong>Pricing:</strong> {tool.pricingSummary}</p>
            <p><strong>Starting price:</strong> {tool.startingPrice || "Varies"}</p>
            <p><strong>Free plan:</strong> {tool.freePlan ? "Yes" : "No"}</p>
          </div>
          {tool.affiliateUrl ? <div className="mt-5"><AffiliateDisclosure compact /></div> : null}
          <section className="mt-8"><ProsCons pros={tool.pros} cons={tool.cons} /></section>
          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">Features</h2>
            <div className="grid gap-3 md:grid-cols-2">{tool.features.map((feature) => <div key={feature} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-3 font-semibold">{feature}</div>)}</div>
          </section>
          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">Alternatives</h2>
            <p className="text-[var(--muted)]">{tool.alternatives.length ? tool.alternatives.join(", ") : "No alternatives listed yet."}</p>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5">
            <p className="font-black text-[var(--ink)]">Try {tool.name}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Updated {formatDate(tool.updatedAt)}</p>
            <div className="mt-4 grid gap-3">
              <CTAButton href={tool.affiliateUrl || tool.directUrl} sponsored={Boolean(tool.affiliateUrl)}>{tool.primaryCtaText}</CTAButton>
              <CTAButton href={tool.directUrl} className="bg-[var(--ink)] hover:bg-[#081d19]">Non-affiliate URL</CTAButton>
            </div>
          </div>
        </aside>
      </div>
      {posts.length ? <section className="mt-12"><h2 className="mb-5 text-2xl font-black text-[var(--ink)]">Related guides</h2><div className="grid gap-4 md:grid-cols-3">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div></section> : null}
    </div>
  );
}
