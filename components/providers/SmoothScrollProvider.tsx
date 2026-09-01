"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger.
 * Skipped entirely when the user prefers reduced motion (native scroll).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let lenis: import("lenis").default | undefined;
    let killed = false;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;

      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });

      document.documentElement.classList.add("lenis");

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      // Let pinned sections settle, then recalc.
      ScrollTrigger.refresh();

      // expose for optional programmatic scrolling (nav)
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    })();

    return () => {
      killed = true;
      document.documentElement.classList.remove("lenis");
      lenis?.destroy();
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
    };
  }, [reduced]);

  return <>{children}</>;
}
