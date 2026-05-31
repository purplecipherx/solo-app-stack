import Link from "next/link";
import {Bot, BriefcaseBusiness, CalendarDays, Car, CircleDollarSign, Globe2, MapPinned, Repeat2, Scale, Wrench} from "lucide-react";
import type {Category} from "@/lib/types";

const icons = {
  "ai-tools": Bot,
  "business-apps": BriefcaseBusiness,
  "gig-worker-apps": Car,
  "websites-hosting": Globe2,
  "scheduling-booking": CalendarDays,
  "invoicing-payments": CircleDollarSign,
  "taxes-mileage": Scale,
  "local-business-marketing": MapPinned,
  automation: Repeat2,
  "reviews-comparisons": Wrench
};

export function CategoryCard({category}: {category: Category}) {
  const Icon = icons[category.slug as keyof typeof icons] || Wrench;
  return (
    <Link href={`/categories/${category.slug}`} className="group rounded-md border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#efe8da] text-[var(--ink)] group-hover:bg-[var(--accent)] group-hover:text-white">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-black text-[var(--ink)]">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
    </Link>
  );
}
