"use client";

import { useEffect, useRef } from "react";

export default function CursorHalo() {
  const haloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let hx = mx;
    let hy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      document.body.classList.add("has-halo");
    };
    const onLeave = () => document.body.classList.remove("has-halo");

    const loop = () => {
      hx += (mx - hx) * 0.18;
      hy += (my - hy) * 0.18;
      halo.style.transform = `translate(${hx}px, ${hy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-halo");
    };
  }, []);

  return <div ref={haloRef} className="cursor-halo" aria-hidden="true" />;
}
