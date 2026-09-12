import Image from "next/image";
import Link from "next/link";

import { ImageReveal } from "@/components/motion";
import { SECTOR_LABELS } from "@/lib/config/sectors";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/types/project";

/**
 * The one project card. Used by the home page, the projects grid and the
 * "next project" footer — if a new surface needs a project tile, it uses this.
 */
export function ProjectCard({
  project,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={ROUTES.project(project.slug)}
      className={cn("group block", className)}
      data-cursor-label="View project"
    >
      <ImageReveal
        className={cn(
          "relative w-full overflow-hidden",
          project.cover.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="bg-card-scrim absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </ImageReveal>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl leading-tight tracking-tight">{project.title}</h3>
          <p className="text-muted mt-1.5 text-sm">{project.location}</p>
        </div>
        <p className="text-muted-light shrink-0 pt-1 text-[10px] tracking-[0.16em] uppercase">
          {SECTOR_LABELS[project.sector]}
        </p>
      </div>
    </Link>
  );
}
