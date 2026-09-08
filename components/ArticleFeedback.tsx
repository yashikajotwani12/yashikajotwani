"use client";
import { useState } from "react";
export default function ArticleFeedback() {
  const [selected, setSelected] = useState<string[]>([]);
  return <div className="article-feedback" aria-label="Your reaction">{["Helpful", "Interesting", "Thought-provoking"].map(label => <button key={label} aria-pressed={selected.includes(label)} onClick={() => setSelected(current => current.includes(label) ? current.filter(item => item !== label) : [...current,label])}>{label}</button>)}</div>;
}
