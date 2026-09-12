import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string | string[];
  /** Extra right-column content, below the lede. A numbered index, counts, a CTA. */
  aside?: React.ReactNode;
  className?: string;
  /** The page-top instance is the document's h1; sections below it are h2. */
  as?: "h1" | "h2";
  layout?: "stacked" | "split" | "wide";
};

/**
 * Eyebrow + title + optional lede. One rhythm for every section on the site.
 *
 * Three shapes, because the container is 1600px and a single left column strands
 * half of it:
 *
 * - `stacked` — everything in one column. The default, because this component is
 *   sometimes passed *into* a grid column already (home `#landowners`, partner
 *   `#submit`), and splitting there would nest a split inside a split.
 * - `split`   — title left, lede and `aside` right. The usual choice.
 * - `wide`    — one column, but the title runs much wider at a larger size. For
 *   short declarative titles carrying no lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  aside,
  className,
  as: Heading = "h2",
  layout = "stacked",
}: SectionHeadingProps) {
  const eyebrowEl = eyebrow ? (
    <p className="text-lime-text mb-5 text-[10px] tracking-[0.2em] uppercase">{eyebrow}</p>
  ) : null;

  /* An array renders as consecutive paragraphs. The home page needs two — what
     the firm is, then how it works — and a lede is a <p>, so it cannot carry
     them itself. */
  const paragraphs = lede ? (Array.isArray(lede) ? lede : [lede]) : [];
  const ledeEl = paragraphs.length ? (
    <div className="text-muted flex flex-col gap-5 text-lg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  ) : null;

  if (layout === "split") {
    return (
      <Reveal
        className={cn(
          "grid gap-x-10 gap-y-8 lg:grid-cols-12",
          /* A lede alone is shorter than its title, so bottom-aligning seats the
             two blocks on one line — top-aligning a single sentence against a
             three-line title is what makes these layouts look accidental.
             An aside makes the right column the taller of the two, and bottom
             -aligning then drags the title down and strands the space above it,
             so those top-align instead. */
          aside ? "lg:items-start" : "lg:items-end",
          className,
        )}
      >
        <div className="lg:col-span-7">
          {eyebrowEl}
          <Heading className="font-display text-4xl leading-[1.08] tracking-tight text-balance md:text-6xl">
            {title}
          </Heading>
        </div>

        {(lede || aside) && (
          <div className="lg:col-span-5 lg:col-start-8">
            {ledeEl}
            {aside && <div className={cn(ledeEl && "mt-8")}>{aside}</div>}
          </div>
        )}
      </Reveal>
    );
  }

  if (layout === "wide") {
    return (
      <Reveal className={className}>
        {eyebrowEl}
        <Heading className="font-display max-w-[68rem] text-5xl leading-[1.04] tracking-tight text-balance md:text-7xl">
          {title}
        </Heading>
        {ledeEl && <div className="mt-8 max-w-xl">{ledeEl}</div>}
        {aside && <div className="mt-10">{aside}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className={className}>
      {eyebrowEl}
      <Heading className="font-display max-w-3xl text-4xl leading-[1.08] tracking-tight text-balance md:text-6xl">
        {title}
      </Heading>
      {ledeEl && <div className="mt-6 max-w-xl">{ledeEl}</div>}
      {aside && <div className="mt-10">{aside}</div>}
    </Reveal>
  );
}
