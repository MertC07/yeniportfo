"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Custom cursor: an accent dot that tracks instantly plus a ring that
 * follows on a spring and grows over interactive elements. Activates
 * only for fine pointers; invisible until the first pointer move, so
 * SSR markup is unaffected.
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
    };
    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.("a, button, [role='button']"));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.classList.add("custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-120 hidden transition-opacity duration-300 md:block",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        className={cn(
          "absolute left-0 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/35 transition-transform duration-300",
          hovering ? "scale-[1.8] border-accent/70" : "scale-100"
        )}
      />
    </div>
  );
}
