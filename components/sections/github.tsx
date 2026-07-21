"use client";

import { motion } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GithubStats() {
  const { ui } = useContent();

  const githubSection = ui.sections.github || {
    label: "GitHub & Kod Aktivitesi",
    meta: "@MertC07 hesabından canlı veriler",
    viewProfile: "GitHub Profilini Gör ↗",
    reposTitle: "Aktif Depolar & Projeler",
    commitsNote: "Düzenli commit'ler ve aktif kod geliştirme süreci",
  };

  return (
    <section id="github" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="05"
        label={githubSection.label}
        meta={githubSection.meta}
      />

      <div className="mt-12 space-y-8">
        {/* Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group relative overflow-hidden rounded-2xl border hairline bg-surface/60 p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent/40"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent font-bold font-mono text-sm border border-accent/30">
                  GH
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    @MertC07
                  </h3>
                  <p className="microlabel text-muted">GitHub · Software Engineering Student</p>
                </div>
              </div>
              <p className="text-sm text-muted max-w-xl">
                {githubSection.commitsNote}
              </p>
            </div>

            <a
              href="https://github.com/MertC07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-ink font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 shrink-0"
            >
              {githubSection.viewProfile}
            </a>
          </div>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex items-center justify-center rounded-2xl border hairline bg-surface/40 p-6 transition-all duration-300 hover:border-accent/30 overflow-x-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-stats.vercel.app/api?username=MertC07&show_icons=true&theme=transparent&title_color=f97316&text_color=e4e4e7&icon_color=f97316&border_color=27272a&hide_border=true"
              alt="Mert Ceren GitHub Stats"
              className="w-full max-w-md h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex items-center justify-center rounded-2xl border hairline bg-surface/40 p-6 transition-all duration-300 hover:border-accent/30 overflow-x-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=MertC07&layout=compact&theme=transparent&title_color=f97316&text_color=e4e4e7&icon_color=f97316&border_color=27272a&hide_border=true"
              alt="Mert Ceren Top Languages"
              className="w-full max-w-md h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Streak Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="flex items-center justify-center overflow-hidden rounded-2xl border hairline bg-surface/40 p-6 transition-all duration-300 hover:border-accent/30 overflow-x-auto"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=MertC07&theme=dark&background=0a0a0c&ring=f97316&fire=f97316&currStreakLabel=f3f3f3&border=27272a"
            alt="Mert Ceren GitHub Commit Streak"
            className="w-full max-w-2xl h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
