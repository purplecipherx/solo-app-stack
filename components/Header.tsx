import Link from "next/link";
import {site} from "@/lib/site";

const nav = [
  ["Goods", "/goods"],
  ["Links", "/links"],
  ["Partners", "/partners"],
  ["Guidelines", "/guidelines"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-black tracking-tight text-[var(--ink)]">{site.name}</span>
          <span className="hidden text-xs text-[var(--muted)] sm:block">{site.tagline}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-sm font-semibold">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-[var(--ink)] hover:bg-[#efe8da]">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
