import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Squared rather than pill — this is architecture, not a consumer app. The
 * radius comes from the token scale, which is deliberately tight.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy-950 text-white hover:bg-navy-900",
        accent: "bg-lime text-navy-950 hover:bg-lime-dark",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-navy-950 hover:bg-surface-muted",
        /* Over dark imagery and navy bands. */
        onDark: "bg-white text-navy-950 hover:bg-lime hover:text-navy-950",
        onDarkOutline: "border border-white/30 text-white hover:border-lime hover:text-lime",
        ghost: "text-foreground hover:bg-surface-muted",
        link: "text-foreground underline underline-offset-4 hover:text-lime-text",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-wide uppercase",
        md: "h-11 px-6 text-xs tracking-wide uppercase",
        lg: "h-14 px-9 text-sm tracking-wide uppercase",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
