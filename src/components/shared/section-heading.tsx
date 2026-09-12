import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils/cn";

/** Eyebrow + title + optional lede. One rhythm for every section on the site. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
  align?: "left" | "center";
  /** The page-top instance is the document's h1; sections below it are h2. */
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className="text-lime-dark mb-5 text-[10px] tracking-[0.2em] uppercase">{eyebrow}</p>
      )}
      <Heading className="font-display max-w-3xl text-4xl leading-[1.08] tracking-tight text-balance md:text-6xl">
        {title}
      </Heading>
      {lede && (
        <p className={cn("text-muted mt-6 max-w-xl text-lg", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
