const links = [
  ["Official socials", "YouTube, TikTok, Instagram, livestreams, and community channels go here."],
  ["Partner links", "Tracked sponsor and affiliate links with UTM tags and clear disclosure."],
  ["Jerf Lab queue", "Products being reviewed, tested, or considered for future placement."],
  ["Fan support", "Newsletter, Patreon-style support, fan mail, sticker submissions, and art prompts."],
  ["Media kit", "Short pitch, audience notes, sponsor packages, and contact instructions."],
  ["Safety guidelines", "Court-aware and platform-aware rules for product language and content claims."]
];

export default function LinksPage() {
  return (
    <main className="bg-[#0d0b10] text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Link hub</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-tight">Everything in one place.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
          This page becomes the public link-in-bio hub. Keep it clean, fast, and money-focused: official socials, sponsor links, affiliate links, community support, and safety notes.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {links.map(([title, text]) => (
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
