"use client";

import Link from "next/link";
import {ExternalLink} from "lucide-react";
import {trackAffiliateClick} from "@/lib/analytics";
import {cn} from "@/lib/utils";

export function CTAButton({
  href,
  children,
  sponsored,
  className
}: {
  href: string;
  children: React.ReactNode;
  sponsored?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--accent-dark)]",
    className
  );

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        rel={sponsored ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
        target="_blank"
        onClick={() => trackAffiliateClick({label: String(children), url: href})}
      >
        {children}
        <ExternalLink size={16} />
      </a>
    );
  }

  return <Link className={classes} href={href}>{children}</Link>;
}
