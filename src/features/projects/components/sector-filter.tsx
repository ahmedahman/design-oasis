"use client";

import { SECTORS, type SectorSlug } from "@/lib/config/sectors";
import { cn } from "@/lib/utils/cn";

/** Config-driven: adding a sector is an edit to lib/config/sectors.ts. */
export function SectorFilter({
  sector,
  available,
  onChange,
}: {
  sector: SectorSlug | null;
  available: SectorSlug[];
  onChange: (next: SectorSlug | null) => void;
}) {
  const options = SECTORS.filter((s) => available.includes(s.slug));

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={sector === null}
        className={cn(
          "text-[10px] tracking-[0.16em] uppercase transition-colors",
          sector === null ? "text-foreground" : "text-muted-light hover:text-foreground",
        )}
      >
        All
      </button>
      {options.map((option) => {
        const active = option.slug === sector;
        return (
          <button
            key={option.slug}
            type="button"
            onClick={() => onChange(active ? null : option.slug)}
            aria-pressed={active}
            className={cn(
              "text-[10px] tracking-[0.16em] uppercase transition-colors",
              active ? "text-foreground" : "text-muted-light hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
