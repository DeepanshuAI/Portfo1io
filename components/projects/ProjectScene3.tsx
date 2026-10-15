"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";
import Image from "next/image";

export default function ProjectScene3({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  // Scene 3 occupies 0.66 to 1.0 of the total scroll
  // Entrance: 0.70 to 0.78
  // Hold: 0.78 to 0.95
  // Exit: 0.95 to 1.0

  const opacity = useTransform(progress, [0.64, 0.72, 0.95, 1.0], [0, 1, 1, 0.5]);
  const scale = useTransform(progress, [0.64, 0.72], [0.9, 1]);
  const sceneY = useTransform(progress, [0.64, 0.72], [100, 0]);
  const clipPath = useTransform(
    progress,
    [0.64, 0.75],
    [
      "circle(0% at 50% 50%)",
      "circle(100% at 50% 50%)"
    ]
  );
  
  // Subtle movement for the image
  const imageY = useTransform(progress, [0.68, 1.0], [40, -20]);
  const imageScale = useTransform(progress, [0.68, 1.0], [0.95, 1.05]);
  
  // Text reveal effects
  const leftTextY = useTransform(progress, [0.68, 0.78, 0.95, 1.0], [30, 0, 0, -30]);
  const rightTextY = useTransform(progress, [0.68, 0.78, 0.95, 1.0], [50, 0, 0, -50]);

  return (
    <motion.div 
      style={{ opacity, scale, y: sceneY, clipPath }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-16 relative">
        
        {/* CENTER: PROJECT VISUAL */}
        <motion.div 
          style={{ y: imageY, scale: imageScale }}
          className="w-full max-w-3xl relative aspect-[16/9] z-20 pointer-events-auto mt-12 md:mt-24 mx-auto"
        >
          {/* Subtle Supporting Visual 1: Atmospheric Glow */}
          <div 
            className="absolute -inset-16 opacity-10 blur-[40px] rounded-full"
            style={{ backgroundColor: `rgb(${project.accent})` }}
          />
          
          {/* Subtle Supporting Visual 2: Flowing Market Lines */}
          <div className="absolute top-1/4 -right-12 w-48 h-32 opacity-20 pointer-events-none -z-10">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full stroke-white fill-none stroke-[0.2]">
              <path d="M0,40 Q20,30 40,35 T80,20 T100,5" />
              <path d="M0,45 Q20,35 40,40 T80,25 T100,10" className="opacity-50" />
            </svg>
          </div>

          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className={`object-${project.imageMode === "cover" ? "cover" : "contain"} p-${project.imageMode === "object" ? "8" : "0"} bg-black/40 backdrop-blur-sm`}
              priority
            />
          </div>
        </motion.div>

        {/* LEFT & RIGHT TEXT BLOCKS (Absolute positioned for dramatic effect, or flex row on large screens) */}
        <div className="absolute top-1/4 md:top-1/3 left-6 md:left-12 lg:left-24 w-64 md:w-80 z-30 pointer-events-auto">
          <motion.div style={{ y: leftTextY }} className="flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-sm tracking-widest text-white/50">03</span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: `rgb(${project.accent})` }}>
              {project.category}
            </span>
            <p className="text-sm md:text-base text-ink/80 leading-relaxed">
              {project.summary}
            </p>
          </motion.div>
        </div>

        <div className="absolute top-1/4 md:top-1/3 right-6 md:right-12 lg:right-24 w-64 md:w-80 z-30 pointer-events-auto">
          <motion.div style={{ y: rightTextY }} className="flex flex-col items-end text-right">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-[1.1] drop-shadow-lg mb-6">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            
            <div className="flex flex-wrap justify-end gap-2 mb-8">
              {project.stack.map(tech => (
                <span key={tech} className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-white/60 bg-white/5">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-end gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest">
              {project.href && <a aria-label={`View ${project.title} live demo`} href={project.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Live demo <span aria-hidden="true">↗</span></a>}
              {project.repo && <a aria-label={`View ${project.title} source code`} href={project.repo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Source code <span aria-hidden="true">↗</span></a>}
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
