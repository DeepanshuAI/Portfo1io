"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [showName, setShowName] = useState(false);
  const [exit, setExit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (reduced) {
      setExit(true);
      return;
    }

    // Timeline sequence
    const t1 = setTimeout(() => setStage(1), 180);
    const t2 = setTimeout(() => setShowName(true), 280);
    const t3 = setTimeout(() => setStage(2), 480);
    const t4 = setTimeout(() => setExit(true), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [reduced]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Split Background Curtains */}
          <motion.div
            className="absolute inset-x-0 top-0 bottom-1/2 bg-[#05060b]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 bottom-0 bg-[#05060b]"
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Loader Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center w-full h-full"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Center Geometric Core */}
            <div className="relative flex items-center justify-center w-32 h-32 mb-16">
              {/* Central Point */}
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />

              {/* Forming Geometry (Diamond) */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
                <motion.rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, rotate: 45, opacity: 0, originX: "50%", originY: "50%" }}
                  animate={{ pathLength: 1, rotate: 45, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                />
                
                {/* Energy Traces (Dashed Circle) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="rgb(var(--accent))"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                  initial={{ rotate: -90, opacity: 0, originX: "50%", originY: "50%" }}
                  animate={{ rotate: 90, opacity: [0, 0.4, 0.1] }}
                  transition={{ duration: 2, ease: "linear", delay: 0.5 }}
                />
                
                {/* Coordinate Markers */}
                <motion.path
                  d="M 50 10 L 50 15 M 50 85 L 50 90 M 10 50 L 15 50 M 85 50 L 90 50"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </svg>

              {/* Ready Pulse */}
              <AnimatePresence>
                {stage === 2 && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[rgb(var(--accent))]"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: [0, 0.15, 0] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Progress Section */}
            <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center w-[200px] md:w-[280px]">
              
              {/* Typography Reveal */}
              <div className="h-16 flex flex-col items-center justify-end overflow-hidden mb-6">
                <AnimatePresence>
                  {showName && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="flex flex-col items-center"
                    >
                      <span className="font-display text-display-xs md:text-display-sm tracking-widest text-white whitespace-nowrap">
                        DEEPANSHU YADAV
                      </span>
                      <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[rgb(var(--accent))] mt-2">
                        JUNIOR FRONTEND · FULL-STACK
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress Line */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-4">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>

              {/* Status Microcopy */}
              <div className="h-4 overflow-hidden relative w-full text-center">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.span
                      key="0"
                      className="block font-mono text-[9px] tracking-widest text-white/40 uppercase"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      INITIALIZING...
                    </motion.span>
                  )}
                  {stage === 1 && (
                    <motion.span
                      key="1"
                      className="block font-mono text-[9px] tracking-widest text-white/60 uppercase"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      BUILDING SYSTEM
                    </motion.span>
                  )}
                  {stage === 2 && (
                    <motion.span
                      key="2"
                      className="block font-mono text-[9px] tracking-widest text-[rgb(var(--accent))] uppercase"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      READY
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
