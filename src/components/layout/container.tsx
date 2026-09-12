import { cn } from "@/lib/utils/cn";

/** The single horizontal measure. Gutter comes from the token, never a literal. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-gutter mx-auto w-full max-w-[1600px]", className)} {...props} />;
}
