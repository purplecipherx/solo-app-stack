const tests = [
  ["Brand fit", "Does it belong in the Jerf room, match the visual style, and create a memorable clip?"],
  ["Audience fit", "Will hippies, skaters, art people, recovery people, music fans, or weird product fans care?"],
  ["Claim check", "Can we talk about it without unverified safety, legal, medical, or court claims?"],
  ["Platform check", "Can it survive YouTube, TikTok, Instagram, affiliate, and payment-platform rules?"],
  ["Tracking check", "Does it have a link, code, UTM, sponsor note, or measurable action?"],
  ["Content angle", "Can Jerf eat it, wear it, build with it, react to it, or put it in the room?" ]
];

export default function LabPage() {
  return (
    <main className="bg-[#0d0b10] text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-fuchsia-200">Jerf Lab</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-tight">Review before the hype.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
          Jerf Lab is the product review and sponsor-test system. It turns random products into structured, trackable, safer content before public promotion.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests.map(([title, text]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
              <h2 className="text-2xl font-black text-white">{title}</h2>
              <p className="mt-3 leading-7 text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
