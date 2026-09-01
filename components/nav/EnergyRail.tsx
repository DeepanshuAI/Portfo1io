"use client";

import { useSection } from "@/lib/section-context";
import { SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function EnergyRail() {
  const { active, progress } = useSection();

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 md:block"
    >
      {/* rail track */}
      <div className="relative flex flex-col items-end gap-1">
        <div className="absolute right-[6px] top-0 h-full w-px bg-white/10" />
        {/* energy fill */}
        <div
          className="absolute right-[6px] top-0 w-px origin-top"
          style={{
            height: "100%",
            transform: `scaleY(${progress})`,
            background:
              "linear-gradient(to bottom, rgb(var(--accent)), rgb(var(--accent-2)))",
            boxShadow: "0 0 8px rgb(var(--accent) / 0.5)",
            transition: "transform 0.1s linear",
          }}
        />

        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="group relative flex items-center gap-3 py-2 pr-[2px]"
              aria-current={isActive ? "true" : undefined}
              aria-label={`Go to ${s.label}`}
            >
              {/* label (reveals on hover / active) */}
              <span
                className={cn(
                  "label label-tight transition-all duration-500 ease-lab",
                  isActive
                    ? "translate-x-0 text-white opacity-100"
                    : "translate-x-2 text-ink-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                <span className="tnum text-[rgb(var(--accent))]">{s.index}</span>{" "}
                {s.label}
              </span>

              {/* node */}
              <span className="relative grid h-3 w-3 place-items-center">
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500 ease-lab",
                    isActive
                      ? "h-3 w-3 bg-[rgb(var(--accent))]"
                      : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/70",
                  )}
                  style={
                    isActive
                      ? { boxShadow: "0 0 12px rgb(var(--accent))" }
                      : undefined
                  }
                />
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
