"use client";

import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="section-y relative z-10 flex min-h-[80vh] flex-col items-center justify-center">
      <div className="shell w-full text-center">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title={
            <>
              Mindset & <span className="text-gradient">Discipline</span>
            </>
          }
          intro="Engineering is not just writing code. It is a methodology for solving complex problems in reality."
          align="center"
        />

        <div className="mx-auto mt-20 max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          
          <div className="space-y-4 relative group">
            <div className="absolute -inset-4 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <h3 className="relative text-xl font-mono text-ink tracking-tight flex items-center gap-3">
              <span className="text-ink-muted/50 text-sm">01.</span> Problem Solving
            </h3>
            <p className="relative text-ink-muted">
              Breaking down monolithic challenges into systematic, testable parts.
              I focus on the root cause rather than treating symptoms.
            </p>
          </div>

          <div className="space-y-4 relative group">
            <div className="absolute -inset-4 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <h3 className="relative text-xl font-mono text-ink tracking-tight flex items-center gap-3">
              <span className="text-ink-muted/50 text-sm">02.</span> Debugging
            </h3>
            <p className="relative text-ink-muted">
              Treating errors as information. Reading stack traces deeply, isolating state, 
              and understanding system behavior under stress.
            </p>
          </div>

          <div className="space-y-4 relative group">
            <div className="absolute -inset-4 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <h3 className="relative text-xl font-mono text-ink tracking-tight flex items-center gap-3">
              <span className="text-ink-muted/50 text-sm">03.</span> Testing
            </h3>
            <p className="relative text-ink-muted">
              Writing code that proves it works. Defining expected outcomes before building, 
              ensuring resilience against edge cases.
            </p>
          </div>

          <div className="space-y-4 relative group">
            <div className="absolute -inset-4 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <h3 className="relative text-xl font-mono text-ink tracking-tight flex items-center gap-3">
              <span className="text-ink-muted/50 text-sm">04.</span> Surfing
            </h3>
            <p className="relative text-ink-muted">
              Navigating uncertainty and finding balance in turbulent environments. 
              Patience, reading the conditions, and committing fully to the wave.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
