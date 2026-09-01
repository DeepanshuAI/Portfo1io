"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SECTIONS } from "./site";

type SectionState = {
  active: string;
  progress: number; // 0..1 overall page progress
  setActive: (id: string) => void;
};

const Ctx = createContext<SectionState>({
  active: "hero",
  progress: 0,
  setActive: () => {},
});

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>("hero");
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const recompute = useCallback(() => {
    const centre = window.innerHeight * 0.42;
    let best = active;
    let bestDist = Infinity;
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      // distance from the section's vertical span to our focus line
      const dist =
        r.top > centre ? r.top - centre : r.bottom < centre ? centre - r.bottom : 0;
      if (dist < bestDist) {
        bestDist = dist;
        best = s.id;
      }
    }
    setActive((prev) => (prev === best ? prev : best));

    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    ticking.current = false;
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(recompute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    recompute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [recompute]);

  return (
    <Ctx.Provider value={{ active, progress, setActive }}>{children}</Ctx.Provider>
  );
}

export const useSection = () => useContext(Ctx);
