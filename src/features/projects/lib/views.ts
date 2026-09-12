export const PROJECT_VIEWS = ["slider", "grid", "list"] as const;
export type ProjectView = (typeof PROJECT_VIEWS)[number];

export const DEFAULT_VIEW: ProjectView = "grid";

/** Narrow an untrusted `?view=` value to something we can render. */
export function parseView(value: string | undefined): ProjectView {
  return PROJECT_VIEWS.includes(value as ProjectView) ? (value as ProjectView) : DEFAULT_VIEW;
}
