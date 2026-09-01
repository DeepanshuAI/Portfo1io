"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/lib/site";

export default function MarketArtifact({
  progress,
  project,
}: {
  progress: MotionValue<number>;
  project: Project;
}) {
  const accentColor = `rgb(${project.accent})`;

  // 1. Core scale and pulses
  const coreScale = useTransform(progress, [0, 0.2, 0.4], [1, 1.2, 0.5]);
  const coreY = useTransform(progress, [0, 0.4, 0.6], [0, 0, -120]);

  // 2. Data rings expansion
  const ringSpread = useTransform(progress, [0.15, 0.35], [0, 200]);
  const ringOpacity = useTransform(progress, [0, 0.15, 0.3], [0, 1, 0.1]);

  // 3. Architecture / Charts Emergence
  const archOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);
  const archScale = useTransform(progress, [0.35, 0.5], [0.8, 1]);

  // 4. Project Identity
  const identityOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const identityY = useTransform(progress, [0.55, 0.65], [40, 0]);

  // 5. Metrics & Tech Stack
  const metricsOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const metricsY = useTransform(progress, [0.75, 0.85], [20, 0]);

  return (
    <div className="relative flex h-full w-full max-w-[1200px] flex-col items-center justify-center p-8">
      
      {/* Market Intelligence Core */}
      <motion.div
        style={{ scale: coreScale, y: coreY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex h-32 w-32 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full blur-[50px]"
            style={{ backgroundColor: accentColor, opacity: 0.4 }}
          />

          {/* Equalizer bars (signal core) */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 2, 1].map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-white"
                style={{ height: h * 12, boxShadow: `0 0 10px ${accentColor}` }}
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Expanding concentric rings */}
          {[1, 2, 3].map((r) => (
            <motion.div
              key={r}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                width: useTransform(ringSpread, s => s * r + 100),
                height: useTransform(ringSpread, s => s * r + 100),
                opacity: ringOpacity,
                borderColor: accentColor,
                rotate: r % 2 === 0 ? 360 : -360,
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Architecture Emergence */}
      <motion.div
        style={{ opacity: archOpacity, scale: archScale, y: coreY }}
        className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        {/* Trading Charts / API Lines */}
        <svg className="absolute inset-0 h-full w-full" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
          {/* Signal chart */}
          <motion.path
            d="M50,300 L150,250 L250,280 L350,150 L450,200 L550,100"
            stroke={accentColor}
            strokeWidth="2"
            style={{ pathLength: useTransform(progress, [0.35, 0.5], [0, 1]) }}
          />
          {/* Connecting pipes */}
          <motion.path
            d="M300,200 L300,100 M300,200 L150,300 M300,200 L450,300"
            strokeDasharray="4 4"
            style={{ pathLength: useTransform(progress, [0.35, 0.5], [0, 1]) }}
          />
        </svg>

        {/* Nodes */}
        {[
          { label: "Binance API", x: 300, y: 100 },
          { label: "Validation Engine", x: 150, y: 300 },
          { label: "Execution Pipeline", x: 450, y: 300 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-2"
            style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
          >
            <div className="h-4 w-4 rotate-45 border bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ borderColor: accentColor }} />
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
