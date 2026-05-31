import type {Metadata} from "next";
import {ToolCard} from "@/components/ToolCard";
import {getTools} from "@/lib/content";

export const metadata: Metadata = {title: "Tool Directory", description: "Software and AI tool directory for one-person businesses."};

export default async function ToolsPage() {
  const tools = await getTools();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Tool directory</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">CMS-managed software entries with pricing notes, best-for labels, pros, cons, alternatives, and affiliate-safe CTAs.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">{tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
    </div>
  );
}
