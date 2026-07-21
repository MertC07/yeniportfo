"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;

/**
 * One oversized editorial pull-quote at a time. Quotes are stacked in
 * the same grid cell and crossfaded with CSS, auto-advancing on a
 * timer; the mono index buttons switch (and reset the timer).
 */
export function Testimonials() {
  const { testimonials, ui } = useContent();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const id = setInterval(
      () => setActive((current) => (current + 1) % testimonials.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [active, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="04"
        label={ui.sections.testimonials.label}
        meta={ui.sections.testimonials.meta}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14"
      >
        <div className="grid">
          {testimonials.map((testimonial, i) => (
            <figure
              key={testimonial.name}
              inert={i !== active}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-700",
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <blockquote>
                <p className="max-w-4xl font-display text-display-md font-bold leading-[1.12] tracking-tight">
                  <span aria-hidden className="text-accent">
                    “
                  </span>
                  {testimonial.quote}
                  <span aria-hidden className="text-accent">
                    ”
                  </span>
                </p>
              </blockquote>
              <figcaption className="microlabel mt-7">
                {testimonial.name}
                <span className="mx-2 select-none" aria-hidden>
                  —
                </span>
                <span className="text-foreground/70">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex gap-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-pressed={i === active}
              className={cn(
                "microlabel border-b pb-1 transition-colors duration-300",
                i === active
                  ? "border-accent text-foreground"
                  : "border-transparent hover:text-foreground"
              )}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
