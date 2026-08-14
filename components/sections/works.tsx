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

      {/* The way out of the stack. /work existed with nothing pointing at
          it, so the list page was reachable only by typing the URL. Here
          because it is where the stack ends and the reader is looking for
          what comes next. */}
      <div className="mt-16 flex justify-center border-t hairline pt-10">
        <Magnetic strength={0.15}>
          <Link
            href={localePath(locale, "/work")}
            className="group inline-flex items-center gap-3 font-display text-display-md font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 hover:text-accent"
          >
            {ui.workIndex.allProjects}
            <span
              aria-hidden
              className="text-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
            >
              →
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
