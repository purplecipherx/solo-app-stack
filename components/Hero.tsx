import Image from "next/image";
import {ArrowRight, Wrench} from "lucide-react";
import {CTAButton} from "./CTAButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-[#f4efe4]">
      <Image
        src="/images/solo-workspace-hero.webp"
        alt="Solo business software workspace with laptop, phone, invoices, and app dashboards"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,250,247,0.98)_0%,rgba(251,250,247,0.88)_42%,rgba(251,250,247,0.32)_74%,rgba(251,250,247,0.12)_100%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm font-bold text-[var(--ink)]">
            <Wrench size={16} /> Solo App Stack
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
            The best apps and AI tools for one-person businesses
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4c463d]">
            Simple software stacks, automation guides, and tool comparisons for solo operators who need to make more money with less hassle.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CTAButton href="/toolkit">Start with the toolkit</CTAButton>
            <CTAButton href="/blog" className="bg-[var(--ink)] hover:bg-[#081d19]">
              Read the latest guides <ArrowRight size={16} />
            </CTAButton>
          </div>
        </div>
        <div className="grid content-end gap-3 md:pt-28">
          {["I need a website", "I need more leads", "I need to save time", "I need to track money/taxes", "I need AI tools"].map((item) => (
            <a key={item} href="/start-here" className="rounded-md border border-white/70 bg-white/86 p-4 font-bold text-[var(--ink)] shadow-sm backdrop-blur hover:border-[var(--accent)]">
              {item}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
