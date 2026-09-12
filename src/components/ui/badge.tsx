import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-muted",
        outline: "border border-border-strong text-muted",
        accent: "bg-lime-wash text-lime-dark",
        dark: "bg-navy-950 text-white",
        onDark: "border border-white/25 text-white/80",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
