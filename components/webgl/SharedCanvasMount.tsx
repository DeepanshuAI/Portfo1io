"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion, useWebGLSupport } from "@/lib/hooks";

// Load three.js / R3F only on the client, and only when actually usable.
const SharedCanvas = dynamic(() => import("./SharedCanvas"), { ssr: false });

export default function SharedCanvasMount() {
  const webgl = useWebGLSupport();
  const reduced = usePrefersReducedMotion();

  // Wait until capability is known; skip entirely if unsupported or reduced
  // motion is requested (the Skills section renders a rich CSS fallback).
  if (webgl !== true || reduced) return null;

  return <SharedCanvas />;
}
