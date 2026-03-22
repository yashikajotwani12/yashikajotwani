"use client";

import { motion } from "framer-motion";
import { posts } from "@/data/posts";

export default function Log() {
  return (
    <section className="pb-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Log
        </h2>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Thinking out loud while building.
        </p>
      </motion.div>

      <div className="mt-10 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-stone-300 dark:bg-stone-700" />

        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
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
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400 shrink-0">
                  <span>{post.date}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <p className="mt-2 text-stone-600 dark:text-stone-400 leading-relaxed">
                {post.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
