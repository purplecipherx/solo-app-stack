import Image from "next/image";
import Link from "next/link";
import {CheckCircle2} from "lucide-react";
import type {Tool} from "@/lib/types";
import {CTAButton} from "./CTAButton";
import {RatingBadge} from "./RatingBadge";

export function ToolCard({tool}: {tool: Tool}) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
      {tool.image ? (
        <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-md border border-[var(--line)] bg-[#efe8da]">
          <Image src={tool.image} alt={tool.imageAlt || `${tool.name} review image`} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="inline-flex rounded-md bg-white px-3 py-1 text-sm font-black text-[var(--ink)]">{tool.name}</span>
          </div>
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#efe8da] text-lg font-black text-[var(--ink)]">
            {tool.logoUrl ? <img src={tool.logoUrl} alt={`${tool.name} logo`} className="h-8 w-8 rounded" /> : tool.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
          <h3 className="text-xl font-black text-[var(--ink)]">
            <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--accent-dark)]">{tool.name}</Link>
          </h3>
          <p className="mt-1 text-sm font-bold text-[var(--accent-dark)]">Best for: {tool.bestFor}</p>
          </div>
        </div>
        <RatingBadge score={tool.ratings.overallScore} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tool.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.features.slice(0, 3).map((feature) => (
          <span key={feature} className="inline-flex items-center gap-1 rounded-md bg-[#efe8da] px-2 py-1 text-xs font-bold text-[var(--ink)]">
            <CheckCircle2 size={13} /> {feature}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <CTAButton href={tool.affiliateUrl || tool.directUrl} sponsored={Boolean(tool.affiliateUrl)}>
          {tool.primaryCtaText}
        </CTAButton>
        <Link href={`/tools/${tool.slug}`} className="inline-flex min-h-11 items-center rounded-md border border-[var(--line)] px-4 text-sm font-bold text-[var(--ink)] hover:bg-[#efe8da]">
          Read review
        </Link>
      </div>
    </article>
  );
}
