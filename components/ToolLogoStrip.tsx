import Link from "next/link";
import type {Tool} from "@/lib/types";

export function ToolLogoStrip({tools}: {tools: Tool[]}) {
  if (!tools.length) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-md border border-[var(--line)] bg-white/95 p-3 text-[var(--ink)]">
      <span className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">Products covered</span>
      {tools.map((tool) => (
        <Link key={tool.slug} href={`/tools/${tool.slug}`} className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm font-black hover:border-[var(--accent)]">
          {tool.logoUrl ? <img src={tool.logoUrl} alt={`${tool.name} logo`} className="h-5 w-5 rounded" /> : null}
          {tool.name}
        </Link>
      ))}
    </div>
  );
}
