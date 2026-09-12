import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <main className="bg-canvas flex min-h-svh items-center">
      <Container>
        <p className="text-lime-text text-[10px] tracking-[0.2em] uppercase">404</p>
        <h1 className="font-display mt-5 max-w-2xl text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl">
          That page is not here.
        </h1>
        <p className="text-muted mt-6 max-w-md">
          It may have moved, or the link may be wrong. The projects are a good place to pick back
          up.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={ROUTES.projects}>View projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.home}>Back home</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
