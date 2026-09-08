"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Mesh({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, t = 0, visible = true;
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = Math.min(devicePixelRatio, 2);
      if (canvas.width !== w*dpr || canvas.height !== h*dpr) { canvas.width=w*dpr; canvas.height=h*dpr; }
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
      const accent=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const project=(u:number,v:number) => {
        const r=1+.34*Math.cos(v), x=r*Math.cos(u), y=r*Math.sin(u), z=.34*Math.sin(v);
        const a=t*.13+.5, xx=x*Math.cos(a)-z*Math.sin(a), zz=x*Math.sin(a)+z*Math.cos(a);
        return [w/2+(xx*.88-y*.32)*w*.31,h/2+(y*.46+zz*.85)*w*.31];
      };
      ctx.strokeStyle=accent; ctx.lineWidth=.7;
      for(let i=0;i<38;i++){ctx.globalAlpha=.30+i%3*.13;ctx.beginPath();for(let j=0;j<=96;j++){const p=project(i/38*Math.PI*2,j/96*Math.PI*2);j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.stroke();}
      for(let i=0;i<20;i++){ctx.globalAlpha=.35;ctx.beginPath();for(let j=0;j<=100;j++){const p=project(j/100*Math.PI*2,i/20*Math.PI*2);j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.stroke();}
      if (!paused && !media.matches && visible) t+=.016;
      frame=requestAnimationFrame(draw);
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(canvas);
    draw();return()=>{cancelAnimationFrame(frame);observer.disconnect();};
  },[paused]);
  return <canvas ref={ref} aria-label="Rotating wireframe torus, a mathematical surface" role="img" />;
}
export default function Hero(){
 const [paused,setPaused]=useState(false);
 return <section className="lab-hero" id="hero">
   <div className="hero-kicker mono"><span><i className="status-light"/> BACKEND ENGINEER / CREATIVE THINKER</span><span>BANGALORE, IN · 12.97° N</span></div>
   <div className="hero-composition"><div className="hero-copy"><p className="intro-label">Hello, world. I’m</p><h1>Yashika<span>Jotwani<span className="name-dot">.</span></span></h1><p className="hero-description">I build the systems <em>behind the screen.</em><br/>And care about every detail in front of it.</p><div className="hero-actions"><Link href="/about" className="lab-button">Explore my world <span>↗</span></Link><a href="#log" className="text-button">Read the field notes <span>↓</span></a></div></div>
   <div className="mesh-panel"><div className="mesh-label mono"><span>FIG. 001 — CONTINUOUS CURIOSITY</span><span>3D / ∞</span></div><Mesh paused={paused}/><div className="mesh-bottom mono"><span>x = (R + r cos v) cos u</span><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?"▶ PLAY":"Ⅱ PAUSE"}</button></div></div></div>
   <div className="hero-foot"><span className="mono"><i className="status-light"/> CURRENTLY AT <b>HACKERRANK</b></span><p>Code with intent. Build with curiosity.</p><a href="#log" aria-label="Scroll to writing">↓</a></div>
 </section>
}
