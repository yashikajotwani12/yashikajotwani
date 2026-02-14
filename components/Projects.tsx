"use client";

import SectionWrapper from "./SectionWrapper";

const projects = [
  {
    title: "Project Alpha",
    description:
      "A full-stack web application for task management with real-time collaboration features.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Beta",
    description:
      "An open-source CLI tool that automates development workflow and boosts productivity.",
    tech: ["Node.js", "Python", "Docker"],
    link: "#",
  },
  {
    title: "Project Gamma",
    description:
      "A responsive design system and component library built for scalability and accessibility.",
    tech: ["React", "Tailwind CSS", "Figma"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <SectionWrapper className="py-12 sm:py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Projects
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group block p-6 glass rounded-xl hover:shadow-lg hover:shadow-stone-300/30 dark:hover:shadow-stone-900/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-32 bg-stone-200/50 dark:bg-stone-800/50 rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs border border-stone-300 dark:border-stone-700 rounded text-stone-500 dark:text-stone-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
