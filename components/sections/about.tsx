"use client";

import { motion } from "motion/react";
import { about, experience, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading index="02" label="About & Experience" meta={profile.location} />

      <div className="mt-14 grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* Sticky manifesto column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-display-md font-bold leading-[1.1] tracking-tight"
          >
            {about.manifesto}
          </motion.blockquote>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE }}
                className="max-w-prose text-sm leading-relaxed text-muted sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Portrait placeholder frame */}
          <motion.figure
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-10 flex aspect-[5/4] max-w-sm flex-col justify-between overflow-hidden rounded-2xl border hairline bg-surface p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-6 select-none font-display text-[10rem] font-extrabold leading-none text-foreground/[0.05]"
            >
              {profile.monogram}
            </span>
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "var(--glow)" }}
            />
            <figcaption className="microlabel relative">
              Portrait — est. 2004
            </figcaption>
            <div className="relative">
              <p className="font-display text-xl font-bold">{profile.name}</p>
              <p className="microlabel mt-1">{profile.role}</p>
            </div>
          </motion.figure>
        </div>

        {/* Experience timeline */}
        <div>
          <p className="microlabel mb-2">Timeline</p>
          <ol>
            {experience.map((entry, i) => (
              <motion.li
                key={`${entry.period}-${entry.title}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                tabIndex={0}
                className="group border-t hairline py-7 outline-none transition-colors duration-300 first:border-t-0 hover:bg-surface/60 focus-visible:bg-surface/60 sm:px-4"
              >
                <div className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                  <p className="microlabel pt-1.5 text-accent">{entry.period}</p>
                  <div>
                    <h3 className="font-display text-xl font-bold sm:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {entry.place} · {entry.summary}
                    </p>
                    {/* Detail expands on hover / keyboard focus */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-lg pt-3 text-sm leading-relaxed text-foreground/80">
                          {entry.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
