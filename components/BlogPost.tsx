"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Post } from "@/data/posts";

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="my-6 p-4 glass-subtle rounded-xl overflow-x-auto text-sm leading-relaxed"
        >
          <code className="text-neutral-800 dark:text-neutral-200">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-8 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="my-4 ml-6 list-decimal space-y-2 text-neutral-700 dark:text-neutral-300 leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Bullet list
    if (line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="my-4 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300 leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="my-4 text-neutral-700 dark:text-neutral-300 leading-relaxed"
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Italic with *
    const italicMatch = remaining.match(/\*([^*]+)\*/);

    const matches = [
      boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
      codeMatch ? { type: "code", match: codeMatch, index: codeMatch.index! } : null,
      italicMatch && (!boldMatch || italicMatch.index! < boldMatch.index!)
        ? { type: "italic", match: italicMatch, index: italicMatch.index! }
        : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold text-neutral-900 dark:text-neutral-100">
          {first.match![1]}
        </strong>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 text-sm glass-subtle rounded text-neutral-800 dark:text-neutral-200"
        >
          {first.match![1]}
        </code>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    } else if (first.type === "italic") {
      parts.push(
        <em key={key++} className="italic">
          {first.match![1]}
        </em>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    }
  }

  return parts.length === 1 ? parts[0] : parts;
}

export default function BlogPost({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 sm:px-12 lg:px-24 py-12 sm:py-24 max-w-3xl mx-auto"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
          <span>{post.date}</span>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
        {renderContent(post.content)}
      </div>
    </motion.article>
  );
}
