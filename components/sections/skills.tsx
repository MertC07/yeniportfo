"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { techMarquee, type Skill } from "@/lib/data";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const DISCIPLINES: Array<Skill["discipline"]> = [
  "AI / ML",
  "Backend",
  "Frontend",
  "Tooling",
];

export function Skills() {
  const [active, setActive] = useState<Skill["discipline"] | null>(null);
  const { skillTiers, ui } = useContent();

  // Marquee leans with scroll velocity — texture that reacts to the reader
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewRaw = useTransform(velocity, [-1200, 1200], [-4, 4]);
  const skewX = useSpring(skewRaw, { stiffness: 220, damping: 32 });

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="03"
          label={ui.sections.skills.label}
          meta={ui.sections.skills.meta}
        />

        {/* Discipline filter — hover to highlight, click/tap to pin */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          onMouseLeave={() => setActive(null)}
        >
          {DISCIPLINES.map((discipline) => (
            <button
              key={discipline}
              type="button"
              aria-pressed={active === discipline}
              onMouseEnter={() => setActive(discipline)}
              onClick={() =>
                setActive((current) => (current === discipline ? null : discipline))
              }
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300",
                active === discipline
                  ? "border-accent bg-accent text-accent-ink"
                  : "hairline text-muted hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {discipline}
            </button>
          ))}
        </div>

        {/* Tier columns */}
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {skillTiers.map((tier, tierIndex) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: tierIndex * 0.1, ease: EASE }}
            >
              <div className="border-t hairline pt-4">
                <h3 className="font-display text-2xl font-bold">{tier.tier}</h3>
                <p className="mt-1 text-sm text-muted">{tier.blurb}</p>
              </div>
              <ul className="mt-6 space-y-3">
                {tier.skills.map((skill) => {
                  const dimmed = active !== null && skill.discipline !== active;
                  return (
                    <li
                      key={skill.name}
                      className={cn(
                        "flex items-baseline justify-between gap-4 rounded-xl border hairline bg-surface/50 px-4 py-3.5 transition-all duration-400",
                        dimmed
                          ? "opacity-30"
                          : "opacity-100 hover:-translate-y-0.5 hover:border-accent/60"
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium sm:text-base">{skill.name}</p>
                        <p className="microlabel mt-0.5 normal-case tracking-normal">
                          {skill.note}
                        </p>
                      </div>
                      <span className="microlabel shrink-0 text-accent">
                        {skill.discipline}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="mt-20 border-y hairline py-6 sm:mt-24">
        <motion.div style={{ skewX }}>
          <Marquee
            items={techMarquee}
            itemClassName="font-display text-2xl font-bold uppercase tracking-tight text-muted sm:text-4xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
