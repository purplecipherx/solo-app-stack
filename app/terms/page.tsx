import type {Metadata} from "next";

export const metadata: Metadata = {title: "Terms", description: "Starter terms for Solo App Stack."};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Terms</h1>
      <div className="prose-sas mt-6">
        <p><strong>Placeholder for legal review.</strong> These starter terms should be reviewed by qualified counsel before production use.</p>
        <p>Content on this site is for general informational purposes only and is not financial, tax, legal, or professional advice. Tool pricing, features, and availability may change.</p>
        <p>By using the site, you agree not to misuse the content, interfere with site operation, or rely on tool recommendations without checking current vendor terms.</p>
      </div>
    </div>
  );
}
