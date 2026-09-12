import { cn } from "@/lib/utils/cn";

const fieldStyles =
  "border-border-strong bg-surface placeholder:text-muted-light w-full border px-4 py-3 text-sm transition-colors outline-none focus:border-navy-950 disabled:opacity-50 aria-invalid:border-danger";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldStyles, "min-h-36 resize-y", className)} {...props} />;
}

export { fieldStyles };
