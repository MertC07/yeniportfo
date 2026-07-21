"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Project } from "@/lib/data";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { localePath } from "@/lib/content";
import { Magnetic } from "@/components/ui/magnetic-button";

type ProjectCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

/**
 * One panel of the sticky project stack. The wrapper pins to the top
 * of the viewport; as the next card scrolls over, this one recedes
 * (scales down slightly) driven by the shared scroll progress.
 */
export function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: ProjectCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const { palette } = project;
  const locale = useLocale();
  const { ui } = useContent();

  // Subtle pointer-driven 3D tilt (mouse only)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 3);
    tiltY.set(px * 3);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      className="sticky top-0 flex h-svh items-center justify-center"
      style={{ perspective: 1400 }}
    >
      <motion.article
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          scale,
          rotateX,
          rotateY,
          top: `calc(-4svh + ${index * 26}px)`,
        }}
        className="group relative flex h-[80svh] min-h-[520px] w-full origin-top flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {/* Gradient-mesh artwork (swap for a real screenshot later) */}
        <div
          aria-hidden
          className="absolute inset-0 scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          style={{
            background: [
              `radial-gradient(110% 90% at 12% 12%, ${palette.from} 0%, transparent 55%)`,
              `radial-gradient(95% 85% at 88% 25%, ${palette.via} 0%, transparent 62%)`,
              `radial-gradient(130% 130% at 50% 105%, ${palette.to} 0%, #0a0a0b 100%)`,
              "#0a0a0b",
            ].join(", "),
          }}
        />
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-extrabold leading-none text-white/[0.045] sm:text-[24vw]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Scrim for text contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/35"
        />

        {/* Floating project mockup window */}
        {project.image && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none md:left-1/3 z-10 flex items-end justify-end">
            <div className="relative w-full h-[60%] md:h-[70%] max-w-[480px] mr-[-5%] mb-[-4%] translate-y-[8%] rotate-[-4deg] group-hover:translate-y-[3%] group-hover:rotate-[-2deg] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-75 group-hover:opacity-95">
              {/* Browser frame mockup wrapper */}
              <div className="w-full h-full rounded-tl-xl border border-white/15 bg-[#141416]/90 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                {/* Browser address bar */}
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 bg-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="ml-3 flex-1 h-3 rounded bg-white/10 max-w-[200px]" />
                </div>
                {/* Project screenshot */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-left-top"
                />
              </div>
            </div>
          </div>
        )}

        {/* Top meta row */}
        <div className="relative flex items-baseline justify-between p-6 sm:p-10 lg:p-12 z-20">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70">
            <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-3" aria-hidden>
              —
            </span>
            {project.category}
          </p>
          <div className="flex items-center gap-3">
            {project.status && (
              <span className="flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {project.status}
              </span>
            )}
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70">
              {project.year}
            </p>
          </div>
        </div>

        {/* Bottom content */}
        <div className="relative p-6 sm:p-10 lg:p-12 z-20">
          <h3 className="font-display text-display-lg font-extrabold uppercase leading-none tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <Magnetic>
              <Link
                href={localePath(locale, `/work/${project.slug}`)}
                aria-label={`${ui.projectCard.ctaAria} ${project.title}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
              >
                {ui.projectCard.cta}
                <span aria-hidden className="text-sm leading-none">
                  ↗
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
