"use client";

import { useEffect, useRef, useState } from "react";
import { loader } from "@/lib/loader";

/**
 * Preloads an image sequence into memory and reports progress to the global
 * loader store. Frames are decoded once; drawing a frame is a single
 * drawImage() call — the performant "Apple scroll sequence" technique.
 */
export function useImageSequence(count: number, srcFor: (i: number) => string) {
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const arr: HTMLImageElement[] = new Array(count);

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.decoding = "async";
      const done = () => {
        if (cancelled) return;
        loaded += 1;
        loader.set(loaded / count);
        if (loaded >= count) setReady(true);
      };
      img.onload = done;
      img.onerror = done; // never trap the loader on a single 404
      img.src = srcFor(i);
      arr[i - 1] = img;
    }
    images.current = arr;

    return () => {
      cancelled = true;
    };
  }, [count, srcFor]);

  return { images, ready };
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
