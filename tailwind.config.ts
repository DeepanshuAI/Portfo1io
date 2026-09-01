import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      /**
       * Type scale, named by role rather than by size, with line-height and
       * tracking baked in so a size can't be used at the wrong rhythm.
       * `display-*` is Sora (headings), `body-*` is Inter, `label-*` is mono.
       * Tailwind's defaults stay available, but new work should use these.
       */
      fontSize: {
        "label-xs": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.22em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.18em" }],
        label: ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.14em" }],

        "body-xs": ["0.8125rem", { lineHeight: "1.55" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.6" }],

        "display-xs": ["1.0625rem", { lineHeight: "1.3", letterSpacing: "-0.008em" }],
        "display-sm": ["1.375rem", { lineHeight: "1.22", letterSpacing: "-0.015em" }],
        "display-md": ["1.875rem", { lineHeight: "1.14", letterSpacing: "-0.02em" }],
        "display-lg": ["2.625rem", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        "display-xl": ["3.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-2xl": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],

        /**
         * Fluid tier for the four sizes that must stay in strict descending
         * order at *every* viewport width: hero name > philosophy statement >
         * section h2 > project/entry title. Breakpoint steps couldn't hold
         * that — a 2.625rem h2 outgrew a 6.4vw h1 on a narrow window, and a
         * 4.5rem h2 dwarfed it at md. These interpolate instead of jumping.
         */
        "display-fluid-sm": [
          "clamp(1.75rem, 3.6vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.022em" },
        ],
        "display-fluid": [
          "clamp(1.875rem, 4.4vw, 3.5rem)",
          { lineHeight: "1.07", letterSpacing: "-0.026em" },
        ],
        "display-fluid-lg": [
          "clamp(2rem, 6vw, 4.75rem)",
          { lineHeight: "1.03", letterSpacing: "-0.03em" },
        ],
        "display-fluid-xl": [
          "clamp(2.75rem, 6.6vw, 5.25rem)",
          { lineHeight: "0.98", letterSpacing: "-0.035em" },
        ],
      },
      colors: {
        void: {
          DEFAULT: "#05060b",
          900: "#070812",
          800: "#0b0d18",
          700: "#12152a",
        },
        plasma: {
          cyan: "#4fd6ff",
          violet: "#8b7bff",
          magenta: "#ff6ad5",
          amber: "#ffb457",
          mint: "#5df2c0",
        },
        ink: {
          DEFAULT: "#e8ecf6",
          muted: "#8a93a6",
          faint: "#4c5468",
        },
      },
      letterSpacing: {
        ultra: "0.4em",
      },
      transitionTimingFunction: {
        lab: "cubic-bezier(0.16, 1, 0.3, 1)",
        "lab-in-out": "cubic-bezier(0.62, 0, 0.24, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 40s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
