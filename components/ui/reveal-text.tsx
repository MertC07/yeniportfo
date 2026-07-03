"use client";

import { motion } from "motion/react";
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
 */
export function RevealText({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
}: RevealTextProps) {
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
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
