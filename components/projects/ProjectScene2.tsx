"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";
import Image from "next/image";

export default function ProjectScene2({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  // Scene 2 occupies 0.33 to 0.66 of the total scroll
  // Entrance: 0.35 to 0.43
  // Hold: 0.43 to 0.58
  // Exit: 0.58 to 0.66

  const opacity = useTransform(progress, [0.3, 0.38, 0.6, 0.66], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.3, 0.38, 0.6, 0.66], [0.9, 1, 1, 0.9]);
  const sceneY = useTransform(progress, [0.3, 0.38, 0.6, 0.66], [100, 0, 0, -100]);
  const clipPath = useTransform(
    progress,
    [0.3, 0.38, 0.6, 0.66],
    [
      "inset(50% 0 50% 0)",
      "inset(0% 0 0% 0)",
      "inset(0% 0 0% 0)",
      "inset(0 50% 0 50%)"
    ]
  );
  
  // Subtle movement for the image
  const imageY = useTransform(progress, [0.35, 0.66], [20, -20]);
  const imageScale = useTransform(progress, [0.35, 0.66], [0.98, 1.02]);
  
  // Text reveal effects
  const textY = useTransform(progress, [0.35, 0.43, 0.58, 0.64], [30, 0, 0, -30]);

  return (
    <motion.div 
      style={{ opacity, scale, y: sceneY, clipPath }}
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 h-full pt-16">
        
        {/* LEFT: PROJECT VISUAL */}
        <motion.div 
          style={{ y: imageY, scale: imageScale }}
          className="w-full md:w-7/12 relative aspect-[16/10] z-20 pointer-events-auto"
        >
          {/* Subtle Supporting Visual 1: Atmospheric Glow */}
          <div 
            className="absolute -inset-10 opacity-10 blur-[40px] rounded-full"
            style={{ backgroundColor: `rgb(${project.accent})` }}
          />
          
          {/* Subtle Supporting Visual 2: Floating geometric knowledge symbols (abstract squares) */}
          <div className="absolute -left-8 top-1/4 w-16 h-16 border border-white/20 rotate-12 opacity-30 pointer-events-none" />
          <div className="absolute -bottom-6 right-1/4 w-10 h-10 border border-white/10 rotate-45 opacity-20 pointer-events-none" />

          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* RIGHT: TEXT BLOCK */}
        <motion.div 
          style={{ y: textY }}
          className="w-full md:w-5/12 flex flex-col items-start text-left z-10 pointer-events-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm tracking-widest text-white/50">02</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: `rgb(${project.accent})` }}>
              {project.category}
            </span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.1] drop-shadow-md">
            {project.title}
          </h2>
          
          <p className="mt-6 text-base md:text-lg text-ink/80 leading-relaxed max-w-lg">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span key={tech} className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-white/60 bg-white/5">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest">
            {project.href && <a aria-label={`View ${project.title} live demo`} href={project.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Live demo <span aria-hidden="true">↗</span></a>}
            {project.repo && <a aria-label={`View ${project.title} source code`} href={project.repo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Source code <span aria-hidden="true">↗</span></a>}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
