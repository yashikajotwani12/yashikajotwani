"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  tws: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
};

function readVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    const hero = heroRef.current;
    if (!cvs || !hero) return;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const MAGIC = 0.8;
    let stars: Star[] = [];

    let mouseInHero = false;
    let lmx = -9999;
    let lmy = -9999;
    let raf = 0;

    const sizeCanvas = () => {
      const r = cvs.getBoundingClientRect();
      cvs.width = Math.floor(r.width * DPR);
      cvs.height = Math.floor(r.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const seedStars = () => {
      const r = cvs.getBoundingClientRect();
      const count = Math.round(((r.width * r.height) / 14000) * MAGIC);
      stars = [];
      for (let i = 0; i < count; i++) {
        const hx = Math.random() * r.width;
        const hy = Math.random() * r.height;
        stars.push({
          x: hx,
          y: hy,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.6 + 0.25,
          tw: Math.random() * Math.PI * 2,
          tws: 0.003 + Math.random() * 0.012,
          vx: 0,
          vy: 0,
          hx,
          hy,
        });
      }
    };

    const resize = () => {
      sizeCanvas();
      seedStars();
    };

    const onEnter = () => {
      mouseInHero = true;
    };
    const onLeave = () => {
      mouseInHero = false;
    };
    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect();
      lmx = e.clientX - r.left;
      lmy = e.clientY - r.top;
    };

    const draw = () => {
      const r = cvs.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      const starCol = readVar("--star") || "rgba(0,0,0,.5)";
      const accent = readVar("--accent") || "#b9532b";

      for (const s of stars) {
        const dx = lmx - s.x;
        const dy = lmy - s.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const radius = 220;
        if (mouseInHero && d < radius) {
          const f = 1 - d / radius;
          s.vx += (dx / d) * f * 0.35 * MAGIC;
          s.vy += (dy / d) * f * 0.35 * MAGIC;
        }
        s.vx += (s.hx - s.x) * 0.008;
        s.vy += (s.hy - s.y) * 0.008;
        s.vx *= 0.88;
        s.vy *= 0.88;
        s.x += s.vx;
        s.y += s.vy;
        s.tw += s.tws;
      }

      ctx.lineWidth = 1;
      const lim = 110 * 110;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < lim) {
            const t = 1 - d2 / lim;
            ctx.strokeStyle = starCol.replace(/[\d.]+\)/, (m) => {
              return (parseFloat(m) * t * 0.55).toFixed(3) + ")";
            });
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const s of stars) {
        const dx = lmx - s.x;
        const dy = lmy - s.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const near = mouseInHero && d < 140;
        const tw = 0.65 + Math.sin(s.tw) * 0.35;
        const a = s.a * tw * (near ? 1.5 : 1);
        ctx.fillStyle = near
          ? accent
          : starCol.replace(/[\d.]+\)/, (m) => (parseFloat(m) * a).toFixed(3) + ")");
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (near ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();

        if (near && d < 60) {
          ctx.fillStyle = accent + "22";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (mouseInHero) {
        let closest: Star | null = null;
        let cd = 9999;
        for (const s of stars) {
          const dx = lmx - s.x;
          const dy = lmy - s.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < cd) {
            cd = d;
            closest = s;
          }
        }
        if (closest && cd < 180) {
          ctx.strokeStyle = accent + "aa";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(lmx, lmy);
          ctx.lineTo(closest.x, closest.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);
    hero.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
      hero.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen px-6 sm:px-10 grid items-center"
    >
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* Corner labels */}
      <div className="corner-label hidden sm:block" style={{ top: 96, right: 40, textAlign: "right" }}>
        <div>N 28.61° &nbsp; E 77.23°</div>
        <div className="v">New Delhi</div>
      </div>
      <div className="corner-label hidden sm:block" style={{ bottom: 32, left: 40 }}>
        <div>Portfolio · MMXXVI</div>
        <div className="v">v 2.6.1</div>
      </div>
      <div className="corner-label hidden sm:block" style={{ bottom: 32, right: 40, textAlign: "right" }}>
        <div>Scroll to read the log</div>
        <div className="v">↓</div>
      </div>

      <div className="relative z-[2] max-w-[1200px] w-full mx-auto pt-20 pb-10">
        <div className="flex items-center gap-3 sm:gap-[14px] mb-6 sm:mb-7 mono uppercase text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-3)" }}>
          <span className="inline-block w-9 h-px" style={{ background: "var(--ink-3)" }} />
          <span>Software developer &nbsp;·&nbsp; designer &nbsp;·&nbsp; quiet builder</span>
        </div>

        <h1
          className="serif-italic m-0"
          style={{
            fontSize: "clamp(64px, 11vw, 168px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
          }}
        >
          <span style={{ fontStyle: "normal", letterSpacing: "-0.04em" }}>Hey,</span> I&apos;m{" "}
          <span style={{ color: "var(--accent)" }}>Yashika</span>
          <span className="serif-italic" style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <div className="mt-7 sm:mt-9 flex flex-wrap items-start gap-y-6 gap-x-10 sm:gap-x-14 max-w-[920px]">
          <div
            className="serif-italic flex items-center gap-3 sm:gap-[14px]"
            style={{ fontSize: 24, color: "var(--ink-2)" }}
          >
            <span
              className="spin-ast"
              style={{ color: "var(--accent)", fontSize: 30, lineHeight: 0, transform: "translateY(2px)" }}
            >
              ✱
            </span>
            <span>building elegant, performant web&nbsp;things</span>
          </div>
          <p
            className="m-0 max-w-[560px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-2)", textWrap: "pretty" } as React.CSSProperties}
          >
            A developer and designer drawn to clean code, careful typography, and the quiet space
            between interactions. I write in TypeScript, think in React, and obsess over the
            moments most people miss.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href="mailto:hello@yashika.dev"
            className="cta cta-primary"
          >
            <span>hello@yashika.dev</span>
            <span className="cta-arrow">↗</span>
          </a>
          <a href="#log" className="cta">
            <span className="cta-em">read the log</span>
            <span className="cta-arrow">↓</span>
          </a>
          <span
            className="ml-2 inline-flex items-center gap-2 mono uppercase tracking-[0.06em]"
            style={{ fontSize: 10.5, color: "var(--ink-2)" }}
          >
            <span className="pulse-dot" /> available · summer &rsquo;26
          </span>
        </div>
      </div>

      <style jsx>{`
        .cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 999px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--ink);
          text-decoration: none;
          background: transparent;
          border: 1px solid var(--rule);
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cta:hover {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
          transform: translateY(-1px);
        }
        .cta-primary {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .cta-primary:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .cta-arrow {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(0.3, 0.7, 0.3, 1.2);
        }
        .cta:hover .cta-arrow {
          transform: translate(3px, -3px);
        }
        .cta-em {
          font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
          font-style: italic;
          text-transform: none;
          letter-spacing: 0;
          font-size: 14px;
        }
      `}</style>
    </section>
  );
}
