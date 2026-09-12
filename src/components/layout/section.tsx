import { ColumnRules } from "@/components/chrome/column-rules";
import { cn } from "@/lib/utils/cn";

import { Container } from "./container";

/**
 * Vertical rhythm for the site. Sections declare their ground rather than each
 * page re-deciding, and opt into the column rules with a prop.
 *
 * `className` applies to the <section> itself, as it would on any component, so
 * a page can override the default padding. Use `contentClassName` to reach the
 * inner content block.
 */
export function Section({
  className,
  contentClassName,
  containerClassName,
  tone = "canvas",
  rules = false,
  bleed = false,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "canvas" | "surface" | "muted" | "dark";
  /** Draw the vertical hairlines behind the content. */
  rules?: boolean;
  /** Skip the container — for full-bleed media. */
  bleed?: boolean;
  contentClassName?: string;
  containerClassName?: string;
}) {
  const toneClass = {
    canvas: "bg-canvas",
    surface: "bg-surface",
    muted: "bg-surface-muted",
    dark: "bg-dark text-light",
  }[tone];

  return (
    <section
      className={cn("relative py-20 md:py-32", toneClass, className)}
      data-cursor-theme={tone === "dark" ? "dark" : undefined}
      {...props}
    >
      {rules && <ColumnRules />}
      {bleed ? (
        <div className={cn("relative", containerClassName, contentClassName)}>{children}</div>
      ) : (
        <Container className={cn("relative", containerClassName)}>
          <div className={contentClassName}>{children}</div>
        </Container>
      )}
    </section>
  );
}
