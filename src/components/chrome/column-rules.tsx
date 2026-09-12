import { cn } from "@/lib/utils/cn";

/**
 * Vertical hairlines at the gutters and centre — the editorial device lifted
 * from the Pinnacl reference. Costs one SVG and makes a plain section read as
 * a considered grid.
 *
 * `preserveAspectRatio="none"` lets the lines stretch to any section height
 * without scaling their stroke.
 */
export function ColumnRules({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      preserveAspectRatio="none"
      className={cn(
        "text-lime/25 left-gutter pointer-events-none absolute inset-y-0 h-full w-[calc(100%-2*var(--spacing-gutter))] overflow-visible",
        className,
      )}
    >
      <line stroke="currentColor" strokeWidth="0.5" x1="0" x2="0" y1="0" y2="100%" />
      <line
        className="max-md:hidden"
        stroke="currentColor"
        strokeWidth="0.5"
        x1="50%"
        x2="50%"
        y1="0"
        y2="100%"
      />
      <line stroke="currentColor" strokeWidth="0.5" x1="100%" x2="100%" y1="0" y2="100%" />
    </svg>
  );
}
