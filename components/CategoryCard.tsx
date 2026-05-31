import Image from "next/image";
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
  const imageBySlug: Record<string, string> = {
    "ai-tools": "/images/posts/ai-tools-cover.webp",
    "business-apps": "/images/posts/website-crm-cover.webp",
    "gig-worker-apps": "/images/posts/mileage-tax-cover.webp",
    "websites-hosting": "/images/posts/website-crm-cover.webp",
    "scheduling-booking": "/images/posts/scheduling-cover.webp",
    "invoicing-payments": "/images/posts/invoicing-payments-cover.webp",
    "taxes-mileage": "/images/posts/mileage-tax-cover.webp",
    "local-business-marketing": "/images/posts/website-crm-cover.webp",
    automation: "/images/posts/ai-tools-cover.webp",
    "reviews-comparisons": "/images/posts/ai-tools-cover.webp"
  };

  return (
    <Link href={`/categories/${category.slug}`} className="group overflow-hidden rounded-md border border-[var(--line)] bg-[var(--card)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md">
      <div className="relative aspect-[16/9] bg-[#efe8da]">
        <Image src={imageBySlug[category.slug] || "/images/posts/website-crm-cover.webp"} alt={`${category.title} category image`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-md bg-white text-[var(--ink)]">
          <Icon size={24} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-[var(--ink)]">{category.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
      </div>
    </Link>
  );
}
