"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { PERSONAL } from "@/lib/site";
import { Canvas } from "@react-three/fiber";
import ReactorScene from "@/components/webgl/ReactorScene";

export default function EngineeringCore() {
  return (
    <section id="engineering-core" className="section-y relative h-[150vh]">
      
      {/* 3D WebGL Reactor Core Background (Interactive) */}
      <div className="absolute inset-0 z-0 h-screen sticky top-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ReactorScene />
        </Canvas>
      </div>

      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-between py-24 md:py-32 z-10 pointer-events-none">
        
        {/* Title */}
        <div className="shell w-full text-center">
          <SectionHeading
            index="02"
            eyebrow="Engineering Core"
            title={
              <>
                Deepanshu <span className="text-gradient">Yadav</span>
              </>
            }
            intro="Six systems. Hover a node to inspect its technology stack."
            align="center"
          />
        </div>

        {/* daily drivers — the unglamorous half of the stack */}
        <div className="mx-auto mt-auto max-w-2xl px-6 text-center">
          <div className="label text-ink-muted/70">
            Everyday Engineering
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {PERSONAL.tools.map((t) => (
              <span key={t} className="text-body-sm font-mono text-ink/50 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
