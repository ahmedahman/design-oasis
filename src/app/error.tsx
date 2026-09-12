"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="bg-canvas flex min-h-svh items-center">
      <Container>
        <p className="text-lime-dark text-[10px] tracking-[0.2em] uppercase">Something broke</p>
        <h1 className="font-display mt-5 max-w-2xl text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl">
          That did not load.
        </h1>
        <p className="text-muted mt-6 max-w-md">
          The page hit an error on its way to you. Trying again usually clears it.
        </p>
        <Button onClick={reset} className="mt-10">
          Try again
        </Button>
      </Container>
    </main>
  );
}
