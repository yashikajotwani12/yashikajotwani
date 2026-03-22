"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "HackerRank",
    role: "SDE 2",
    period: "Mar 2025 — Present",
    description:
      "Working as a backend engineer, building and maintaining scalable systems that power HackerRank's platform.",
  },
  {
    company: "HackerRank",
    role: "SDE 1",
    period: "2024 — Mar 2025",
    description:
      "Joined as a full-time backend engineer, contributing to core platform development and scaling backend services.",
  },
  {
    company: "HackerRank",
    role: "Software Developer Intern",
    period: "2023",
    description:
      "Interned on the engineering team, contributing to backend development and gaining hands-on experience with production systems.",
  },
  {
    company: "Google Summer of Code — OpenWisp",
    role: "Open Source Contributor",
    period: "2022",
    description:
      "Selected for GSoC 2022 with OpenWisp, an open-source network management project. Contributed to core features and collaborated with the global open-source community.",
  },
  {
    company: "Major League Hacking Fellowship — Solana Labs",
    role: "MLH Fellow",
    period: "2022",
    description:
      "Participated in the MLH Fellowship program, working on projects in collaboration with Solana Labs.",
  },
  {
    company: "Suborbital",
    role: "GitHub Extern",
    period: "2022",
    description:
      "Contributed to open-source projects at Suborbital as part of the GitHub Externship program.",
  },
];

export default function Experience() {
  return (
    <section className="py-12 sm:py-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Experience
      </h2>
      <div className="mt-10 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-stone-300 dark:bg-stone-700" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-10 pb-10 last:pb-0 group"
          >
            <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-stone-400 dark:border-stone-500 bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm group-hover:border-stone-900 dark:group-hover:border-stone-100 group-hover:scale-125 transition-all duration-300" />

            <div className="glass-subtle rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {exp.company}
              </h3>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {exp.period}
              </span>
            </div>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-1">
              {exp.role}
            </p>
            <p className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
              {exp.description}
            </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
