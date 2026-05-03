import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
