"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { posts } from "@/data/posts";

const glyphs = ["✦", "◐", "✿", "⌘", "✶", "❋"];
const meta = [
  "Engineering · 8 min",
  "Engineering · 6 min",
  "Design · 4 min",
  "Engineering · 7 min",
  "Notes · 5 min",
  "Notes · 5 min",
];

export default function Log() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<{ title: string; meta: string; glyph: string } | null>(
    null
  );

  useEffect(() => {
    const card = previewRef.current;
    if (!card) return;
    let pvX = 0;
    let pvY = 0;
    let pvTX = 0;
    let pvTY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pvTX = e.clientX + 30;
      pvTY = e.clientY - 30;
    };

    const loop = () => {
      pvX += (pvTX - pvX) * 0.18;
      pvY += (pvTY - pvY) * 0.18;
      card.style.left = pvX + "px";
      card.style.top = pvY + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="log"
      className="relative z-[2] px-6 sm:px-10 pt-24 sm:pt-32 pb-32 sm:pb-40"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid sm:grid-cols-[280px_1fr] gap-6 sm:gap-[60px] items-end mb-12 sm:mb-16">
          <div>
            <div
              className="mono uppercase"
              style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em" }}
            >
              // log
            </div>
          </div>
          <div>
            <h2
              className="serif-italic m-0"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "var(--ink)",
              }}
            >
              Thinking out loud, while building.
            </h2>
            <p
              className="mt-[18px] max-w-[420px] text-[15px]"
              style={{ color: "var(--ink-2)" }}
            >
              Notes from the studio — half essay, half changelog. Mostly about craft, sometimes
              about the weather.
            </p>
          </div>
        </div>

        <ul className="list-none p-0 m-0">
          {posts.map((post, i) => {
            const idx = posts.length - i;
            const num = String(idx).padStart(2, "0");
            const glyph = glyphs[i % glyphs.length];
            const m = meta[i] ?? "Notes · 5 min";
            return (
              <li key={post.slug}>
                <Link
                  href={`/log/${post.slug}`}
                  className="log-row"
                  onMouseEnter={() =>
                    setHovered({ title: post.title, meta: m, glyph })
                  }
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="num">— {num}</span>
                  <span className="row-title">{post.title}</span>
                  <span className="row-date">{post.date}</span>
                  <span className="row-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={previewRef}
        className={`preview-card hidden md:flex ${hovered ? "on" : ""}`}
        aria-hidden="true"
      >
        <div className="pv-title">{hovered?.title ?? "—"}</div>
        <div className="pv-foot">
          <span>{hovered?.meta ?? "—"}</span>
          <span>read →</span>
        </div>
        <div className="pv-glyph">{hovered?.glyph ?? "✦"}</div>
      </div>
    </section>
  );
}
