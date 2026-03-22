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
    <SectionWrapper className="py-12 sm:py-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Skills
      </h2>
      <div className="mt-8">
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
    </SectionWrapper>
  );
}
