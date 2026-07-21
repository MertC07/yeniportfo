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

  const languages = [
    { name: "Python", percentage: 45, note: "YOLOv8, Computer Vision & AI Models", color: "bg-accent" },
    { name: "C# / .NET Core", percentage: 30, note: "ASP.NET Core & Enterprise APIs", color: "bg-blue-500" },
    { name: "TypeScript / React", percentage: 20, note: "Next.js 16 & Modern Web Applications", color: "bg-amber-400" },
    { name: "SQL & PostgreSQL", percentage: 5, note: "Relational Schemas & Query Optimization", color: "bg-emerald-400" },
  ];

  const featuredRepos = [
    {
      name: "yeniportfo",
      badge: "TypeScript",
      description: "Next.js 16, TypeScript ve TailwindCSS ile sıfırdan geliştirilmiş kişisel web portfolyosu.",
      url: "https://github.com/MertC07/yeniportfo",
      language: "TypeScript",
    },
    {
      name: "smart-road-safety-5g",
      badge: "Python",
      description: "TEKNOFEST 2026 — 5G bağlantılı ve YOLOv8 tabanlı gerçek zamanlı otonom yol güvenliği sistemi.",
      url: "https://github.com/MertC07",
      language: "Python / YOLO",
    },
    {
      name: "virtual-campus-360",
      badge: "C# / React",
      description: "Envanter takip entegrasyonlu 360° panoramik sanal tur platformu.",
      url: "https://github.com/MertC07",
      language: "C# / React",
    },
  ];

  return (
    <section id="github" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="04"
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

        {/* Code Stack Breakdown & Repos Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Language Stack Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex flex-col justify-between rounded-2xl border hairline bg-surface/40 p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <h4 className="font-display text-lg font-bold">Kodlama Dağılımı & Teknolojiler</h4>
              <p className="mt-1 text-xs text-muted">Aktif geliştirilen projelere göre dil ağırlıkları</p>

              <div className="mt-6 space-y-5">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{lang.name}</span>
                      <span className="font-mono text-accent">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE }}
                        className={`h-full ${lang.color}`}
                      />
                    </div>
                    <p className="microlabel text-[0.65rem] text-muted">{lang.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Featured GitHub Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex flex-col gap-4 lg:col-span-7"
          >
            <div className="flex items-center justify-between px-1">
              <h4 className="font-display text-lg font-bold">{githubSection.reposTitle}</h4>
              <span className="microlabel text-accent">public repos</span>
            </div>

            <div className="space-y-3">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between gap-3 rounded-xl border hairline bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-accent font-bold">/</span>
                      <h5 className="font-display text-base font-bold group-hover:text-accent transition-colors">
                        {repo.name}
                      </h5>
                    </div>
                    <span className="rounded-full border hairline px-2.5 py-0.5 font-mono text-[0.65rem] text-muted group-hover:border-accent/40 group-hover:text-foreground transition-colors">
                      {repo.badge}
                    </span>
                  </div>

                  <p className="text-xs text-muted line-clamp-2">{repo.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t hairline text-[0.65rem] text-muted">
                    <span>{repo.language}</span>
                    <span className="group-hover:text-accent transition-colors">GitHub'da Gör ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
