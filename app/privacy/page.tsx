import type {Metadata} from "next";

export const metadata: Metadata = {title: "Privacy Policy", description: "Starter privacy policy for Solo App Stack."};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Privacy Policy</h1>
      <div className="prose-sas mt-6">
        <p><strong>Placeholder for legal review.</strong> This starter policy should be reviewed by qualified counsel before production use.</p>
        <p>Solo App Stack may collect basic analytics data, newsletter signup information, contact form messages, and affiliate click events. We do not sell personal information in this starter template.</p>
        <p>Third-party services may include Sanity, Vercel, Google Analytics, Plausible, email providers, and affiliate networks. Their own policies apply.</p>
      </div>
    </div>
  );
}
