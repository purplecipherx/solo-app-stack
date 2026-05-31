import {Mail} from "lucide-react";

export function NewsletterSignup() {
  return (
    <section className="rounded-md border border-[var(--line)] bg-[var(--ink)] p-6 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black"><Mail size={22} /> Get the cheap-stack notes</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#d9e7df]">One practical email with app picks, workflow fixes, and deal notes for solo operators.</p>
        </div>
        <form className="flex w-full max-w-md gap-2">
          <input aria-label="Email address" className="min-h-11 flex-1 rounded-md border border-white/20 bg-white px-3 text-sm text-black" placeholder="you@example.com" type="email" />
          <button className="min-h-11 rounded-md bg-[var(--accent)] px-4 text-sm font-black text-white" type="submit">Join</button>
        </form>
      </div>
    </section>
  );
}
