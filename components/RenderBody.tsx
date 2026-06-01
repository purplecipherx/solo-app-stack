import {PortableText, type PortableTextComponents} from "@portabletext/react";
import type {BodyBlock} from "@/lib/types";
import {slugify} from "@/lib/utils";
import {CTAButton} from "./CTAButton";
import {ComparisonTable} from "./ComparisonTable";
import {ProsCons} from "./ProsCons";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({children, value}) => {
      const text = Array.isArray(value.children)
        ? value.children.map((child) => ("text" in child && typeof child.text === "string" ? child.text : "")).join("")
        : "";
      return <h2 id={slugify(text)}>{children}</h2>;
    },
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic">{children}</blockquote>
  },
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{children}</a>;
    }
  },
  types: {
    markdownBlock: ({value}) => <pre className="overflow-x-auto rounded-md border border-[var(--line)] bg-[#f4efe4] p-4 text-sm leading-6">{value.markdown}</pre>
  }
};

export function RenderBody({body}: {body: BodyBlock[] | unknown[]}) {
  const firstBlock = body?.[0] as {_type?: string} | undefined;
  if (firstBlock?._type) {
    return (
      <div className="prose-sas">
        <PortableText value={body as never} components={portableTextComponents} />
      </div>
    );
  }

  return (
    <div className="prose-sas">
      {(body as BodyBlock[])?.map((block, index) => {
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
