import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens.
 *
 * Every Framer transition in the project pulls its curve and duration from
 * here. Previously each component invented its own `duration: 0.35` /
 * `0.8` / `[0.16, 1, 0.3, 1]` triple, so animations that appear side by side
 * on screen moved at unrelated speeds. Mirrors the CSS custom properties in
 * `globals.css` (`--ease-lab`, `--dur-*`) so JS and CSS animation agree.
 */

/** House ease-out: fast departure, long settle. Anything entering the page. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  /** micro-feedback: hovers, toggles, chips */
  fast: 0.25,
  /** the default: entrances, cross-fades */
  base: 0.5,
  /** editorial reveals with distance to travel */
  slow: 0.8,
} as const;

/** Stagger step for a list. Capped by `staggerIndex` so long lists don't crawl. */
const STAGGER = 0.06;

/** Delay for item `i`, flattening after `cap` items so row 12 isn't 1s late. */
const staggerIndex = (i: number, cap = 6, step = STAGGER) =>
  Math.min(i, cap) * step;

/** Standard entrance: rise and resolve. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, delay: staggerIndex(i), ease: EASE },
  }),
};

/** Shared `viewport` config — one trigger point for the whole page. */
export const IN_VIEW = { once: true, margin: "-12% 0px" } as const;
