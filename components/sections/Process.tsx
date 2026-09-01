"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PROCESS } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";


export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Stage activation is slightly delayed so the physical light reaches the node first
    const scaled = v * (PROCESS.length - 1);
    const idx = Math.min(PROCESS.length - 1, Math.floor(scaled + 0.2)); 
    setStage(idx < 0 ? 0 : idx);
  });

  const percentTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 md:px-16">
        <div className="mx-auto w-full max-w-6xl px-2 md:px-6">
          <SectionHeading
            index="05"
            eyebrow="Production Pipeline"
            title={
              <>
                How an idea becomes{" "}
                <span className="text-gradient">inevitable</span>.
              </>
            }
            intro="Every project runs the same pipeline. One idea travels the line — watch it gain structure, then surface, then content."
          />

          {/* the artifact, evolving */}
          <div className="mt-8 grid items-center gap-6 md:mt-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-1">
              <div className="aspect-[16/10] relative overflow-hidden rounded-xl bg-void">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={reduced ? PROCESS.length - 1 : stage}
                    src={PROCESS[reduced ? PROCESS.length - 1 : stage].artifact}
                    alt={PROCESS[reduced ? PROCESS.length - 1 : stage].label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="label text-ink-muted">
                Stage {String(stage + 1).padStart(2, "0")} · {PROCESS[stage].label}
              </div>
              {PROCESS[stage].question && (
                <p className="mt-2 font-display text-display-xs text-white sm:text-display-sm md:mt-4 md:text-display-md">
                  “{PROCESS[stage].question}”
                </p>
              )}
              <p className="mt-3 max-w-md text-body-xs text-ink-muted md:mt-4 md:text-body-sm">
                {PROCESS[stage].blurb}
              </p>
              {PROCESS[stage].output && (
                <div className="mt-4 flex items-center gap-3 md:mt-6">
                  <span className="label text-ink-muted/70">
                    Leaves with
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-body-xs"
                    style={{
                      background: "rgb(var(--accent) / 0.12)",
                      color: "rgb(var(--accent))",
                    }}
                  >
                    {PROCESS[stage].output}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* responsive pipeline - Now horizontal on ALL devices */}
          <div className="relative mt-12 md:mt-16 pb-6 md:pb-0">
            
            {/* Desktop & Mobile Track (Horizontal) */}
            <div className="absolute left-0 right-0 top-[15px] h-px bg-white/12 md:top-[23px]" />
            <motion.div
              className="absolute left-0 right-0 top-[15px] h-px origin-left md:top-[23px]"
              style={{
                scaleX: reduced ? 1 : scaleTransform,
                background: "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2)))",
                boxShadow: "0 0 8px rgb(var(--accent) / 0.7)",
              }}
            />
            {!reduced && (
              <motion.div
                className="absolute top-[15px] z-10 h-3 w-3 md:h-4 md:w-4 -translate-x-1/2 -translate-y-1/2 rounded-full md:top-[23px]"
                style={{
                  left: percentTransform,
                  background: "#fff",
                  boxShadow: "0 0 24px rgb(var(--accent)), 0 0 8px #fff",
                }}
              />
            )}

            {/* stages layout */}
            <div className="relative flex flex-row justify-between">
              {PROCESS.map((s, i) => {
                const activeStage = i <= stage || reduced;
                return (
                  <div key={s.key} className="relative z-10 flex flex-col items-center gap-2 md:gap-4 md:text-center">
                    <div
                      className={cn(
                        "grid h-8 w-8 md:h-12 md:w-12 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        activeStage
                          ? "border-transparent"
                          : "border-white/15 bg-void-800",
                      )}
                      style={
                        activeStage
                          ? {
                              background:
                                "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-2)))",
                              boxShadow: "0 0 14px rgb(var(--accent) / 0.4)",
                            }
                          : { background: "#05060b" }
                      }
                    >
                      <span
                        className={cn(
                          "tnum font-mono text-[10px] md:text-label-sm font-medium tracking-normal",
                          activeStage ? "text-void" : "text-ink-muted",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    
                    {/* Hide labels on mobile to fit the 7 nodes horizontally */}
                    <div className="hidden pt-2 md:block">
                      <div
                        className={cn(
                          "font-display text-body-sm font-semibold transition-all duration-500 ease-lab lg:text-body",
                          activeStage ? "text-white" : "text-ink-muted",
                        )}
                      >
                        {s.label}
                      </div>
                      <div
                        className={cn(
                          "mt-1 max-w-[15ch] text-body-xs transition-all duration-700",
                          activeStage ? "text-ink-muted opacity-100" : "opacity-0",
                        )}
                      >
                        {s.blurb}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

