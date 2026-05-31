import type {Metadata} from "next";

export const metadata: Metadata = {title: "Affiliate Disclosure", description: "Affiliate disclosure for Solo App Stack."};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Affiliate Disclosure</h1>
      <div className="prose-sas mt-6">
        <p><strong>Placeholder for legal review.</strong> Some links on Solo App Stack may be affiliate links. If you click a link and buy a product, we may earn a commission at no extra cost to you.</p>
        <p>Affiliate relationships do not guarantee positive coverage. Our goal is to explain who a tool is best for, where it falls short, and when a cheaper option may be enough.</p>
        <p>Seed content includes placeholder affiliate URLs. Replace those with approved tracking links before public monetized launch.</p>
      </div>
    </div>
  );
}
