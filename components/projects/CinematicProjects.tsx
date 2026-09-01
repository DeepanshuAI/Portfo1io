"use client";

import { useRef, useEffect } from "react";
import { useScroll, motion, useTransform, useMotionValueEvent } from "framer-motion";
import ProjectScene1 from "./ProjectScene1";
import ProjectScene2 from "./ProjectScene2";
import ProjectScene3 from "./ProjectScene3";
import { PROJECTS } from "@/lib/site";
import { useSection } from "@/lib/section-context";

export default function CinematicProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { active: sectionActive } = useSection();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Project 1: 0.0 to 0.33
  // Transition 1->2: 0.33 to 0.4
  // Project 2: 0.4 to 0.66
  // Transition 2->3: 0.66 to 0.73
  // Project 3: 0.73 to 1.0

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Optionally update root colors for a subtle background tint
    const root = document.documentElement;
    if (sectionActive === "featured-systems" || sectionActive === "hero") {
      if (latest < 0.33) {
        root.style.setProperty("--accent", PROJECTS[0].accent);
        root.style.setProperty("--accent-2", PROJECTS[0].accent2);
      } else if (latest < 0.66) {
        root.style.setProperty("--accent", PROJECTS[1].accent);
        root.style.setProperty("--accent-2", PROJECTS[1].accent2);
      } else {
        root.style.setProperty("--accent", PROJECTS[2].accent);
        root.style.setProperty("--accent-2", PROJECTS[2].accent2);
      }
    }
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-transparent" style={{ overflowAnchor: "none" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Subtle Environmental Background */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(var(--accent)), transparent 60%)`
          }}
        />

        <ProjectScene1 progress={scrollYProgress} project={PROJECTS[0]} />
        <ProjectScene2 progress={scrollYProgress} project={PROJECTS[1]} />
        <ProjectScene3 progress={scrollYProgress} project={PROJECTS[2]} />
      </div>
    </div>
  );
}


