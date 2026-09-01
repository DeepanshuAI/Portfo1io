"use client";

import { motion } from "framer-motion";
import { fadeUp, IN_VIEW } from "@/lib/motion";

/**
 * Scroll entrance. Delay comes from `lib/motion`'s capped stagger, so a
 * 12-item grid doesn't leave its last card a second behind the first.
 */
export default function Reveal({
  children,
  i = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
