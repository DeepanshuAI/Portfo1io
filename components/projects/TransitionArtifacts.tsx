"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export function TransitionCube({ 
  progress, 
  start, 
  end, 
  color 
}: { 
  progress: MotionValue<number>; 
  start: number; 
  end: number; 
  color: string;
}) {
  const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  
  // As we transition, the cube moves across the screen and rotates
  const x = useTransform(progress, [start, end], ["30vw", "-30vw"]);
  const rotateX = useTransform(progress, [start, end], [-20, 180]);
  const rotateY = useTransform(progress, [start, end], [45, 360]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div 
      style={{ opacity, x, scale, rotateX, rotateY }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-10 pointer-events-none preserve-3d perspective-[1200px]"
    >
      <motion.div
        className="absolute inset-0 rounded-[30%] blur-[40px]"
        style={{ backgroundColor: color, opacity: 0.3 }}
      />
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
          className="absolute inset-0 border flex items-center justify-center backdrop-blur-sm"
          style={{
            rotateX: face.rX,
            rotateY: face.rY,
            z: 50,
            borderColor: color,
            backgroundColor: "rgba(0,0,0,0.4)"
          }}
        >
          <div className="h-1/2 w-1/2 border border-white/10" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function TransitionRings({ 
  progress, 
  start, 
  end, 
  color 
}: { 
  progress: MotionValue<number>; 
  start: number; 
  end: number; 
  color: string;
}) {
  const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  
  // Rings move across the screen
  const x = useTransform(progress, [start, end], ["-30vw", "30vw"]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const ringSpread = useTransform(progress, [start, end], [0, 100]);

  return (
    <motion.div 
      style={{ opacity, x, scale }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10 pointer-events-none"
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-[40px]"
        style={{ backgroundColor: color, opacity: 0.3 }}
      />
      
      {/* Equalizer bars */}
      <div className="absolute inset-0 flex items-center justify-center gap-1">
        {[1, 2, 3, 2, 1].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-white/80"
            style={{ height: h * 12, boxShadow: `0 0 10px ${color}` }}
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
            width: useTransform(ringSpread, s => s * r + 50),
            height: useTransform(ringSpread, s => s * r + 50),
            borderColor: color,
            rotate: r % 2 === 0 ? 360 : -360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}
