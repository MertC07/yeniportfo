"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll } from "motion/react";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { localePath } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Magnetic } from "@/components/ui/magnetic-button";

export function Works() {
  const stackRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { projects, ui } = useContent();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="01"
        label={ui.sections.work.label}
        meta={`${projects.length} ${ui.sections.work.metaSuffix}`}
      />

      <div ref={stackRef} className="mt-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            targetScale={1 - (projects.length - i) * 0.04}
          />
        ))}
      </div>

      {/* The way out of the stack — /work was reachable only by typing the
          URL before this.

          Deliberately the same pill as the "view case" control on each
          card, because it is the same kind of act: one more way through to
          a project page. It was display type under a rule to begin with,
          which said the section's own name a second time, made the loudest
          thing here the link away from the work rather than the work, and
          drew a closing line across a page that carries on into About
          directly underneath. No rule of its own either — the next
          section's heading opens with one a moment later. */}
      <div className="mt-14 flex justify-center">
        <Magnetic strength={0.15}>
          <Link
            href={localePath(locale, "/work")}
            className="inline-flex items-center gap-2 rounded-full border hairline px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            {ui.workIndex.allProjects}
            <span aria-hidden className="text-sm leading-none">
              ↗
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
