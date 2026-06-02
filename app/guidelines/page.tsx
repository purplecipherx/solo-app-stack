const green = [
  "Studio favorites and product placement with clear disclosure.",
  "Food, stickers, incense, art, skate gear, clothing, lighting, and room upgrades.",
  "Harm-reduction language focused on staying free and avoiding bad decisions.",
  "Tracked links, sponsor notes, and reviewable partner copy."
];

const red = [
  "No fake medical, legal, safety, or court-safety claims.",
  "No drug-test claims or claims about avoiding supervision issues.",
  "No instructions for illegal activity, sourcing, dosing, or unsafe use.",
  "No content angle that puts Jerf's freedom, money, or platform accounts at risk."
];

export default function GuidelinesPage() {
  return (
    <main className="bg-[#0d0b10] text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-200">Guidelines</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-tight">Stay weird. Stay free.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
          This brand can be wild, but the business layer has to survive. Every product, sponsor, and claim gets checked before it becomes public content.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.5rem] border border-lime-300/20 bg-lime-300/10 p-6">
            <h2 className="text-2xl font-black text-lime-100">Green light</h2>
            <div className="mt-4 grid gap-3">
              {green.map((item) => <p key={item} className="rounded-xl bg-black/30 p-3 text-white/78">{item}</p>)}
            </div>
          </section>
          <section className="rounded-[1.5rem] border border-pink-300/20 bg-pink-500/10 p-6">
            <h2 className="text-2xl font-black text-pink-100">Review first</h2>
            <div className="mt-4 grid gap-3">
              {red.map((item) => <p key={item} className="rounded-xl bg-black/30 p-3 text-white/78">{item}</p>)}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
