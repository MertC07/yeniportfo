"use client";

import { motion } from "motion/react";
import { awardsGallery } from "@/lib/data";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Awards() {
  const { awards, ui } = useContent();

  if (!awards.length) return null;

  return (
    <section id="awards" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="06"
        label={ui.sections.awards.label}
        meta={ui.sections.awards.meta}
      />

      <ol className="mt-10">
        {awards.map((award, i) => (
          <motion.li
            key={`${award.year}-${award.title}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t hairline py-6 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[3.5rem_1fr_auto] sm:px-4"
          >
            <span className="microlabel text-accent">0{i + 1}</span>
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {award.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {award.issuer} · {award.project}
              </p>
            </div>
            <span className="microlabel">{award.year}</span>
          </motion.li>
        ))}
      </ol>

      {/* Photo strip — drifts left-to-right (reversed marquee), pauses on
          hover. Rows are duplicated so the -50% keyframe loops seamlessly. */}
      {awardsGallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max animate-marquee will-change-transform [animation-direction:reverse] [animation-duration:55s] hover:[animation-play-state:paused]">
            {[false, true].map((hidden) => (
              <div
                key={String(hidden)}
                aria-hidden={hidden || undefined}
                className="flex shrink-0 gap-4 pr-4"
              >
                {awardsGallery.map((src, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={src}
                    src={src}
                    alt={hidden ? "" : `${ui.sections.awards.label} — ${i + 1}`}
                    loading="lazy"
                    className="h-44 w-auto rounded-xl border hairline object-cover sm:h-56"
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
