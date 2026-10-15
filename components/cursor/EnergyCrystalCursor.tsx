"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

type Mode = "default" | "hover";

export default function EnergyCrystalCursor() {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.setAttribute("data-custom-cursor", "on");
    return () => document.documentElement.removeAttribute("data-custom-cursor");
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let raf = 0;

    const resetIdle = () => {
      if (!visible) setVisible(true);
      if (isIdle) setIsIdle(false);
      
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2500); // 2.5 seconds to idle
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (reduced) tick();
      resetIdle();
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "a,button,[data-cursor],input,textarea,select"
      );
      if (el) {
        setMode("hover");
      } else {
        setMode("default");
      }
    };

    const tick = () => {
      // 1. Instant dot tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`;
      }

      // 2. Spring tracking for ring
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      
      // Update current pos with a subtle lag (0.25 interpolator)
      current.x += dx * (reduced ? 1 : 0.25);
      current.y += dy * (reduced ? 1 : 0.25);

      // Calculate velocity stretch based on the delta
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      // Prevent massive distortion on fast swipes (clamp to max 1.5 stretch)
      const stretch = reduced ? 1 : 1 + Math.min(velocity * 0.005, 0.5);
      const squash = reduced ? 1 : 1 - Math.min(velocity * 0.002, 0.2);

      if (ringRef.current) {
        // We use transform for the fast physics updates.
        ringRef.current.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squash})`;
      }
      
      if (!reduced) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    
    // Start loop & initial idle timer
    if (reduced) tick();
    else raf = requestAnimationFrame(tick);
    resetIdle();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [isTouch, reduced, visible, isIdle]);

  if (isTouch) return null;

  // Visual constraints based on React state
  const isHover = mode === "hover";
  
  // Dot styling
  const dotScale = isHover ? 0 : (isIdle ? 0.6 : 1);
  const dotOpacity = isHover ? 0 : (isIdle ? 0.3 : 1);

  // Ring styling
  const ringSize = isHover ? 48 : 28;
  const ringScaleCSS = isIdle && !isHover ? 0.8 : 1; // Used via the CSS scale property
  const ringOpacity = isHover ? 0.3 : (isIdle ? 0.15 : 0.4);
  const ringBorder = isHover ? "rgba(255, 255, 255, 0.4)" : "rgba(125, 211, 252, 0.5)"; 
  const ringBg = isHover ? "rgba(255, 255, 255, 0.05)" : "transparent";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      aria-hidden
    >
      {/* Outer Ring with Physics Deformation */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 will-change-transform rounded-full shadow-[0_0_12px_rgba(125,211,252,0.15)]"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${ringBorder}`,
          background: ringBg,
          backdropFilter: isHover ? "blur(2px)" : "none",
          opacity: ringOpacity,
          scale: ringScaleCSS, // Independent CSS scale (combines safely with transform matrix)
          transition: "width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s, background 0.3s, backdrop-filter 0.3s, opacity 0.5s ease, scale 0.5s ease",
        }}
      />
      
      {/* Central Luminous Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 will-change-transform rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          width: 4,
          height: 4,
          opacity: dotOpacity,
          scale: dotScale,
          transition: "opacity 0.3s ease, scale 0.3s ease",
        }}
      />
    </div>
  );
}
