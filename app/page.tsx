import Link from "next/link";

const featuredGoods = [
  {
    title: "Studio favorites",
    text: "Incense, stickers, lights, display pieces, skate gear, snacks, and the weird stuff that belongs in the room.",
    href: "/goods"
  },
  {
    title: "Jerf Lab picks",
    text: "Review-ready products with notes, fit checks, audience angles, and partner-safe placement ideas.",
    href: "/lab"
  },
  {
    title: "Partner links",
    text: "Tracked links, sponsor drops, affiliate placeholders, and clear disclosures before anything goes live.",
    href: "/links"
  }
];

const channels = [
  "Jerf Field Notes",
  "Jerf Lab",
  "Jerf Radio",
  "Jerf Afterglow",
  "Jerfeats Real Food",
  "Skate Hippie Sessions"
];

const rules = [
  "Real goods. Weird finds. Studio favorites.",
  "Hippie life, harm reduction, and staying free.",
  "Legal does not automatically mean court-safe.",
  "No unreviewed claims, no fake safety promises, no reckless product language."
];

export default function HomePage() {
  return (
    <div className="bg-[#0d0b10] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.38),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.28),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(132,204,22,0.25),transparent_26%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
              Official product + brand link hub
            </p>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
              Jerf Supply
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-black text-pink-200 md:text-3xl">
              Real goods. Weird finds. Studio favorites.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              The commerce and partner hub for Jerf: a DIY psychedelic skate-den storyteller building a brand around staying weird, staying free, sponsor experiments, studio culture, and products that fit the room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/goods" className="rounded-full bg-lime-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-black shadow-lg shadow-lime-300/20 transition hover:-translate-y-0.5">
                Browse goods
              </Link>
              <Link href="/partners" className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Sponsor the room
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-black/45 p-5 shadow-2xl shadow-cyan-500/10">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#16121d] p-5">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-300">Brand stack</p>
              <div className="mt-5 grid gap-3">
                {channels.map((channel) => (
                  <div key={channel} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-black text-white">{channel}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/62">
                Jerfeats Real Food is a series. Jerf Supply is the storefront and link hub.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
        {featuredGoods.map((item) => (
          <Link key={item.title} href={item.href} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]">
            <h2 className="text-2xl font-black text-white">{item.title}</h2>
            <p className="mt-3 leading-7 text-white/70">{item.text}</p>
            <p className="mt-5 text-sm font-black uppercase tracking-wide text-cyan-200 group-hover:text-lime-200">Open section →</p>
          </Link>
        ))}
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-200">Operating rules</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-tight">Make money without killing the future.</h2>
          </div>
          <div className="grid gap-3">
            {rules.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-lg font-bold text-white/85">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-[2rem] border border-pink-300/20 bg-pink-500/10 p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-200">Partner CTA</p>
          <h2 className="mt-3 text-4xl font-black uppercase">Send it. We will make it memorable.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
            Product partners get reviewable placement ideas, tracked links, and a studio-native angle before any public post. The room is the ad unit. Jerf is the hook. The rules keep it alive.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/partners" className="rounded-full bg-pink-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-black">Partner info</Link>
            <Link href="/guidelines" className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white">Read guidelines</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
