"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Editorial masked reveal: each line rises out of an overflow-hidden
 * mask with a stagger, once, when it enters the viewport.
 *
 * The observer watches the (unclipped) mask wrapper — observing the
 * translated span itself would never fire, since a fully clipped
 * element reports zero intersection.
 */
export function RevealText({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
}: RevealTextProps) {
  const maskRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(maskRef, { once: true, margin: "-10% 0px" });

  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span
          key={i}
          ref={i === 0 ? maskRef : undefined}
          aria-hidden
          className="block overflow-hidden"
        >
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
