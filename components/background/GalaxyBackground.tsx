"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Star properties
    const numStars = 200;
    const stars: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    let animationFrame: number;
    let time = 0;

    const render = () => {
      if (!ctx) return;
      time += 0.002;

      // Base deep space background
      ctx.fillStyle = "#030014"; // very deep purple/black
      ctx.fillRect(0, 0, width, height);

      // Draw subtle nebula gradients
      const cx = width / 2;
      const cy = height / 2;
      
      const g1 = ctx.createRadialGradient(
        cx + Math.sin(time) * 200, 
        cy + Math.cos(time) * 100, 
        0, 
        cx, cy, width * 0.8
      );
      g1.addColorStop(0, "rgba(76, 29, 149, 0.15)"); // purple
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        cx - Math.cos(time * 0.8) * 300, 
        cy + Math.sin(time * 0.8) * 200, 
        0, 
        cx, cy, width * 0.8
      );
      g2.addColorStop(0, "rgba(29, 78, 216, 0.1)"); // blue
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Draw stars (warp effect)
      ctx.save();
      ctx.translate(width / 2, height / 2);
      
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Move stars forward if motion is allowed
        if (!reducedMotion) {
          star.z -= 0.5;
          if (star.z <= 0) {
            star.z = width;
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
          }
        }

        const x = (star.x / star.z) * width;
        const y = (star.y / star.z) * width;
        
        // Size scale based on depth
        const s = star.size * (width / star.z);
        const a = Math.min(1, (1 - star.z / width) * star.alpha);

        // Twinkle
        const twinkle = 0.5 + Math.sin(time * 10 + i) * 0.5;

        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a * twinkle})`;
        ctx.fill();
      }
      ctx.restore();

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
