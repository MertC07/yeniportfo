"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";

export function Works() {
  const stackRef = useRef<HTMLDivElement>(null);
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
    </section>
  );
}
