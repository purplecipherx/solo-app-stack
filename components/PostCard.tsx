import Link from "next/link";
import {ArrowUpRight, Clock} from "lucide-react";
import {formatDate} from "@/lib/utils";
import type {Post} from "@/lib/types";

const categoryStyles: Record<string, string> = {
  "AI Tools": "bg-[#12312b] text-white",
  "Business Apps": "bg-[#c44524] text-white",
  "Gig Worker Apps": "bg-[#f6c453] text-[#1d1d1b]",
  "Websites & Hosting": "bg-[#315f72] text-white",
  "Scheduling & Booking": "bg-[#6f7f3f] text-white",
  "Invoicing & Payments": "bg-[#8f2e1a] text-white",
  "Taxes & Mileage": "bg-[#4b5f3b] text-white",
  "Reviews & Comparisons": "bg-[#3a3447] text-white"
};

export function PostCard({post}: {post: Post}) {
  return (
    <article className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={`${categoryStyles[post.category] || "bg-[#efe8da] text-[var(--ink)]"} flex min-h-24 items-end justify-between gap-4 p-4`}>
        <div>
          <p className="text-xs font-black uppercase tracking-normal opacity-90">{post.category}</p>
          <p className="mt-1 text-sm font-bold">Updated {formatDate(post.updatedAt)}</p>
        </div>
        <ArrowUpRight size={22} />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black leading-tight text-[var(--ink)]">
          <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent-dark)]">{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
          <Clock size={15} /> {post.readingTime}
        </div>
      </div>
    </article>
  );
}
