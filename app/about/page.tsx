import type {Metadata} from "next";

export const metadata: Metadata = {title: "About", description: "About Solo App Stack."};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black text-[var(--ink)]">About Solo App Stack</h1>
      <div className="prose-sas mt-6">
        <p>Solo App Stack helps solo operators choose tools without wasting money. That means freelancers, gig workers, one-person local service businesses, consultants, creators, and side hustlers who need practical systems instead of corporate software theater.</p>
        <p>The site focuses on buyer guides, software comparisons, cheap stacks, AI workflows, and simple automations that can be run by one person.</p>
      </div>
    </div>
  );
}
