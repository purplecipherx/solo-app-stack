import {formatDate} from "@/lib/utils";

export function LastUpdated({date}: {date: string}) {
  return <span className="text-sm font-bold text-[var(--accent-dark)]">Last updated {formatDate(date)}</span>;
}
