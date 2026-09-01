"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";

export default function MedicalArtifact({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  // 1. Core Rotation & Scale
  // Rotates continuously but also scales down as architecture emerges
  const coreScale = useTransform(progress, [0, 0.2, 0.4], [1.2, 1.2, 0.5]);
  const coreY = useTransform(progress, [0, 0.4, 0.6], [0, 0, -120]);
  const coreRotate = useTransform(progress, [0, 1], [0, 360]);

  // 2. Fragment Separation (0.15 -> 0.35)
  const fragSpread = useTransform(progress, [0.15, 0.35], [0, 40]);
  const fragOpacity = useTransform(progress, [0, 0.15, 0.3], [1, 1, 0.2]);

  // 3. Architecture Nodes (0.35 -> 0.55)
  const archOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);
  const archScale = useTransform(progress, [0.35, 0.5], [0.8, 1]);
  
  // 4. Project Identity (0.55 -> 0.75)
  const identityOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const identityY = useTransform(progress, [0.55, 0.65], [40, 0]);

  // 5. Metrics & Tech Stack (0.75 -> 0.9)
  const metricsOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const metricsY = useTransform(progress, [0.75, 0.85], [20, 0]);

  const accentColor = `rgb(${project.accent})`;

  return (
    <div className="relative flex h-full w-full max-w-[1200px] flex-col items-center justify-center p-8 perspective-[1200px]">
      {/* 3D Artifact Container */}
      <motion.div
        style={{ scale: coreScale, y: coreY, rotateZ: coreRotate }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-64 w-64">
          {/* Central Glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-[80px]"
            style={{ backgroundColor: accentColor, opacity: 0.2 }}
          />

          {/* Fragments */}
          {[0, 90, 180, 270].map((deg) => (
            <motion.div
              key={deg}
              className="absolute left-1/2 top-1/2 h-24 w-24 border border-white/20 glass"
              style={{
                x: useTransform(fragSpread, (s) => `calc(-50% + ${Math.cos((deg * Math.PI) / 180) * s}px)`),
                y: useTransform(fragSpread, (s) => `calc(-50% + ${Math.sin((deg * Math.PI) / 180) * s}px)`),
                rotate: deg + 45,
                opacity: fragOpacity,
                borderColor: accentColor,
              }}
            />
          ))}

          {/* Inner Core */}
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 bg-black shadow-[0_0_30px_rgba(79,214,255,0.8)]" style={{ borderColor: accentColor }} />
        </div>
      </motion.div>

      {/* Architecture Emergence */}
      <motion.div
        style={{ opacity: archOpacity, scale: archScale, y: coreY }}
        className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        {/* Connecting Lines */}
        <svg className="absolute inset-0 h-full w-full" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
          <motion.path
            d="M300,200 L150,100 M300,200 L450,100 M300,200 L150,300 M300,200 L450,300"
            strokeDasharray="4 4"
            style={{ pathLength: useTransform(progress, [0.35, 0.5], [0, 1]) }}
          />
        </svg>

        {/* Nodes */}
        {[
          { label: "Frontend", x: 150, y: 100 },
          { label: "API Gateway", x: 450, y: 100 },
          { label: "PostgreSQL", x: 150, y: 300 },
          { label: "Redis Cache", x: 450, y: 300 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-2"
            style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
          >
            <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{node.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Project Identity */}
      <motion.div
        style={{ opacity: identityOpacity, y: identityY }}
        className="absolute bottom-[30%] flex max-w-2xl flex-col items-center text-center"
      >
        <div className="eyebrow mb-4" style={{ color: accentColor }}>{project.category}</div>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
          {project.title}
        </h2>
        <p className="mt-6 text-body-lg text-ink/70">
          {project.summary}
        </p>
      </motion.div>

      {/* Metrics & Tech Stack */}
      <motion.div
        style={{ opacity: metricsOpacity, y: metricsY }}
        className="absolute bottom-[10%] flex w-full max-w-4xl flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-start"
      >
        <div className="flex-1">
          <div className="label text-ink-muted mb-4">Technology Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-xs text-ink/80">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="label text-ink-muted mb-4">Architecture</div>
          <p className="text-body-sm text-ink/60">{project.architecture}</p>
        </div>
        <div className="flex-1">
          <div className="label text-ink-muted mb-4">Outcome</div>
          <p className="text-body-sm text-ink/90">{project.outcome}</p>
        </div>
      </motion.div>
    </div>
  );
}
