"use client";

import SectionWrapper from "./SectionWrapper";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Python",
  "PostgreSQL",
  "Git",
  "Figma",
  "Docker",
];

export default function About() {
  return (
    <SectionWrapper className="py-12 sm:py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
        About
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          I&apos;m a developer passionate about building elegant, performant web
          applications. I focus on writing clean code and creating intuitive user
          experiences. When I&apos;m not coding, you&apos;ll find me exploring
          design systems, contributing to open source, or learning something new.
        </p>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full glass-subtle text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
