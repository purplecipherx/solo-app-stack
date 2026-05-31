import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {AffiliateDisclosure} from "@/components/AffiliateDisclosure";
import {Breadcrumbs} from "@/components/Breadcrumbs";
import {ComparisonTable} from "@/components/ComparisonTable";
import {FAQAccordion} from "@/components/FAQAccordion";
import {RenderBody} from "@/components/RenderBody";
import {ScriptJsonLd} from "@/components/ScriptJsonLd";
import {getComparison, getComparisons} from "@/lib/content";
import {breadcrumbJsonLd, faqJsonLd} from "@/lib/schema";

export async function generateStaticParams() {
  return (await getComparisons()).map((comparison) => ({slug: comparison.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const comparison = await getComparison((await params).slug);
  return comparison ? {title: comparison.seoTitle, description: comparison.metaDescription, alternates: {canonical: `/comparisons/${comparison.slug}`}} : {};
}

export default async function ComparisonPage({params}: {params: Promise<{slug: string}>}) {
  const comparison = await getComparison((await params).slug);
  if (!comparison) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <ScriptJsonLd data={faqJsonLd(comparison.faqs)} />
      <ScriptJsonLd data={breadcrumbJsonLd([{name: "Comparisons", path: "/comparisons"}, {name: comparison.title, path: `/comparisons/${comparison.slug}`}])} />
      <Breadcrumbs items={[{label: "Comparisons", href: "/comparisons"}, {label: comparison.title, href: `/comparisons/${comparison.slug}`}]} />
      <h1 className="mt-8 text-4xl font-black text-[var(--ink)]">{comparison.title}</h1>
      <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{comparison.summary}</p>
      <div className="mt-6"><AffiliateDisclosure /></div>
      <section className="mt-8 rounded-md border border-[var(--line)] bg-[#f4efe4] p-5">
        <h2 className="text-2xl font-black text-[var(--ink)]">Summary winner</h2>
        <p className="mt-2 leading-7">{comparison.winner}</p>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">Pricing and feature table</h2>
        <ComparisonTable headers={comparison.comparisonTable.headers} rows={comparison.comparisonTable.rows} />
      </section>
      <div className="mt-8"><RenderBody body={comparison.body} /></div>
      <section className="mt-10"><h2 className="mb-4 text-2xl font-black text-[var(--ink)]">FAQ</h2><FAQAccordion faqs={comparison.faqs} /></section>
    </div>
  );
}
