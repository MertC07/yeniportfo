"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  meta?: string;
  className?: string;
};

/**
 * Editorial section header: hairline rule, mono index + label,
 * optional right-aligned meta.
 */
export function SectionHeading({ index, label, meta, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8 }}
      className={cn("border-t hairline pt-4", className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="microlabel">
          <span className="text-accent">{index}</span>
          <span className="mx-3 select-none" aria-hidden>
            —
          </span>
          {label}
        </p>
        {meta && <p className="microlabel hidden sm:block">{meta}</p>}
      </div>
    </motion.div>
  );
}
