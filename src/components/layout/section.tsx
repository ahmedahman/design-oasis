import { cn } from "@/lib/utils/cn";

import { Container } from "./container";
import { ColumnRules } from "@/components/chrome/column-rules";

/**
 * Vertical rhythm for the site. Sections declare their ground rather than each
 * page re-deciding, and opt into the column rules with a prop.
 */
export function Section({
  className,
  tone = "canvas",
  rules = false,
  bleed = false,
  children,
  containerClassName,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "canvas" | "surface" | "muted" | "dark";
  /** Draw the vertical hairlines behind the content. */
  rules?: boolean;
  /** Skip the container — for full-bleed media. */
  bleed?: boolean;
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
      className={cn("relative py-20 md:py-32", toneClass)}
      data-cursor-theme={tone === "dark" ? "dark" : undefined}
      {...props}
    >
      {rules && <ColumnRules />}
      {bleed ? (
        <div className={cn("relative", className, containerClassName)}>{children}</div>
      ) : (
        <Container className={cn("relative", containerClassName)}>
          <div className={className}>{children}</div>
        </Container>
      )}
    </section>
  );
}
