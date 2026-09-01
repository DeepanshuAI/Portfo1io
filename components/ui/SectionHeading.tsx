"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, IN_VIEW } from "@/lib/motion";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: DUR.base, ease: EASE }}
        className="flex items-center gap-3"
      >
        {index && (
          <span className="label tnum text-[rgb(var(--accent))]">{index}</span>
        )}
        {/* a rule instead of a second gap: the index reads as a coordinate,
            not as a stray number floating beside the label */}
        {index && (
          <span
            aria-hidden
            className="h-px w-6 shrink-0"
            style={{
              background:
                "linear-gradient(90deg, rgb(var(--accent) / 0.6), transparent)",
            }}
          />
        )}
        <span className="eyebrow label-tight">{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: DUR.slow, delay: 0.05, ease: EASE }}
        className={cn(
          "font-display text-display-fluid font-semibold",
          align === "center" ? "max-w-4xl" : "max-w-3xl",
        )}
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: DUR.slow, delay: 0.12, ease: EASE }}
          className={cn(
            // ~64 characters per line at this size — inside the readable band
            "max-w-[54ch] text-body text-ink-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
