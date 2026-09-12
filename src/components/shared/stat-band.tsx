import { Reveal, RevealItem } from "@/components/motion";
import { STATS } from "@/lib/config/site";

/** Proof points, stated plainly. No adjectives doing the work of numbers. */
export function StatBand() {
  return (
    <Reveal stagger className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
      {STATS.map((stat) => (
        <RevealItem key={stat.label} className="border-lime/40 border-t pt-5">
          <p className="font-display text-5xl leading-none tracking-tight md:text-6xl">
            {stat.value}
          </p>
          <p className="text-muted mt-3 text-sm">{stat.label}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}
