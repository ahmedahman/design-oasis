"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { TRANSITION } from "@/lib/config/motion";
import { SECTOR_LABELS } from "@/lib/config/sectors";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/types/project";

/**
 * The three layouts the morph moves between. Each renders the SAME projects in
 * the same order, and each image container carries `layoutId={project.id}` —
 * that shared id is what lets Motion animate one element into its new position
 * rather than swapping one DOM tree for another.
 *
 * Everything visual per layout lives here so the parent stays a state machine.
 */

const LAYOUT_TRANSITION = TRANSITION.morph;

function Meta({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-6", className)}>
      <div>
        <h3 className="font-display text-2xl leading-tight tracking-tight">{project.title}</h3>
        <p className="text-muted mt-1.5 text-sm">{project.location}</p>
      </div>
      <p className="text-muted-light shrink-0 pt-1 text-[10px] tracking-[0.16em] uppercase">
        {SECTOR_LABELS[project.sector]}
      </p>
    </div>
  );
}

/** The shared morphing image. Identical markup in all three views. */
function MorphImage({
  project,
  className,
  sizes,
  priority,
}: {
  project: Project;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      layoutId={`project-image-${project.id}`}
      transition={LAYOUT_TRANSITION}
      className={cn("relative overflow-hidden", className)}
    >
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </motion.div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div key={project.id} layout transition={LAYOUT_TRANSITION}>
          <Link
            href={ROUTES.project(project.slug)}
            className="group block"
            data-cursor-label="View project"
          >
            <MorphImage
              project={project}
              priority={i < 3}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "w-full",
                project.cover.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
              )}
            />
            <Meta project={project} className="mt-5" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="border-border border-t">
      {projects.map((project) => (
        <motion.div key={project.id} layout transition={LAYOUT_TRANSITION}>
          <Link
            href={ROUTES.project(project.slug)}
            className="border-border group relative flex items-center gap-8 border-b py-7"
            data-cursor-label="View project"
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* The thumbnail is the same element as the grid tile — it simply
                shrinks into the row. */}
            <MorphImage
              project={project}
              sizes="140px"
              className="h-20 w-28 shrink-0 md:h-24 md:w-36"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-display truncate text-3xl leading-tight tracking-tight md:text-4xl">
                {project.title}
              </h3>
            </div>

            <p className="text-muted hidden shrink-0 text-sm md:block">{project.location}</p>
            <p className="text-muted-light w-40 shrink-0 text-right text-[10px] tracking-[0.16em] uppercase max-lg:hidden">
              {SECTOR_LABELS[project.sector]}
            </p>
            <p className="text-muted-light shrink-0 text-sm tabular-nums">{project.year}</p>

            <span
              aria-hidden
              className={cn(
                "bg-lime absolute bottom-0 left-0 h-px transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                hovered === project.id ? "w-full" : "w-0",
              )}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function ProjectSlider({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      layout
      transition={LAYOUT_TRANSITION}
      className="-mx-gutter [scrollbar-width:none] overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
      data-cursor-drag
      data-cursor-label="Drag"
    >
      <div className="px-gutter flex w-max gap-6">
        {projects.map((project, i) => (
          <Link
            key={project.id}
            href={ROUTES.project(project.slug)}
            className="group block w-[78vw] shrink-0 md:w-[52vw] lg:w-[38vw]"
            data-cursor-label="View project"
          >
            <MorphImage
              project={project}
              priority={i === 0}
              sizes="(max-width: 768px) 78vw, (max-width: 1024px) 52vw, 38vw"
              className="aspect-[16/10] w-full"
            />
            <Meta project={project} className="mt-5" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
