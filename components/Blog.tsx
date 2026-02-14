"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/posts";

export default function Blog() {
  return (
    <section className="py-12 sm:py-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Blog
      </h2>
      <p className="mt-4 text-stone-600 dark:text-stone-400">
        Thoughts on development, design, and building for the web.
      </p>
      <div className="mt-10 space-y-1">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block p-5 mb-3 glass-subtle rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
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
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
