import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {title: "Start Here", description: "Pick the right Solo App Stack path for your current business problem."};

const paths = [
  ["I need a website", "Start with a simple service page, booking link, proof, and a clean call-to-action.", "/categories/websites-hosting"],
  ["I need more leads", "Fix your Google profile, follow-up, reviews, and local offer before buying ad tools.", "/categories/local-business-marketing"],
  ["I need to save time", "Automate the admin task you repeat every week before adding more apps.", "/categories/automation"],
  ["I need to track money/taxes", "Separate income, expenses, mileage, invoices, and tax records before filing season.", "/categories/taxes-mileage"],
  ["I need AI tools", "Buy one general AI assistant first, then add specialist tools only when they replace repeat work.", "/categories/ai-tools"]
];

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Start here</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">Pick the problem that is costing you the most time, money, or missed work right now.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {paths.map(([title, text, href]) => (
          <Link key={title} href={href} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-5 hover:border-[var(--accent)]">
            <h2 className="text-2xl font-black text-[var(--ink)]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
