"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Evidence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evidence" className="section-y relative z-10 flex min-h-[80vh] flex-col items-center justify-center">
      <div className="shell w-full text-center">
        <SectionHeading
          index="05"
          eyebrow="Evidence"
          title={
            <>
              Technical <span className="text-gradient">Proof</span>
            </>
          }
          intro="The raw metrics behind the visual portfolio. Engineering is grounded in reality."
          align="center"
        />

        <div ref={ref} className="mx-auto mt-24 max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <span className="text-5xl md:text-7xl font-mono tracking-tighter text-gradient">3</span>
            <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase tracking-widest">Enterprise Projects</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <span className="text-5xl md:text-7xl font-mono tracking-tighter text-gradient">24</span>
            <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase tracking-widest">Technologies Mastered</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <span className="text-5xl md:text-7xl font-mono tracking-tighter text-gradient">500<span className="text-3xl">+</span></span>
            <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase tracking-widest">Commits (YTD)</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <span className="text-5xl md:text-7xl font-mono tracking-tighter text-gradient">3</span>
            <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase tracking-widest">Years Experience</span>
          </motion.div>

        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 1.0 }}
          className="mt-32 text-ink-muted/40 text-[10px] md:text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-3"
        >
          <span className="w-12 h-px bg-white/10" />
          Verified via GitHub & Production Deployments
          <span className="w-12 h-px bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
