"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Log
        </h2>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Thinking out loud while building.
        </p>
      </motion.div>

      <div className="mt-10 space-y-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/log/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-2"
            >
              <span className="text-sm text-neutral-400 dark:text-neutral-500 font-mono shrink-0 sm:w-36">
                {post.date}
              </span>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-600 mx-3">
                &raquo;
              </span>
              <span className="text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                {post.title}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
