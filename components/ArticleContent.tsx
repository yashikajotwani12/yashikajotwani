import { Fragment, type ReactNode } from "react";

function inline(value: string): ReactNode[] {
  return value.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("`")) return <code key={index}>{part.slice(1,-1)}</code>;
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2,-2)}</strong>;
    if (part.startsWith("*")) return <em key={index}>{part.slice(1,-1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(https?:\/\/|mailto:|\/|#)/i.test(link[2])) return <a key={index} href={link[2]}>{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function ArticleContent({content}: {content: string}) {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while(i < lines.length) {
    const line = lines[i].trim();
    const key = i;
    if (!line) { i++; continue; }
    if (line.startsWith("```")) {
      const language = line.slice(3); const code: string[] = []; i++;
      while(i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i++; blocks.push(<pre key={key}><code className={`language-${language}`}>{code.join("\n")}</code></pre>); continue;
    }
    if (line.startsWith("### ")) { blocks.push(<h3 key={key}>{inline(line.slice(4))}</h3>); i++; continue; }
    if (line.startsWith("## ")) { blocks.push(<h2 key={key}>{inline(line.slice(3))}</h2>); i++; continue; }
    if (/^(\d+\.\s|-\s)/.test(line)) {
      const ordered = /^\d+\./.test(line); const matcher = ordered ? /^\d+\.\s/ : /^-\s/; const items: ReactNode[] = [];
      while(i < lines.length && matcher.test(lines[i].trim())) { items.push(<li key={i}>{inline(lines[i].trim().replace(matcher,""))}</li>); i++; }
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>); continue;
    }
    if(line.startsWith("> ")) { blocks.push(<blockquote key={key}>{inline(line.slice(2))}</blockquote>); i++; continue; }
    const paragraph = [line]; i++;
    while(i < lines.length && lines[i].trim() && !/^(#|>|```|- |\d+\. )/.test(lines[i].trim())) paragraph.push(lines[i++].trim());
    blocks.push(<p key={key}>{inline(paragraph.join(" "))}</p>);
  }
  return <article className="article-content">{blocks}</article>;
}
