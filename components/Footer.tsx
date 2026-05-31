import Link from "next/link";
import {site} from "@/lib/site";
import {AffiliateDisclosure} from "./AffiliateDisclosure";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#efe8da]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-xl font-black text-[var(--ink)]">{site.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{site.tagline}</p>
          <div className="mt-5">
            <AffiliateDisclosure compact />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-[var(--ink)]">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
          <Link href="/studio">Sanity Studio</Link>
        </div>
      </div>
    </footer>
  );
}
