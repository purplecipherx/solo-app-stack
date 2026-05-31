import type {FAQ} from "@/lib/types";

export function FAQAccordion({faqs}: {faqs: FAQ[]}) {
  return (
    <section className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded-md border border-[var(--line)] bg-[var(--card)] p-4">
          <summary className="cursor-pointer font-black text-[var(--ink)]">{faq.question}</summary>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
        </details>
      ))}
    </section>
  );
}
