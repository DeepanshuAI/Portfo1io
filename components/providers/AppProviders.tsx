"use client";

import { MotionConfig } from "framer-motion";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { SectionProvider } from "@/lib/section-context";
import { EASE, DUR } from "@/lib/motion";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /**
     * `reducedMotion="user"` is the important part: the CSS media query in
     * globals.css can only neutralise CSS transitions, so without this every
     * Framer translate/scale still played for visitors who asked the OS for
     * less motion. Framer now strips transform animations and keeps opacity,
     * globally, without each component testing for it.
     *
     * `transition` sets the house curve as the default, so a component that
     * omits one still moves like the rest of the site.
     */
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DUR.base, ease: EASE }}
    >
      <SmoothScrollProvider>
        <SectionProvider>{children}</SectionProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
