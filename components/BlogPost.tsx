"use client";

import Link from "next/link";
import { useState } from "react";
import { posts, type Post } from "@/data/posts";
import ReadingProgress from "./ReadingProgress";

const categoryBySlug: Record<string, string> = {
  "building-minimalist-portfolio-nextjs": "Engineering",
  "dark-mode-done-right-next-themes": "Engineering",
  "art-of-subtle-animations": "Design",
  "typescript-tips-react-developers": "Engineering",
};

function postNumber(slug: string): string {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) return "—";
  const n = posts.length - idx;
  return String(n).padStart(2, "0");
}

function nextPost(slug: string): Post | null {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0 || idx + 1 >= posts.length) return null;
  return posts[idx + 1];
}

const NEXT_GLYPHS: Record<string, string> = {
  "building-minimalist-portfolio-nextjs": "✦",
  "dark-mode-done-right-next-themes": "◐",
  "art-of-subtle-animations": "✿",
  "typescript-tips-react-developers": "⌘",
};

/* ─── Title splitter: italicize content nouns, keep small connectors roman ─── */
function splitTitle(title: string): React.ReactNode {
  const ROMAN = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "for",
    "to",
    "with",
    "in",
    "of",
    "on",
    "at",
    "by",
    "from",
    "is",
    "as",
  ]);
  const words = title.split(/(\s+)/);
  const out: React.ReactNode[] = [];
  let key = 0;
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      out.push(w);
      continue;
    }
    if (ROMAN.has(w.toLowerCase())) {
      out.push(
        <span key={key++} className="roman">
          {w}
        </span>
      );
    } else {
      out.push(<span key={key++}>{w}</span>);
    }
  }
  return out;
}

/* ─── Inline markdown: bold, italic, inline code, links ─── */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);

    const candidates = [
      boldMatch
        ? { type: "bold", index: boldMatch.index!, full: boldMatch[0], a: boldMatch[1] }
        : null,
      codeMatch
        ? { type: "code", index: codeMatch.index!, full: codeMatch[0], a: codeMatch[1] }
        : null,
      linkMatch
        ? {
            type: "link",
            index: linkMatch.index!,
            full: linkMatch[0],
            a: linkMatch[1],
            b: linkMatch[2],
          }
        : null,
      italicMatch
        ? { type: "italic", index: italicMatch.index!, full: italicMatch[0], a: italicMatch[1] }
        : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (candidates.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = candidates[0]!;
    if (first.index > 0) parts.push(remaining.slice(0, first.index));

    if (first.type === "bold") {
      parts.push(<b key={key++}>{first.a}</b>);
    } else if (first.type === "code") {
      parts.push(
        <code key={key++} className="inline">
          {first.a}
        </code>
      );
    } else if (first.type === "italic") {
      parts.push(<em key={key++}>{first.a}</em>);
    } else if (first.type === "link") {
      parts.push(
        <a key={key++} href={(first as { b: string }).b} target="_blank" rel="noopener noreferrer">
          {first.a}
        </a>
      );
    }
    remaining = remaining.slice(first.index + first.full.length);
  }

  return parts.length === 1 ? parts[0] : parts;
}

/* ─── Body renderer: markdown → editorial template elements ─── */
function renderBody(content: string): React.ReactNode[] {
  const lines = content.trim().split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let firstParagraphSeen = false;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const langTag = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const lang = (langTag || "code").toUpperCase();
      const fileMatch = codeLines[0]?.match(/^\/\/\s*(.+\.\w+)\s*$/);
      const file = fileMatch?.[1];
      const body = file ? codeLines.slice(1).join("\n") : codeLines.join("\n");
      out.push(
        <div className="code-card" key={`code-${i}`}>
          <div className="code-head">
            <span className="file">{file ?? "snippet"}</span>
            <span className="lang">{lang}</span>
          </div>
          <pre>{body}</pre>
        </div>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      out.push(<h2 key={`h2-${i}`}>{renderInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(<h3 key={`h3-${i}`}>{renderInline(line.slice(4))}</h3>);
      i++;
      continue;
    }

    /* numbered list → takeaways block */
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      out.push(
        <ul className="takeaways" key={`tk-${i}`}>
          {items.map((raw, idx) => {
            const m = raw.match(/^\*\*([^*]+)\*\*\s*[—-]?\s*(.*)$/);
            const num = String(idx + 1).padStart(2, "0");
            if (m) {
              return (
                <li key={idx}>
                  <span className="num">{num}</span>
                  <span className="txt">
                    <b>{m[1]}</b> {m[2] ? renderInline(m[2]) : null}
                  </span>
                </li>
              );
            }
            return (
              <li key={idx}>
                <span className="num">{num}</span>
                <span className="txt">{renderInline(raw)}</span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    /* bullet list */
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(
        <ul className="bullets" key={`ul-${i}`}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>
      );
      continue;
    }

    /* blockquote */
    if (line.trim().startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        buf.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(<blockquote key={`bq-${i}`}>{renderInline(buf.join(" "))}</blockquote>);
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const isFirst = !firstParagraphSeen;
    firstParagraphSeen = true;
    out.push(
      <p key={`p-${i}`} className={isFirst ? "first" : undefined}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return out;
}

function Reactions() {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const reactions = ["✦", "❀", "◐"];
  return (
    <div className="reactions">
      {reactions.map((r) => (
        <button
          key={r}
          className={`reaction${active[r] ? " on" : ""}`}
          aria-pressed={!!active[r]}
          aria-label={`React with ${r}`}
          onClick={() => setActive((s) => ({ ...s, [r]: !s[r] }))}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export default function BlogPost({ post }: { post: Post }) {
  const category = categoryBySlug[post.slug] ?? "Notes";
  const num = postNumber(post.slug);
  const next = nextPost(post.slug);
  const nextGlyph = next ? NEXT_GLYPHS[next.slug] ?? "✦" : "✦";
  const nextCategory = next ? categoryBySlug[next.slug] ?? "Notes" : "";

  return (
    <>
      <ReadingProgress />

      <main
        className="relative z-[1] mx-auto"
        style={{
          maxWidth: 720,
          padding: "140px 32px 40px",
        }}
      >
        <Link href="/#log" className="back-link">
          <span className="line" />
          <span>back to log</span>
        </Link>

        <div className="post-meta">
          <span className="pill cat">{category}</span>
          <span>{post.date}</span>
          <span className="meta-dot" />
          <span>{post.readTime}</span>
          <span className="meta-dot" />
          <span>— {num}</span>
        </div>

        <h1 className="post-title">
          {splitTitle(post.title)}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <p className="post-lede">{post.description}</p>

        <div className="star-rule">
          <span className="star">✱</span>
        </div>

        <article className="prose">{renderBody(post.content)}</article>

        <div className="endmark">✱ &nbsp; ✱ &nbsp; ✱</div>

        <div className="author-card">
          <div className="avatar">Y</div>
          <div>
            <div className="who">Yashika Jotwani</div>
            <div className="bio">Software developer &amp; designer · Delhi</div>
          </div>
          <Reactions />
        </div>

        {next && (
          <div className="next-block">
            <div className="next-label">— Next in the log</div>
            <Link href={`/log/${next.slug}`} className="next-card">
              <div>
                <div className="nx-title">{next.title}</div>
                <div className="nx-meta">
                  {next.date} · {nextCategory} · {next.readTime}
                </div>
              </div>
              <div className="nx-arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </div>
              <div className="nx-glyph">{nextGlyph}</div>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
