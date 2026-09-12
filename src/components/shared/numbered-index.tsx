import Link from "next/link";

import { cn } from "@/lib/utils/cn";

export type IndexEntry = { href: string; label: string };

/**
 * A numbered list of what a page contains, for a heading's right column. It
 * fills the measure with something useful rather than decorative: on `/services`
 * it doubles as a jump list to the section anchors further down.
 */
export function NumberedIndex({
  entries,
  className,
}: {
  entries: IndexEntry[];
  className?: string;
}) {
  return (
    <ol className={cn("border-border border-t", className)}>
      {entries.map((entry, i) => (
        <li key={entry.href} className="border-border border-b">
          <Link
            href={entry.href}
            className="group flex items-baseline gap-5 py-3.5 transition-colors"
          >
            <span className="text-muted-light group-hover:text-lime-text text-[10px] tracking-[0.16em] tabular-nums transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="group-hover:text-lime-text transition-colors">{entry.label}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
