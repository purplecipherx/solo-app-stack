import type {BodyBlock} from "@/lib/types";
import {slugify} from "@/lib/utils";
import {CTAButton} from "./CTAButton";
import {ComparisonTable} from "./ComparisonTable";
import {ProsCons} from "./ProsCons";

export function RenderBody({body}: {body: BodyBlock[]}) {
  return (
    <div className="prose-sas">
      {body.map((block, index) => {
        if (block.type === "heading") return <h2 id={slugify(block.text)} key={`${block.text}-${index}`}>{block.text}</h2>;
        if (block.type === "paragraph") return <p key={`${block.text}-${index}`}>{block.text}</p>;
        if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        if (block.type === "table") return <ComparisonTable key={index} headers={block.headers} rows={block.rows} />;
        if (block.type === "prosCons") return <ProsCons key={index} pros={block.pros} cons={block.cons} />;
        if (block.type === "cta") {
          return (
            <div key={index} className="my-6 rounded-md border border-[var(--line)] bg-[#f4efe4] p-5">
              <h3 className="mt-0 text-xl font-black text-[var(--ink)]">{block.title}</h3>
              <p>{block.text}</p>
              <CTAButton href={block.href} sponsored={block.sponsored}>{block.label}</CTAButton>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
