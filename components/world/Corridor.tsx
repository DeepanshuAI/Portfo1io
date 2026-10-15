"use client";

import { useEffect } from "react";
import { useSection } from "@/lib/section-context";

// Each section quietly retints the whole world.
const ACCENTS: Record<string, [string, string]> = {
  hero: ["216 189 145", "190 145 139"],
  "featured-systems": ["216 189 145", "190 145 139"],
  "engineering-core": ["207 184 148", "177 153 132"],
  skills: ["190 145 139", "216 189 145"],
  process: ["207 184 148", "190 145 139"],
  contact: ["190 145 139", "216 189 145"],
};

export default function Corridor() {
  const { active } = useSection();

  // Retint the corridor as sections change
  useEffect(() => {
    const pair = ACCENTS[active];
    if (!pair) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", pair[0]);
    root.style.setProperty("--accent-2", pair[1]);
  }, [active]);

  return null;
}
