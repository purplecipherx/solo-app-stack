import type {BodyBlock} from "@/lib/types";
import {slugify} from "@/lib/utils";

export function TableOfContents({body}: {body: BodyBlock[]}) {
  const headings = body.filter((block) => block.type === "heading");
  if (!headings.length) return null;
  return (
    <nav className="rounded-md border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-sm font-black uppercase tracking-normal text-[var(--ink)]">Table of contents</p>
      <ol className="mt-3 space-y-2 text-sm font-semibold text-[var(--muted)]">
        {headings.map((heading) => heading.type === "heading" && (
          <li key={heading.text}><a href={`#${slugify(heading.text)}`} className="hover:text-[var(--accent-dark)]">{heading.text}</a></li>
        ))}
      </ol>
    </nav>
  );
}
