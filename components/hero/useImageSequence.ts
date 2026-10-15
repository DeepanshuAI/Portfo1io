"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Requests a small image window around the active frame for the scroll visual. */
export function useImageSequence(count: number, srcFor: (i: number) => string, reducedMotion = false) {
  const images = useRef<HTMLImageElement[]>([]);
  const requested = useRef<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  const requestFrames = useCallback((center: number, radius = 2) => {
    const low = Math.max(1, center - radius);
    const high = Math.min(count, center + radius);
    for (let frame = low; frame <= high; frame += 1) {
      if (requested.current.has(frame)) continue;
      requested.current.add(frame);
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = frame === center ? "high" : "low";
      img.onload = () => setReady(true);
      img.onerror = () => requested.current.delete(frame);
      img.src = srcFor(frame);
      images.current[frame - 1] = img;
    }
  }, [count, srcFor]);

  useEffect(() => {
    const shouldReduceMotion = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staticFrame = Math.round(0.08 * (count - 1)) + 1;
    if (shouldReduceMotion) requestFrames(staticFrame, 0);
    else requestFrames(1, 2);
  }, [count, reducedMotion, requestFrames]);

  return { images, ready, requestFrames };
}

/** Draw an image to fill (cover) the canvas, centred. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth || 1280;
  const ih = img.naturalHeight || 720;
  const scale = Math.max(cw / iw, ch / ih);
  const w = iw * scale;
  const h = ih * scale;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}
