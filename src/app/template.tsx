import { PageTransition } from "@/components/motion";

/**
 * React remounts a template on every navigation, which is exactly the hook the
 * route curtain needs — no pathname bookkeeping, no AnimatePresence fighting
 * the router for control of the old page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
