export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Clamp a number to [min, max]. */
export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));


