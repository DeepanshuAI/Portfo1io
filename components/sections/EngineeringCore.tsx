"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { PERSONAL } from "@/lib/site";

export default function EngineeringCore() {
  return (
    <section id="engineering-core" className="section-y relative min-h-[100svh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,189,145,0.10),transparent_48%),radial-gradient(ellipse_at_70%_60%,rgba(190,145,139,0.07),transparent_42%)]"
      />

      <div className="relative z-10 flex min-h-[70svh] flex-col items-center justify-between py-24 md:min-h-[75svh] md:py-32">
        
        {/* Title */}
        <div className="shell w-full text-center">
          <SectionHeading
            index="02"
            eyebrow="Technical foundations"
            title={
              <>
                Tools, <span className="text-gradient">connected.</span>
              </>
            }
            intro="An interactive view of technologies used across the portfolio and featured project repositories."
            align="center"
          />
        </div>

        {/* daily drivers — the unglamorous half of the stack */}
        <div className="mx-auto mt-auto max-w-2xl px-6 text-center">
          <div className="label text-ink-muted/70">
            Technologies shown in the work
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
