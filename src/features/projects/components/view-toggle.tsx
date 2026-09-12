"use client";

import { motion } from "motion/react";

import { TRANSITION } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

import { PROJECT_VIEWS, type ProjectView } from "../lib/views";

/** The active pill is itself a layout morph, so it slides between options. */
export function ViewToggle({
  view,
  onChange,
}: {
  view: ProjectView;
  onChange: (next: ProjectView) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Project layout"
      className="border-border bg-surface inline-flex items-center gap-1 rounded-sm border p-1"
    >
      {PROJECT_VIEWS.map((option) => {
        const active = option === view;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={cn(
              "relative rounded-sm px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-colors",
              active ? "text-white" : "text-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="view-toggle-active"
                className="bg-navy-950 absolute inset-0 rounded-sm"
                transition={TRANSITION.morph}
              />
            )}
            <span className="relative">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
