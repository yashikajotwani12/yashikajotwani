"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Tech Corp",
    role: "Senior Frontend Developer",
    period: "2024 — Present",
    description:
      "Leading the frontend architecture and building scalable web applications with React and TypeScript. Mentoring junior developers and driving best practices.",
  },
  {
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2022 — 2024",
    description:
      "Built and shipped multiple products from scratch using Next.js and Node.js. Implemented CI/CD pipelines and improved deployment workflows.",
  },
  {
    company: "Digital Agency",
    role: "Frontend Developer",
    period: "2021 — 2022",
    description:
      "Developed responsive web applications and interactive interfaces for various clients. Worked closely with designers to deliver pixel-perfect implementations.",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2020 — 2021",
    description:
      "Designed and developed websites and web applications for small businesses and startups. Managed projects end-to-end from requirements to deployment.",
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
