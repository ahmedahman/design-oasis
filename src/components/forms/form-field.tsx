"use client";

import { useId } from "react";

import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

/**
 * Label, control and error in one place, so no form re-assembles the three.
 * Errors are wired through `aria-describedby` and announced politely.
 */
export function FormField({
  label,
  error,
  required,
  as = "input",
  className,
  ...props
}: React.ComponentProps<"input"> &
  React.ComponentProps<"textarea"> & {
    label: string;
    error?: string;
    as?: "input" | "textarea";
  }) {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = as === "textarea" ? Textarea : Input;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[10px] tracking-[0.16em] uppercase">
        {label}
        {required && (
          <span className="text-danger ml-1" aria-hidden>
            *
          </span>
        )}
      </label>
      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
