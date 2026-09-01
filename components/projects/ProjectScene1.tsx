"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";
import Image from "next/image";

export default function ProjectScene1({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  // Scene 1 occupies 0.0 to 0.33 of the total scroll
  // Entrance: 0.0 to 0.05
  // Hold: 0.05 to 0.25
  // Exit: 0.25 to 0.33

  const opacity = useTransform(progress, [0, 0.25, 0.3], [1, 1, 0]);
  const scale = useTransform(progress, [0.25, 0.33], [1, 0.9]);
  const sceneY = useTransform(progress, [0.25, 0.33], [0, -100]);
  
  // Subtle movement for the image
  const imageY = useTransform(progress, [0, 0.3], [0, -20]);
  const imageScale = useTransform(progress, [0, 0.3], [1, 1.02]);
  
  // Text reveal effects
  const textY = useTransform(progress, [0, 0.25, 0.3], [0, 0, -30]);

  return (
    <motion.div 
      style={{ opacity, scale, y: sceneY }}
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24 h-full pt-16">
        
        {/* LEFT: TEXT BLOCK */}
        <motion.div 
          style={{ y: textY }}
          className="w-full md:w-5/12 flex flex-col items-start text-left z-10 pointer-events-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm tracking-widest text-white/50">01</span>
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

          {(project.repo || project.href) && (
            <a 
              href={project.repo || project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-white/80 transition-colors"
            >
              <span style={{ color: `rgb(${project.accent})` }}>Explore Project</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          )}
        </motion.div>

        {/* RIGHT: PROJECT VISUAL */}
        <motion.div 
          style={{ y: imageY, scale: imageScale }}
          className="w-full md:w-7/12 relative aspect-[16/10] z-20 pointer-events-auto"
        >
          {/* Subtle Supporting Visual 1: Atmospheric Glow */}
          <div 
            className="absolute -inset-10 opacity-30 blur-[80px] rounded-full mix-blend-screen"
            style={{ backgroundColor: `rgb(${project.accent})` }}
          />
          
          {/* Subtle Supporting Visual 2: Medical waveform line (just a decorative SVG) */}
          <div className="absolute -top-12 -right-12 w-64 h-24 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-white fill-none stroke-[0.5]">
              <path d="M0,10 L30,10 L35,2 L45,18 L55,5 L60,10 L100,10" />
            </svg>
          </div>

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

      </div>
    </motion.div>
  );
}
