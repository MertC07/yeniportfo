"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { posts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);

export function Journal() {
  return (
    <section id="journal" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading index="06" label="Journal" meta="Notes on craft" />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {posts.map((post, i) => (
          <MotionLink
            key={post.slug}
            href={`/journal/${post.slug}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
            className="group flex flex-col justify-between rounded-xl border hairline bg-surface/50 p-6 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-accent/60"
          >
            <div>
              <div className="microlabel flex items-baseline justify-between">
                <span className="text-accent">{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
            </div>
            <div className="microlabel mt-9 flex items-center justify-between">
              <span>{post.readingTime} read</span>
              <span className="text-foreground transition-colors duration-300 group-hover:text-accent">
                Read ↗
              </span>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  );
}
