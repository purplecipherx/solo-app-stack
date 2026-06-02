const goods = [
  ["Studio favorites", "Incense, tapestries, LED lights, display props, stickers, art supplies, and room upgrades."],
  ["Food + drink links", "Ramen, snacks, cheese, coffee, horchata supplies, and survival-food picks for Jerfeats Real Food."],
  ["Skate + clothes", "Boards, wheels, trucks, shoes, skeleton pieces, tie-dye, hats, and gear that fits the room."],
  ["Art + fan gear", "Sticker drops, tattoo flash, posters, zines, weird objects, and fan-made pieces."],
  ["Lifestyle picks", "Recovery-friendly, court-aware, low-risk lifestyle items only after review."],
  ["Partner drops", "Tracked affiliate and sponsor products with clear disclosure and no fake claims."]
];

export default function GoodsPage() {
  return (
    <main className="bg-[#0d0b10] text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-200">Shop map</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-tight">Goods that fit the room.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
          This is the product map for Jerf Supply. Start with safe affiliate links and sponsor products before holding inventory. Every link needs disclosure, tracking, and a brand-fit check.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goods.map(([title, text]) => (
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
