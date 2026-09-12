import { cn } from "@/lib/utils/cn";

export type MetaStat = { value: string; label: string };

/**
 * A compact row of counts for a heading's right column. Smaller and quieter
 * than `StatBand`, which is a section in its own right — this one sits beside a
 * title rather than under one.
 */
export function MetaStats({ stats, className }: { stats: MetaStat[]; className?: string }) {
  return (
    <dl className={cn("flex flex-wrap gap-x-10 gap-y-5", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="border-lime/50 border-t pt-3">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="font-display block text-3xl leading-none tracking-tight">
              {stat.value}
            </span>
            <span className="text-muted mt-2 block text-[10px] tracking-[0.16em] uppercase">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
