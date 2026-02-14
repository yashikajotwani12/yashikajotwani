export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "building-minimalist-portfolio-nextjs",
    title: "Building a Minimalist Portfolio with Next.js",
    description:
      "A deep dive into creating a clean, performant portfolio using Next.js 14, Tailwind CSS, and Framer Motion.",
    date: "Feb 2026",
    readTime: "5 min read",
    content: `
When I set out to build my portfolio, I had one goal in mind: keep it simple. No flashy gradients, no complex layouts — just clean typography, good spacing, and content that speaks for itself.

## Why Next.js 14?

Next.js has become the go-to framework for React developers, and for good reason. The App Router introduced in Next.js 13 (and refined in 14) brings a new paradigm of server-first development that's perfect for content-heavy sites like portfolios.

The file-based routing makes it incredibly intuitive to organize pages. Want a new section? Just create a folder. Need a dynamic route for blog posts? Add a \`[slug]\` directory. It's that simple.

## Styling with Tailwind CSS

I chose Tailwind CSS for its utility-first approach. When you're building a minimalist design, you want precise control over every pixel — and Tailwind delivers exactly that.

The stone color palette was a deliberate choice. Unlike pure greys, stone tones have a subtle warmth that makes the design feel more inviting without sacrificing the clean, professional aesthetic.

\`\`\`tsx
// The stone palette adds warmth
<h1 className="text-stone-900 dark:text-stone-100">
  Hey, I'm Yashika Jotwani
</h1>
\`\`\`

## Typography Choices

The combination of Libre Baskerville for headings and Montserrat for body text creates a nice contrast between editorial elegance and modern readability. Serif fonts for headings add a touch of sophistication, while the sans-serif body text keeps things clean and scannable.

## Adding Motion with Framer Motion

Animations should enhance the experience, not dominate it. I used Framer Motion's \`whileInView\` for subtle fade-up effects as sections enter the viewport, and kept transitions to 0.4–0.6 seconds — fast enough to feel responsive, slow enough to be noticed.

## Key Takeaways

1. **Start with content** — design around what you want to say, not the other way around
2. **Limit your palette** — two or three colors plus their variants is plenty
3. **Typography matters** — spend time choosing fonts that complement each other
4. **Less animation is more** — if you can't explain why an animation exists, remove it

The result is a portfolio that loads fast, looks clean, and puts the focus where it should be: on the work.
    `,
  },
  {
    slug: "dark-mode-done-right-next-themes",
    title: "Dark Mode Done Right with next-themes",
    description:
      "How to implement a seamless dark mode experience that respects system preferences and avoids flash of unstyled content.",
    date: "Jan 2026",
    readTime: "4 min read",
    content: `
Dark mode is no longer a nice-to-have — it's expected. But implementing it poorly can be worse than not having it at all. Let's look at how to get it right.

## The Flash Problem

The biggest challenge with dark mode in server-rendered apps is the dreaded "flash of wrong theme." The page renders with one theme, then JavaScript kicks in and switches to the correct one. It's jarring and unprofessional.

The solution? \`next-themes\` handles this elegantly by injecting a tiny script that runs before React hydration.

## Setting It Up

The setup is surprisingly straightforward:

\`\`\`tsx
// components/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
\`\`\`

The \`attribute="class"\` tells it to toggle the \`dark\` class on \`<html>\`, which pairs perfectly with Tailwind's \`darkMode: "class"\` configuration.

## Designing for Both Themes

The key to good dark mode isn't just inverting colors. You need to consider contrast, readability, and visual hierarchy in both modes independently.

For my portfolio, I use Tailwind's \`dark:\` prefix throughout:

\`\`\`tsx
<p className="text-stone-600 dark:text-stone-400">
  This text has good contrast in both modes.
</p>
\`\`\`

## The Theme Toggle

A common mistake is rendering the toggle before the component mounts, which causes hydration mismatches. Always gate the toggle behind a \`mounted\` state:

\`\`\`tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div className="w-9 h-9" />;
\`\`\`

## Tips for Great Dark Mode

- **Don't use pure black** — \`stone-950\` or similar dark greys are easier on the eyes
- **Reduce contrast slightly** in dark mode — \`stone-100\` instead of white for text
- **Test both modes** during development, not just at the end
- **Respect system preference** as the default, but let users override
    `,
  },
  {
    slug: "art-of-subtle-animations",
    title: "The Art of Subtle Animations",
    description:
      "Why less is more when it comes to web animations, and how Framer Motion makes it easy to add just the right amount of motion.",
    date: "Dec 2025",
    readTime: "6 min read",
    content: `
There's a fine line between a website that feels alive and one that feels like a theme park ride. The best animations are the ones users don't consciously notice — they just make everything feel *right*.

## The Problem with Over-Animation

We've all visited sites where every element bounces, slides, and fades in with dramatic flair. It's exhausting. Animation should serve the user experience, not showcase your technical skills.

Here are the signs you've gone too far:
- Users have to wait for animations to finish before they can interact
- The same animation plays every time a section scrolls into view
- Elements animate in from off-screen with large distances
- Multiple elements animate simultaneously in different directions

## Principles of Subtle Motion

### 1. Small Distances

Instead of sliding elements 100px, try 20–40px. The motion should be felt, not watched.

\`\`\`tsx
// Too much
initial={{ opacity: 0, y: 100 }}

// Just right
initial={{ opacity: 0, y: 20 }}
\`\`\`

### 2. Quick Durations

Keep transitions between 0.3 and 0.6 seconds. Anything longer feels sluggish on the web.

### 3. Animate Once

Use \`viewport={{ once: true }}\` so animations only play the first time an element enters view. Repeated animations on scroll feel broken.

### 4. Consistent Direction

Pick one direction and stick with it. If sections fade up, they should all fade up — don't mix fade-left, fade-right, and fade-up.

## Framer Motion Makes It Easy

Framer Motion's declarative API is perfect for this approach:

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {children}
</motion.div>
\`\`\`

The \`margin: "-100px"\` triggers the animation slightly before the element is fully in view, making it feel more natural.

## Staggered Animations

When you have a list of items, stagger the delay to create a cascade effect:

\`\`\`tsx
transition={{ duration: 0.4, delay: index * 0.08 }}
\`\`\`

Keep the stagger small (0.05–0.1s) so it feels cohesive rather than sequential.

## When to Skip Animation

Not everything needs to move. Static elements like headers, footers, and navigation should just be there. Save animation for:
- Content entering the viewport for the first time
- Interactive feedback (hover, click)
- State transitions (theme toggle, page navigation)
    `,
  },
  {
    slug: "typescript-tips-react-developers",
    title: "TypeScript Tips for React Developers",
    description:
      "Practical TypeScript patterns that make your React code safer and more maintainable without adding complexity.",
    date: "Nov 2025",
    readTime: "7 min read",
    content: `
TypeScript and React are a powerful combination, but it's easy to fall into patterns that add complexity without adding value. Here are practical tips I've learned from building real projects.

## 1. Let TypeScript Infer

One of the most common mistakes is over-annotating. TypeScript's inference is excellent — trust it.

\`\`\`tsx
// Unnecessary annotation
const [count, setCount] = useState<number>(0);

// Let it infer
const [count, setCount] = useState(0);
\`\`\`

Only add explicit types when the initial value doesn't tell the full story:

\`\`\`tsx
const [user, setUser] = useState<User | null>(null);
\`\`\`

## 2. Component Props Patterns

For components, define props as a type right above the component:

\`\`\`tsx
type CardProps = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export default function Card({ title, description, tags, href }: CardProps) {
  // ...
}
\`\`\`

Use \`type\` instead of \`interface\` for props — it's more flexible and works better with unions and intersections.

## 3. Children Prop

React provides a built-in type for components that accept children:

\`\`\`tsx
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
\`\`\`

\`React.ReactNode\` covers everything: strings, numbers, elements, arrays, fragments, and null.

## 4. Event Handlers

Don't reach for \`any\` with event handlers. React's type system has you covered:

\`\`\`tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\`

## 5. Discriminated Unions for State

Instead of optional fields, use discriminated unions to model state:

\`\`\`tsx
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
\`\`\`

This makes it impossible to access \`data\` without first checking that the status is "success."

## 6. The \`as const\` Trick

When defining arrays of objects (like navigation links), use \`as const\` to get literal types:

\`\`\`tsx
const links = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
] as const;
\`\`\`

This narrows the types from \`string\` to the specific literal values, which catches typos at compile time.

## 7. Avoid Enums

Use union types instead of enums. They're simpler, tree-shakeable, and work better with the rest of TypeScript:

\`\`\`tsx
// Instead of enum
type Theme = "light" | "dark" | "system";
\`\`\`

## Final Thought

The goal of TypeScript isn't to annotate everything — it's to catch bugs before they reach users. Write the minimum amount of types needed to make your code safe, and let inference handle the rest.
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}
