"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";

export default function CubeArtifact({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  const accentColor = `rgb(${project.accent})`;

  // 1. Core Cube transforms
  const cubeScale = useTransform(progress, [0, 0.2, 0.4], [1, 1.2, 0.6]);
  const cubeY = useTransform(progress, [0, 0.4, 0.6], [0, 0, -120]);
  const cubeRotateX = useTransform(progress, [0, 1], [-20, 180]);
  const cubeRotateY = useTransform(progress, [0, 1], [45, 360]);

  // 2. Unfolding faces
  const faceSpread = useTransform(progress, [0.15, 0.35], [50, 150]);
  const faceOpacity = useTransform(progress, [0, 0.15, 0.3], [1, 0.8, 0.1]);

  // 3. Architecture Emergence
  const archOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);
  const archScale = useTransform(progress, [0.35, 0.5], [0.8, 1]);

  // 4. Project Identity
  const identityOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const identityY = useTransform(progress, [0.55, 0.65], [40, 0]);

  // 5. Metrics & Tech Stack
  const metricsOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const metricsY = useTransform(progress, [0.75, 0.85], [20, 0]);

  return (
    <div className="relative flex h-full w-full max-w-[1200px] flex-col items-center justify-center p-8 perspective-[1200px]">
      
      {/* Central Knowledge Cube */}
      <motion.div
        style={{ scale: cubeScale, y: cubeY, rotateX: cubeRotateX, rotateY: cubeRotateY }}
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 preserve-3d"
      >
        <motion.div
          className="absolute inset-0 rounded-[30%] blur-[60px]"
          style={{ backgroundColor: accentColor, opacity: 0.3 }}
        />

        {/* Faces */}
        {[
          { rX: 0, rY: 0 },
          { rX: 0, rY: 90 },
          { rX: 0, rY: 180 },
          { rX: 0, rY: -90 },
          { rX: 90, rY: 0 },
          { rX: -90, rY: 0 },
        ].map((face, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/20 glass flex items-center justify-center"
            style={{
              rotateX: face.rX,
              rotateY: face.rY,
              z: faceSpread,
              opacity: faceOpacity,
              borderColor: accentColor,
              backgroundColor: "rgba(0,0,0,0.6)"
            }}
          >
            <div className="h-1/2 w-1/2 border border-white/10" />
          </motion.div>
        ))}
      </motion.div>

      {/* Architecture Emergence */}
      <motion.div
        style={{ opacity: archOpacity, scale: archScale, y: cubeY }}
        className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <svg className="absolute inset-0 h-full w-full" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
          <motion.path
            d="M300,100 L300,300 M150,200 L450,200"
            strokeDasharray="4 4"
            style={{ pathLength: useTransform(progress, [0.35, 0.5], [0, 1]) }}
          />
          <motion.circle cx="300" cy="200" r="100" strokeDasharray="4 4" style={{ pathLength: useTransform(progress, [0.35, 0.5], [0, 1]) }} />
        </svg>

        {/* Nodes */}
        {[
          { label: "Attendance Core", x: 300, y: 100 },
          { label: "Result System", x: 150, y: 200 },
          { label: "Admin Gateway", x: 450, y: 200 },
          { label: "MongoDB Replica", x: 300, y: 300 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-2"
            style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
          >
            <div className="h-3 w-3 rounded-sm bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
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
