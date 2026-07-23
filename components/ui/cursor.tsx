"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const IDLE_MESSAGES_TR = [
  "Hangi projeyi incelesek? 🤔",
  "Kod yazarken ben: ☕ + 💻",
  "YOLOv11 kareleri sayıyor... 🤖",
  "Beni burada unuttun sanırım 😅",
  "Bug var mı diye bakıyorum... 🐛🔍",
  "Buradayım, kaybolmadım! 👋",
  "Yine mi aşağı kaydırıyorsun? 📜",
  "Sayfayı aşındırdın valla 😅",
  "Gözüm üzerinde 👀",
  "Chatbot'a bir merhaba desene! 🤖",
  "Kaydırma tekerleğin yorulmadı mı? 🖱️",
  "Projeleri beğendin mi? 🚀",
  "Aşağıdaki butonlar tıklanmak için var 🚀",
  "Bana mı bakıyorsun, projelere mi? 👀",
  "Piksel piksel inceledin valla 🔍",
  "Sayfada kaybolursan ses et! 📍",
  "Tıklamaktan korkma, bozulmaz! 🖱️💥",
  "Biraz daha durursan çay koyacağım ☕",
];

const IDLE_MESSAGES_EN = [
  "Which project shall we explore? 🤔",
  "Me while coding: ☕ + 💻",
  "YOLOv11 counting frames... 🤖",
  "I think you forgot me here 😅",
  "Looking for bugs... 🐛🔍",
  "Still here, not lost! 👋",
  "Scrolling down again? 📜",
  "You're wearing out the page 😅",
  "My eyes are on you 👀",
  "Say hi to the chatbot! 🤖",
  "Is your scroll wheel tired yet? 🖱️",
  "Liking the projects so far? 🚀",
  "The buttons below are meant to be clicked 🚀",
  "Looking at me or the projects? 👀",
  "Examined pixel by pixel 🔍",
  "Shout if you get lost on the page! 📍",
  "Don't be afraid to click, it won't break! 🖱️💥",
  "If you stay a bit longer, I'll pour tea ☕",
];

/**
 * Custom cursor: an accent dot plus a smooth ring locked in a single unified container.
 * Zero separation, zero lag, 100% perfectly centered at all times.
 * Displays a playful speech bubble when the cursor remains idle for a few seconds.
 */
export function Cursor() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [idleMessage, setIdleMessage] = useState<string | null>(null);

  const [pos, setPos] = useState({ x: -100, y: -100 });

  const activeRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const queueRef = useRef<number[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const messages = isEnglish ? IDLE_MESSAGES_EN : IDLE_MESSAGES_TR;

    const getNextIndex = () => {
      if (queueRef.current.length === 0) {
        const deck = Array.from({ length: messages.length }, (_, i) => i);
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        if (deck[deck.length - 1] === lastIndexRef.current && deck.length > 1) {
          [deck[deck.length - 1], deck[0]] = [deck[0], deck[deck.length - 1]];
        }
        queueRef.current = deck;
      }
      const nextIndex = queueRef.current.pop()!;
      lastIndexRef.current = nextIndex;
      return nextIndex;
    };

    const resetIdleTimer = () => {
      setIdleMessage(null);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        const nextIndex = getNextIndex();
        setIdleMessage(messages[nextIndex]);
      }, 2500); // 2.5 seconds idle trigger
    };

    const onMove = (e: PointerEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      setPos({ x: clientX, y: clientY });

      if (!activeRef.current) {
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
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [isEnglish]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-120 hidden md:block"
    >
      {/* Single Unified Container for Ring & Dot */}
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
        className="absolute left-0 top-0 size-8 flex items-center justify-center pointer-events-none"
      >
        {/* Ring centered around dot */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-200 ease-out",
            hovering
              ? "scale-125 border-accent/80 bg-accent/10 shadow-sm"
              : "scale-100 border-foreground/35"
          )}
        />

        {/* Center Accent Dot */}
        <div className="size-1.5 rounded-full bg-accent" />

        {/* Playful Speech Bubble on Idle - Perfectly Centered Above Cursor Dot */}
        <AnimatePresence>
          {idleMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -48 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-accent/30 bg-background/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-md"
            >
              <div className="relative flex items-center gap-1.5">
                <span>{idleMessage}</span>
              </div>
              {/* Speech bubble tail pointer centered at bottom pointing at cursor */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-accent/30 bg-background/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
