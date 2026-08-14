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

          Pulled up into dead space rather than pushed down. Each card is
          80svh centred in a full-viewport sticky wrapper, so the last
          wrapper ends in an empty band the link was sitting below — which
          is where the gap came from and why it grew on taller screens.

          The band is smaller than that arithmetic suggests, because the
          card is also nudged down by `top: calc(-4svh + index*26px)`:

            band = (H − max(0.8H, 520)) / 2 + 0.04H − 52

          At 1300px tall that is 130px, at 812 it is 62, and at 600 the
          520px floor collapses it to 12 — where a 4svh pull already left
          the link close enough that easing it further would risk the
          artwork on short windows. Hence the height gate: above 720px the
          band is at least 49px and 3svh of it is safe to take back
          (leaving it sitting a little lower in the band, roughly centred,
          rather than pinned to the top), below that the gap is already
          small enough to leave alone.

          No rule above it either, which would have separated it from the
          work it belongs to and put a second horizontal line a short way
          above the one the next section's heading opens with. */}
      <div className="mt-2 flex justify-center [@media(min-height:720px)]:-mt-[3svh]">
        <Magnetic strength={0.35}>
          <Link
            href={localePath(locale, "/work")}
            className="group inline-flex items-baseline gap-4 font-display text-display-md font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 hover:text-accent"
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
