import type {Metadata} from "next";
import {site} from "@/lib/site";

export const metadata: Metadata = {title: "Contact", description: "Contact Solo App Stack."};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">Contact</h1>
      <div className="prose-sas mt-6">
        <p>For business inquiries, correction requests, affiliate partnerships, or tool updates, email <a className="font-bold text-[var(--accent-dark)]" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p>Please include the page URL and the specific correction or update requested.</p>
      </div>
    </div>
  );
}
