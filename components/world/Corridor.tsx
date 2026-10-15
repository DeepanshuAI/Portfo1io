"use client";

import { useEffect, useRef } from "react";
import { useSection } from "@/lib/section-context";
import { usePrefersReducedMotion } from "@/lib/hooks";

// Each section quietly retints the whole world.
const ACCENTS: Record<string, [string, string]> = {
  hero: ["79 214 255", "139 123 255"],
  "featured-systems": ["139 123 255", "79 214 255"],
  "engineering-core": ["79 214 255", "255 106 213"],
  "design-thinking": ["180 210 255", "139 123 255"],
  process: ["93 242 192", "79 214 255"],
  playground: ["255 106 213", "139 123 255"],
  contact: ["93 242 192", "79 214 255"],
};

export default function Corridor() {
  const { active, progress } = useSection();
  const reduced = usePrefersReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const ceilRef = useRef<HTMLDivElement>(null);

  // Retint the corridor as sections change
  useEffect(() => {
    const pair = ACCENTS[active];
    if (!pair) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", pair[0]);
    root.style.setProperty("--accent-2", pair[1]);
  }, [active]);

  // Parallax the corridor floor/ceiling by scroll progress (transform only).
  useEffect(() => {
    if (reduced) return;
    const shift = (progress * 100) % 100;
    if (gridRef.current)
      gridRef.current.style.transform = `translateY(${shift}px)`;
  }, [progress, reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* deep base wash */}
      <div
        className="absolute inset-0 bg-[#07080a]"
      />

      {/* Blueprint Grid Overlay */}
      <div 
        ref={gridRef}
        className="absolute -inset-[200px] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }}
      />

      {/* Engineering HUD lines */}
      <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      
      {/* Subtle corner crosshairs */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20" />

      {/* Center Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] border border-white/5 rounded-[100%] opacity-30" />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
