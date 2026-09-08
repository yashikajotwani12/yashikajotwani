"use client";
import { useEffect, useRef } from "react";
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const page = document.documentElement;
      const distance = page.scrollHeight - page.clientHeight;
      if(ref.current) ref.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0,window.scrollY / distance)) : 0})`;
    };
    const observer = new ResizeObserver(update); observer.observe(document.body);
    window.addEventListener("scroll",update,{passive:true}); update();
    return () => { observer.disconnect(); window.removeEventListener("scroll",update); };
  },[]);
  return <div className="reading-progress" ref={ref} aria-hidden="true" style={{transform:"scaleX(0)"}}/>;
}
