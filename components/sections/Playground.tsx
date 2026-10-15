"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PLAYGROUND, type PlaygroundModule } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/hooks";

function Preview({ variant }: { variant: PlaygroundModule["variant"] }) {
  switch (variant) {
    case "grid":
      return (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgb(var(--accent) / 0.6) 1.4px, transparent 1.4px)",
            backgroundSize: "20px 20px",
            maskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 50%, black, transparent)",
          }}
        />
      );
    case "orbit":
      return (
        <div className="absolute inset-0 grid place-items-center">
          {[26, 44, 62].map((r, i) => (
            <div
              key={r}
              className="absolute rounded-full border"
              style={{
                width: r * 2,
                height: r * 2,
                borderColor: "rgb(var(--accent) / 0.25)",
                animation: `reactor-spin ${6 + i * 3}s linear infinite ${i % 2 ? "reverse" : "normal"}`,
              }}
            >
              <span
                className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
                style={{ background: "rgb(var(--accent))", boxShadow: "0 0 6px rgb(var(--accent) / 0.45)" }}
              />
            </div>
          ))}
        </div>
      );
    case "wave":
    default:
      return (
        <div className="absolute inset-0 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-24 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
              style={{
                borderColor: "rgb(var(--accent) / 0.3)",
                transform: `translate(-50%,-50%) rotate(${i * 8}deg)`,
                animation: `drift ${3 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      );
  }
}

/** One labelled note on a study. `accent` marks the payoff line. */
function Note({
  label,
  body,
  accent = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={accent ? "border-l pl-3" : undefined}
      style={accent ? { borderColor: "rgb(var(--accent) / 0.35)" } : undefined}
    >
      <div className="label text-ink-muted/70">{label}</div>
      <p className="mt-1.5 text-body-xs text-ink-muted">{body}</p>
    </div>
  );
}

function Module({ m, reduced }: { m: PlaygroundModule; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Tilt follows the pointer with a very short transition (so it tracks
   * instead of rubber-banding behind the cursor) and eases home slowly on
   * exit. A single CSS class can't do both, so the transition is swapped
   * per gesture.
   */
  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 120ms linear";
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 700ms var(--ease-lab)";
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="Play"
      className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-400 ease-lab will-change-transform hover:border-white/20"
    >
      {/* the study itself */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/[0.08]">
        <Preview variant={m.variant} />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
        <div className="absolute bottom-3.5 left-5 right-5">
          <div className="eyebrow label-tight mb-1">{m.tag}</div>
          <div className="font-display text-display-xs font-semibold">
            {m.title}
          </div>
        </div>
      </div>

      {/* the reasoning — stated, not hidden behind a hover */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-body-sm text-ink/85">{m.objective ?? m.blurb}</p>
        {m.tested && <Note label="Tested" body={m.tested} />}
        {m.result && <Note label="Result" body={m.result} />}
        {m.lesson && <Note label="Lesson Learned" body={m.lesson} accent />}
      </div>
    </div>
  );
}

export default function Playground() {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="playground" className="section-y relative">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Topics to explore"
          title={
            <>
              Ideas for the{" "}
              <span className="text-gradient">workbench</span>.
            </>
          }
          intro="Three possible technical explorations. These are learning ideas, not completed benchmarks or connected services."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYGROUND.map((m, i) => (
            <Reveal key={m.id} i={i} className="h-full">
              <Module m={m} reduced={reduced} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
