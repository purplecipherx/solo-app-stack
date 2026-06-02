const packages = [
  ["Starter placement", "Short mention, tracked link, product in the studio background, and a seven-day click report."],
  ["Standard feature", "Dedicated short, product table placement, pinned comment copy, tracked link, and recap mention."],
  ["Studio integration", "Product becomes part of a weird object, build, or room segment with multi-platform clips."],
  ["Monthly room sponsor", "Recurring placement, weekly mentions, studio background presence, and monthly analytics."]
];

export default function PartnersPage() {
  return (
    <main className="bg-[#0d0b10] text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-200">Sponsors + partners</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-tight">Sponsor the room.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
          Jerf Supply is built for memorable product placement: weird studio visuals, repeatable segments, tracked links, and reviewable claims before anything goes public.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {packages.map(([title, text]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
              <h2 className="text-2xl font-black text-white">{title}</h2>
              <p className="mt-3 leading-7 text-white/70">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-[1.5rem] border border-lime-300/20 bg-lime-300/10 p-6">
          <h2 className="text-2xl font-black text-lime-100">Partner rule</h2>
          <p className="mt-3 leading-7 text-white/72">
            We do not publish unreviewed legal, safety, medical, or court-related claims. Good sponsors get better content because the placement survives review.
          </p>
        </div>
      </section>
    </main>
  );
}
