"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useImageSequence, drawCover } from "./useImageSequence";
import { HERO_SEQUENCE, heroFrameSrc, SITE } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { clamp } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const srcFor = (i: number) => heroFrameSrc(i);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const { images, requestFrames } = useImageSequence(HERO_SEQUENCE.count, srcFor, reduced);

  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const foreRef = useRef<HTMLDivElement>(null);

  const m1WrapRef = useRef<HTMLDivElement>(null);
  const m2WrapRef = useRef<HTMLDivElement>(null);
  const m3WrapRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);

  // Size the canvas to its display box * DPR (capped for perf).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Scroll-driven render loop. Pin lasts 320vh; progress 0..1 across it.
  useEffect(() => {
    let raf = 0;
    let running = true;
    let lastRequestedFrame = -1;

    const computeProgress = () => {
      const el = pinRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top / total);
      return scrolled;
    };

    const render = () => {
      if (!running) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const pin = pinRef.current;
      if (!canvas || !ctx || !pin) {
        raf = requestAnimationFrame(render);
        return;
      }

      // Skip all drawing work when the hero is off-screen.
      const rect = pin.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > window.innerHeight + 50) {
        if (!reduced) raf = requestAnimationFrame(render);
        return;
      }

      const p = reduced ? 0.16 : computeProgress();
      progressRef.current = p;
      const w = canvas.width;
      const h = canvas.height;

      // ---- frame selection ----
      const eased =
        p < 0.2
          ? p * 0.5
          : p < 0.6
            ? 0.1 + (p - 0.2) * 1.75
            : 0.8 + (p - 0.6) * 0.5;
      const frameF = clamp(eased) * (HERO_SEQUENCE.count - 1);
      const idx = Math.min(HERO_SEQUENCE.count - 1, Math.round(frameF));
      if (idx !== lastRequestedFrame) {
        requestFrames(idx + 1, 3);
        lastRequestedFrame = idx;
      }
      const img = images.current[idx];

      ctx.clearRect(0, 0, w, h);

      const dissolve = smoothstep(0.72, 1.0, p);

      if (img && img.complete && img.naturalWidth) {
        ctx.save();
        const zoom = 1 + smoothstep(0.2, 0.8, p) * 0.06;
        ctx.globalAlpha = 1 - dissolve;
        ctx.translate(w / 2, h / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-w / 2, -h / 2);
        drawCover(ctx, img, w, h);
        ctx.restore();
      }

      // ---- glow intensity ----
      if (glowRef.current) {
        const glow = smoothstep(0.55, 0.9, p);
        glowRef.current.style.opacity = String(glow * 0.5);
      }

      // ---- foreground identity fades out ----
      if (foreRef.current) {
        const out = smoothstep(0.02, 0.22, p);
        foreRef.current.style.opacity = String(1 - out);
        foreRef.current.style.transform = `translateY(${-out * 40}px)`;
      }

      // ---- Editorial Identity Messages ----

      // MSG 1
      if (m1WrapRef.current) {
        const tIn = smoothstep(0.22, 0.26, p);
        const tOut = smoothstep(0.43, 0.47, p);

        m1WrapRef.current.style.opacity = String(tIn - tOut);
        m1WrapRef.current.style.transform = `translateY(${(1 - tIn) * 20 - tOut * 10}px)`;
      }

      // MSG 2
      if (m2WrapRef.current) {
        const tIn = smoothstep(0.44, 0.48, p);
        const tOut = smoothstep(0.64, 0.68, p);

        m2WrapRef.current.style.opacity = String(tIn - tOut);
        m2WrapRef.current.style.transform = `translateY(${(1 - tIn) * 20 - tOut * 10}px)`;
      }

      // MSG 3
      if (m3WrapRef.current) {
        const tIn = smoothstep(0.66, 0.70, p);
        const tOut = smoothstep(0.86, 0.90, p);

        m3WrapRef.current.style.opacity = String(tIn - tOut);
        m3WrapRef.current.style.transform = `translateY(${(1 - tIn) * 20 - tOut * 10}px)`;
      }

      if (!reduced) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [images, reduced, requestFrames]);

  return (
    <section id="hero" className="relative">
      <div ref={pinRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-void md:bg-transparent" />
          
          {/* DESKTOP BACKGROUND */}
          <div
            className="hidden md:block absolute inset-0"
            style={{ background: "radial-gradient(70% 70% at 60% 45%, rgba(0,0,0,0.85), transparent 70%)" }}
          />

          {/* DEDICATED MOBILE PORTRAIT CANVAS */}
          <div className="absolute top-0 w-full h-[60svh] md:h-full overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{ mixBlendMode: "screen", filter: "sepia(.58) saturate(.72)" }}
              aria-hidden="true"
            />

            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: 0,
                background: "radial-gradient(45% 45% at 58% 42%, rgb(var(--accent) / 0.15), transparent 70%)",
                mixBlendMode: "screen",
              }}
            />

            {/* MOBILE GRADIENT FADE OUT FOR SMOOTH BLEND */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-void to-transparent md:hidden pointer-events-none" />
          </div>

          <div
            ref={foreRef}
            className="absolute bottom-0 h-[48svh] w-full flex flex-col justify-center px-6 md:inset-0 md:h-auto md:px-16 pointer-events-none"
          >
            <div className="max-w-3xl pointer-events-auto">
              <motion.h1
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: EASE }}
                className="font-display text-display-fluid-xl font-bold uppercase tracking-tight"
              >
                {SITE.name}
              </motion.h1>
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 1, ease: EASE }}
                className="mt-6 text-display-sm font-semibold text-[rgb(var(--accent))]"
              >
                {SITE.role}
              </motion.p>
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54, duration: 1, ease: EASE }}
                className="mt-4 max-w-[50ch] text-body-lg text-ink/70"
              >
                {SITE.statement}
              </motion.p>
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: EASE }}
                className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/55"
              >
                {SITE.availability}
              </motion.p>
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.66, duration: 1, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-2 md:gap-4"
              >
                <a href="#featured-systems" className="inline-flex min-h-12 items-center gap-2 border border-white/20 bg-white/5 px-4 py-3 font-mono text-xs tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))] md:gap-3 md:px-6 md:text-sm">
                  VIEW PROJECTS <span className="text-[rgb(var(--accent))]" aria-hidden="true">→</span>
                </a>
                <a href="#contact" className="inline-flex min-h-12 items-center border border-white/10 px-4 py-3 font-mono text-xs tracking-widest text-white/75 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))] md:px-6 md:text-sm">
                  CONTACT
                </a>
                <a href="/resume.pdf" download="Deepanshu-Yadav-Resume.pdf" className="inline-flex min-h-12 items-center border border-[rgb(var(--accent)/.45)] px-4 py-3 font-mono text-xs tracking-widest text-[rgb(var(--accent))] transition-colors hover:bg-[rgb(var(--accent)/.12)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))] md:px-6 md:text-sm">
                  RESUME (PDF)
                </a>
              </motion.div>
            </div>
          </div>

          {/* EDITORIAL IDENTITY MESSAGES */}
          <div className="pointer-events-none absolute inset-0">
            
            {/* MSG 1 */}
            <div 
              ref={m1WrapRef}
              className="absolute bottom-0 h-[40svh] left-6 right-6 flex flex-col justify-center md:h-auto md:bottom-auto md:left-auto md:top-[20%] md:right-24 md:w-[340px] z-10 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="mb-3 h-[1px] w-8 bg-white/30" />
              <p className="font-display text-[1.25rem] md:text-3xl leading-[1.4] md:leading-snug font-medium text-white md:text-white/90">
                I build full-stack projects, <br className="hidden md:block"/>
                <span className="text-white/70 md:text-white/40">not just interfaces.</span>
              </p>
            </div>

            {/* MSG 2 */}
            <div 
              ref={m2WrapRef}
              className="absolute bottom-0 h-[40svh] left-6 right-6 flex flex-col justify-center md:h-auto md:top-auto md:bottom-[25%] md:left-24 md:right-auto md:w-[400px] z-10 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="mb-3 flex items-center gap-3 text-[10px] md:text-xs font-mono text-[rgb(var(--accent))] tracking-widest uppercase">
                <span className="block h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
                Systems
              </div>
              <p className="font-display text-[1.25rem] md:text-3xl leading-[1.4] md:leading-snug font-medium text-white md:text-white/90">
                The Student Management System connects a React interface to an Express API and MongoDB.
              </p>
            </div>

            {/* MSG 3 */}
            <div 
              ref={m3WrapRef}
              className="absolute bottom-0 h-[40svh] left-6 right-6 flex flex-col justify-center md:h-auto md:top-[30%] md:bottom-auto md:left-24 md:right-auto md:w-[400px] z-10 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="mb-3 font-mono text-[9px] md:text-[10px] text-white/50 md:text-white/30 tracking-widest uppercase">
                03 // The Approach
              </div>
              <p className="font-display text-[1.35rem] md:text-3xl leading-[1.4] md:leading-snug font-medium text-white md:text-white/90">
                I bring design thinking into engineering — <br className="md:hidden"/>
                <span className="text-[rgb(var(--accent))]">so the details feel as considered as the code.</span>
              </p>
            </div>
          </div>

          {/* WATERMARK COVER MONOGRAM */}
          <div className="absolute left-4 top-4 z-20 md:bottom-6 md:left-6 md:top-auto">
            <div className="group relative flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-black/80 hover:-translate-y-0.5">
              <span className="font-display text-[11px] font-medium tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">DY</span>
              <span className="absolute -bottom-px left-1/2 h-px w-3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Deepanshu Yadav
                </span>
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <motion.div
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-center pointer-events-none md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
          >
            <div className="mx-auto mb-2.5 h-9 w-[1px] overflow-hidden bg-white/15">
              <div className="h-3 w-full animate-scan bg-[rgb(var(--accent))]" />
            </div>
            <span className="label text-ink-muted">Scroll to enter</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
