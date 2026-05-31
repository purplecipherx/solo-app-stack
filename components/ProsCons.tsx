import {ThumbsDown, ThumbsUp} from "lucide-react";

export function ProsCons({pros, cons}: {pros: string[]; cons: string[]}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-md border border-[var(--line)] bg-[#f2f7ec] p-5">
        <h3 className="flex items-center gap-2 font-black text-[var(--ink)]"><ThumbsUp size={18} /> Pros</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {pros.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="rounded-md border border-[var(--line)] bg-[#fff1eb] p-5">
        <h3 className="flex items-center gap-2 font-black text-[var(--ink)]"><ThumbsDown size={18} /> Cons</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {cons.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
