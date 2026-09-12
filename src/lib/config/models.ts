import type { DevelopmentModel } from "@/types/project";

/** Labels for the engagement models. Rendered only through these. */
export const DEVELOPMENT_MODELS: Record<DevelopmentModel, { label: string; full: string }> = {
  JV: { label: "JV", full: "Joint Venture" },
  BOT: { label: "BOT", full: "Build–Operate–Transfer" },
  DESIGN_BUILD: { label: "Design & Build", full: "Design & Build (turnkey)" },
  ADVISORY: { label: "Advisory", full: "Development advisory" },
  DESIGN: { label: "Design", full: "Architectural design" },
};

export const PROJECT_STATUS_LABELS = {
  COMPLETED: "Completed",
  IN_PROGRESS: "Under construction",
  IN_DESIGN: "In design",
} as const;
