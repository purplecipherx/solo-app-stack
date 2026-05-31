import Link from "next/link";

export function Breadcrumbs({items}: {items: {label: string; href: string}[]}) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm font-semibold text-[var(--muted)]">
      <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
      {items.map((item) => (
        <span key={item.href} className="flex gap-2">
          <span>/</span>
          <Link href={item.href} className="hover:text-[var(--ink)]">{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}
