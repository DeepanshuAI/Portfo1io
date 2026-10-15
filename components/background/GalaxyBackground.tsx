"use client";

export default function GalaxyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at 18% 4%, rgb(var(--accent-2) / 0.11), transparent 36%), radial-gradient(ellipse at 86% 38%, rgb(var(--accent) / 0.07), transparent 32%), linear-gradient(180deg, #171512 0%, #131210 55%, #171512 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,transparent_0%,rgb(255_255_255_/_0.06)_50%,transparent_100%)] [background-size:1px_100%] [background-position:7vw_0] [background-repeat:no-repeat]" />
    </div>
  );
}
