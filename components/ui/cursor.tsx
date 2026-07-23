"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const IDLE_MESSAGES = [
  "Hangi projeyi incelesek? 🤔",
  "Kod yazarken ben: ☕ + 💻",
  "TEKNOFEST 2026 kaptanı çalışıyor! 🚀",
  "YOLOv11 kareleri sayıyor... 🤖",
  "Beni burada unuttun sanırım 😅",
  "Sertifikaları gördün mü? Tam 22 tane! 📜",
  "5G sinyali full çekiyor 📶",
  "Bug var mı diye bakıyorum... 🐛🔍",
  "Kahve molası mı versek? ☕",
  "Bandırma Onyedi Eylül Üni 🎓",
  "Derleme tamamlandı, bekleniyor... ⚡",
  "Buradayım, kaybolmadım! 👋",
];

/**
 * Custom cursor: an accent dot that tracks instantly plus a smooth, snappy ring.
 * Displays a playful speech bubble when the cursor remains idle for a few seconds.
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [idleMessage, setIdleMessage] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast, snappy spring without sluggish lag
  const ringX = useSpring(x, { stiffness: 850, damping: 42, mass: 0.1 });
  const ringY = useSpring(y, { stiffness: 850, damping: 42, mass: 0.1 });

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastIndexRef = useRef<number>(-1);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const resetIdleTimer = () => {
      setIdleMessage(null);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        let nextIndex = Math.floor(Math.random() * IDLE_MESSAGES.length);
        if (nextIndex === lastIndexRef.current) {
          nextIndex = (nextIndex + 1) % IDLE_MESSAGES.length;
        }
        lastIndexRef.current = nextIndex;
        setIdleMessage(IDLE_MESSAGES[nextIndex]);
      }, 2500); // 2.5 seconds idle trigger
    };

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
      resetIdleTimer();
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.("a, button, [role='button']"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.classList.add("custom-cursor");

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
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
      {/* Pointer center dot */}
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />

      {/* Cursor tracking ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className={cn(
          "absolute left-0 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/35 transition-transform duration-200",
          hovering ? "scale-[1.8] border-accent/70 bg-accent/10" : "scale-100"
        )}
      />

      {/* Playful Speech Bubble on Idle */}
      <AnimatePresence>
        {idleMessage && (
          <motion.div
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, scale: 0.8, y: 12, x: 16 }}
            animate={{ opacity: 1, scale: 1, y: -45, x: 16 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute left-0 top-0 whitespace-nowrap rounded-xl border border-accent/30 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-md"
          >
            <div className="relative flex items-center gap-1.5">
              <span>{idleMessage}</span>
            </div>
            {/* Speech bubble tail pointer */}
            <div className="absolute -bottom-1 left-3 size-2 rotate-45 border-b border-r border-accent/30 bg-background/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
