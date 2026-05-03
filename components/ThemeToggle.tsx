"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 28, height: 28 }} />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <style jsx>{`
        .theme-toggle {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          border: 1px solid var(--rule);
          color: var(--ink-2);
          background: transparent;
          cursor: pointer;
          transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .theme-toggle:hover {
          color: var(--ink);
          border-color: var(--ink);
        }
      `}</style>
    </button>
  );
}
