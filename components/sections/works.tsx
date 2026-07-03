"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";

export function Works() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="01"
        label="Selected Works"
        meta={`${projects.length} projects — 2024 / 2026`}
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
