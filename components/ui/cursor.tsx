"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const IDLE_MESSAGES = [
  "Hangi projeyi incelesek? 🤔",
  "Kod yazarken ben: ☕ + 💻",
  "YOLOv11 kareleri sayıyor... 🤖",
  "Beni burada unuttun sanırım 😅",
  "Bug var mı diye bakıyorum... 🐛🔍",
  "Kahve molası mı versek? ☕",
  "Buradayım, kaybolmadım! 👋",
  "Yine mi aşağı kaydırıyorsun? 📜",
  "Sayfayı aşındırdın valla 😅",
  "Gözüm üzerinde 👀",
  "Chatbot'a bir merhaba desene! 🤖",
  "Kaydırma tekerleğin yorulmadı mı? 🖱️",
  "Hâlâ buradaysan bir çay söyle ☕",
  "Teknolojiye meraklıyız galiba 💡",
  "Projeleri beğendin mi? 🚀",
];

/**
 * Custom cursor: an accent dot that tracks instantly plus a smooth, snappy ring.
 * Uses GPU lerp math to guarantee zero off-screen overshoot and buttery smooth tracking.
 * Displays a playful speech bubble when the cursor remains idle for a few seconds.
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [idleMessage, setIdleMessage] = useState<string | null>(null);

  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });

  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const activeRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastIndexRef = useRef<number>(-1);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    // Smooth animation loop using lerp (0 overshoot guarantee)
    const updateRingPosition = () => {
      if (activeRef.current) {
        ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.25;
        ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.25;

        setRingPos({
          x: Math.round(ringRef.current.x * 100) / 100,
          y: Math.round(ringRef.current.y * 100) / 100,
        });
      }
      animFrameRef.current = requestAnimationFrame(updateRingPosition);
    };

    animFrameRef.current = requestAnimationFrame(updateRingPosition);

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
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseRef.current = { x: clientX, y: clientY };
      setDotPos({ x: clientX, y: clientY });

      if (!activeRef.current) {
        ringRef.current = { x: clientX, y: clientY };
        setRingPos({ x: clientX, y: clientY });
        activeRef.current = true;
        setActive(true);
      }

      resetIdleTimer();
    };

    const onLeave = () => {
      activeRef.current = false;
      setActive(false);
      setIdleMessage(null);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.("a, button, [role='button']"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.documentElement.classList.add("custom-cursor");

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-120 hidden md:block"
    >
      {/* Pointer center dot */}
      <div
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`,
        }}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent transition-opacity duration-200"
      />

      {/* Smooth tracking ring */}
      <div
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
        className={cn(
          "absolute left-0 top-0 size-8 rounded-full border border-foreground/35 transition-transform duration-150 ease-out",
          hovering ? "scale-[1.8] border-accent/70 bg-accent/10" : "scale-100"
        )}
      />

      {/* Playful Speech Bubble on Idle */}
      <AnimatePresence>
        {idleMessage && (
          <motion.div
            style={{
              left: `${ringPos.x}px`,
              top: `${ringPos.y}px`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 12, x: 16 }}
            animate={{ opacity: 1, scale: 1, y: -45, x: 16 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute whitespace-nowrap rounded-xl border border-accent/30 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-md"
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
