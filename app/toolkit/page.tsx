import type {Metadata} from "next";
import {CTAButton} from "@/components/CTAButton";
import {getToolkitItems} from "@/lib/content";

export const metadata: Metadata = {title: "Solo App Stack Toolkit", description: "A curated starter software stack for one-person businesses."};

export default async function ToolkitPage() {
  const items = await getToolkitItems();
  const sections = [...new Set(items.map((item) => item.section))];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Solo App Stack Toolkit</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">A lean, editable toolkit for the jobs most solo operators need to handle before buying a pile of subscriptions.</p>
      <div className="mt-8 grid gap-8">
        {sections.map((section) => (
          <section key={section}>
            <h2 className="mb-4 text-2xl font-black text-[var(--ink)]">{section}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.filter((item) => item.section === section).map((item) => (
                <article key={`${item.section}-${item.name}`} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5">
                  <h3 className="text-xl font-black text-[var(--ink)]">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                  <div className="mt-4"><CTAButton href={item.ctaUrl || "/tools"} sponsored={item.ctaUrl?.includes("example.com")}>{item.ctaText}</CTAButton></div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
