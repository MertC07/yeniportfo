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
 * Custom cursor: instant accent dot + silky smooth lerp trailing ring.
 * Displays a playful speech bubble with a header Mute / Unmute emoji toggle.
 */
export function Cursor() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [idleMessage, setIdleMessage] = useState<string | null>(null);

  // Mute & Sulky state
  const [isMuted, setIsMuted] = useState(false);
  const [sulkyMessage, setSulkyMessage] = useState<string | null>(null);

  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });

  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const activeRef = useRef(false);
  const hoveringRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const queueRef = useRef<number[]>([]);
  const isMutedRef = useRef(false);

  // Load initial mute state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mert_cursor_muted");
      if (saved === "true") {
        setIsMuted(true);
        isMutedRef.current = true;
      }
    } catch {
      // ignore
    }
  }, []);

  const handleMute = () => {
    const tripMsg = isEnglish
      ? "Fine! I'll shut up! 🙄 Not saying a single word, happy?!"
      : "Öff tamam sustum ya! 🙄 HİÇ konuşmuyorum tamam mı!";

    setSulkyMessage(tripMsg);

    setTimeout(() => {
      setIsMuted(true);
      isMutedRef.current = true;
      setSulkyMessage(null);
      setIdleMessage(null);
      try {
        localStorage.setItem("mert_cursor_muted", "true");
        window.dispatchEvent(new CustomEvent("mert-cursor-mute-changed", { detail: { muted: true } }));
      } catch {
        // ignore
      }
    }, 2200);
  };

  const handleUnmute = () => {
    setIsMuted(false);
    isMutedRef.current = false;
    try {
      localStorage.setItem("mert_cursor_muted", "false");
      window.dispatchEvent(new CustomEvent("mert-cursor-mute-changed", { detail: { muted: false } }));
    } catch {
      // ignore
    }

    const happyMsg = isEnglish
      ? "Yayy! Finally letting me talk again! 😄🎉"
      : "Yeyy! Sonunda konuşturdun beni! 😄🎉";

    setSulkyMessage(happyMsg);
    setTimeout(() => {
      setSulkyMessage(null);
    }, 2200);
  };

  // Listen to header toggle event
  useEffect(() => {
    const handleToggleEvent = () => {
      if (isMutedRef.current) {
        handleUnmute();
      } else {
        handleMute();
      }
    };

    window.addEventListener("mert-toggle-cursor-mute", handleToggleEvent);
    return () => window.removeEventListener("mert-toggle-cursor-mute", handleToggleEvent);
  }, [isEnglish]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const messages = isEnglish ? IDLE_MESSAGES_EN : IDLE_MESSAGES_TR;

    // Smooth Lerp loop for trailing ring
    const updateRingPosition = () => {
      if (activeRef.current) {
        const factor = hoveringRef.current ? 1.0 : 0.12;
        ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * factor;
        ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * factor;

        setRingPos({
          x: Math.round(ringRef.current.x * 10) / 10,
          y: Math.round(ringRef.current.y * 10) / 10,
        });
      }
      animFrameRef.current = requestAnimationFrame(updateRingPosition);
    };

    animFrameRef.current = requestAnimationFrame(updateRingPosition);

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

      mouseRef.current = { x: clientX, y: clientY };
      setDotPos({ x: clientX, y: clientY });

      if (!activeRef.current) {
        ringRef.current = { x: clientX, y: clientY };
        setRingPos({ x: clientX, y: clientY });
        activeRef.current = true;
        setActive(true);
      }

      if (hoveringRef.current) {
        ringRef.current = { x: clientX, y: clientY };
        setRingPos({ x: clientX, y: clientY });
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
      const isHover = !!target?.closest?.("a, button, [role='button']");

      if (isHover && !hoveringRef.current) {
        ringRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
        setRingPos({ x: mouseRef.current.x, y: mouseRef.current.y });
      }

      hoveringRef.current = isHover;
      setHovering(isHover);
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
  }, [isEnglish]);

  // Smart Viewport Edge Detection for Speech Bubble
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const isNearLeft = dotPos.x < 220;
  const isNearRight = dotPos.x > vw - 220;
  const isNearTop = dotPos.y < 120;
  const isNearBottom = dotPos.y > vh - 120;

  let animateProps = { opacity: 1, scale: 1, x: 0, y: -58 };
  let bubbleClass =
    "absolute whitespace-nowrap rounded-xl border border-accent/30 bg-background/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-md pointer-events-none";
  let tailClass =
    "absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-accent/30 bg-background/95";

  if (isNearTop && isNearLeft) {
    animateProps = { opacity: 1, scale: 1, x: 20, y: 20 };
    tailClass =
      "absolute -top-1 left-3 size-2 rotate-45 border-t border-l border-accent/30 bg-background/95";
  } else if (isNearTop && isNearRight) {
    animateProps = { opacity: 1, scale: 1, x: -20, y: 20 };
    bubbleClass += " -translate-x-full";
    tailClass =
      "absolute -top-1 right-3 size-2 rotate-45 border-t border-r border-accent/30 bg-background/95";
  } else if (isNearBottom && isNearLeft) {
    animateProps = { opacity: 1, scale: 1, x: 20, y: -45 };
    tailClass =
      "absolute -bottom-1 left-3 size-2 rotate-45 border-b border-l border-accent/30 bg-background/95";
  } else if (isNearBottom && isNearRight) {
    animateProps = { opacity: 1, scale: 1, x: -20, y: -45 };
    bubbleClass += " -translate-x-full";
    tailClass =
      "absolute -bottom-1 right-3 size-2 rotate-45 border-b border-r border-accent/30 bg-background/95";
  } else if (isNearLeft) {
    animateProps = { opacity: 1, scale: 1, x: 25, y: -18 };
    tailClass =
      "absolute -left-1 top-1/2 -translate-y-1/2 size-2 rotate-45 border-b border-l border-accent/30 bg-background/95";
  } else if (isNearRight) {
    animateProps = { opacity: 1, scale: 1, x: -25, y: -18 };
    bubbleClass += " -translate-x-full";
    tailClass =
      "absolute -right-1 top-1/2 -translate-y-1/2 size-2 rotate-45 border-t border-r border-accent/30 bg-background/95";
  } else if (isNearTop) {
    animateProps = { opacity: 1, scale: 1, x: 0, y: 25 };
    bubbleClass += " -translate-x-1/2";
    tailClass =
      "absolute -top-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-t border-l border-accent/30 bg-background/95";
  } else {
    animateProps = { opacity: 1, scale: 1, x: 0, y: -58 };
    bubbleClass += " -translate-x-1/2";
    tailClass =
      "absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-accent/30 bg-background/95";
  }

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-120 hidden md:block"
    >
      {/* 1. Instant Center Accent Dot */}
      <div
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`,
        }}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent transition-opacity duration-200"
      />

      {/* 2. Silky Smooth Trailing Ring */}
      <div
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
        className="absolute left-0 top-0"
      >
        <div
          className={cn(
            "size-8 rounded-full border transition-[scale,border-color,background-color] duration-200 ease-out",
            hovering
              ? "scale-125 border-accent/80 bg-accent/10 shadow-sm"
              : "scale-100 border-foreground/35"
          )}
        />
      </div>

      {/* 3. Playful Speech Bubble on Idle (With Sulky Trip Feature) */}
      <AnimatePresence>
        {(sulkyMessage || (idleMessage && !isMuted)) && (
          <motion.div
            style={{
              left: `${dotPos.x}px`,
              top: `${dotPos.y}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={animateProps}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={bubbleClass}
          >
            <div className="relative flex items-center gap-2">
              <span>{sulkyMessage || idleMessage}</span>
            </div>
            {/* Speech bubble tail pointer */}
            <div className={tailClass} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
