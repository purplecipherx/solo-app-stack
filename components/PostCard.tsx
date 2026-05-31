import Link from "next/link";
import {Clock} from "lucide-react";
import {formatDate} from "@/lib/utils";
import type {Post} from "@/lib/types";

export function PostCard({post}: {post: Post}) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-normal text-[var(--accent-dark)]">
        <span>{post.category}</span>
        <span>Updated {formatDate(post.updatedAt)}</span>
      </div>
      <h3 className="mt-3 text-xl font-black leading-tight text-[var(--ink)]">
        <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent-dark)]">{post.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
        <Clock size={15} /> {post.readingTime}
      </div>
    </article>
  );
}
