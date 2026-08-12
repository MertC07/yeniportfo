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
  "Asistana soracağına bana sorsana 🙄",
  "Asistan mı ben mi? Bir karar ver 😤",
  "O chatbot'un benden fazla nesi var? 😒",
  "Ben de buradayım ha, unutma 👀",
  "İmleçim diye ciddiye almıyorsun beni 🥲",
  "Sen bilirsin, ben bir şey demiyorum... 😑",
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
  "Ask me instead of that assistant 🙄",
  "The assistant or me? Pick one 😤",
  "What's that chatbot got that I haven't? 😒",
  "I'm right here too, you know 👀",
  "You don't take me seriously, I'm just a cursor 🥲",
  "Suit yourself. Not saying a word... 😑",
];

/** Fired when the page is flung, not merely scrolled. */
const SCROLL_DOWN_TR = [
  "Yavaş ol biraz, başım döndü 😵‍💫",
  "Bu hızda iniyorsan kemer tak 🎢",
  "Kaydırma tekerini kırmaya mı çalışıyorsun? 🌀",
  "Iıı, çok hızlı indik aşağı 🫠",
];

const SCROLL_UP_TR = [
  "Yukarı fırladık, midem ağzıma geldi 😵",
  "Asansör mü bu? 🛗",
  "Bir şey mi kaçırdın, niye geri döndük? 🤨",
  "Roket gibi çıktık valla 🚀",
];

const SCROLL_DOWN_EN = [
  "Slow down, you're making me dizzy 😵‍💫",
  "Buckle up if we're going that fast 🎢",
  "Trying to snap that scroll wheel? 🌀",
  "Whoa, that was a long way down 🫠",
];

const SCROLL_UP_EN = [
  "Shot straight up — my stomach dropped 😵",
  "Is this an elevator? 🛗",
  "Miss something? Why are we back up here? 🤨",
  "That was practically a launch 🚀",
];

/**
 * Flick speed that counts as "flung", and how long before it can nag again.
 * Lenis eases the wheel out over several frames, so peak velocity here is
 * lower than a raw native scroll: a wheel notch lands around 300px/s and a
 * hard fling clears 3000px/s.
 */
const FAST_SCROLL_PX_PER_SEC = 2000;
const SCROLL_REACTION_COOLDOWN = 9000;
const SCROLL_REACTION_MS = 2600;

/**
 * Custom cursor: instant accent dot + silky smooth lerp trailing ring.
 * Displays a playful speech bubble with a header Mute / Unmute emoji toggle.
 */
export function Cursor() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  // The ring is larger than the header chick and would bury it, so the
  // custom cursor steps aside and lets the native grab cursor show.
  const [overChick, setOverChick] = useState(false);
  const [idleMessage, setIdleMessage] = useState<string | null>(null);
  /** Talks over the idle deck when the page gets flung around. */
  const [reactionMessage, setReactionMessage] = useState<string | null>(null);

  // Mute & Sulky state
  const [isMuted, setIsMuted] = useState(false);
  const [sulkyMessage, setSulkyMessage] = useState<string | null>(null);

  /**
   * Where the speech bubble sits. Only set when a message appears, so the
   * bubble is placed once rather than re-measured on every mouse move.
   */
  const [bubbleAnchor, setBubbleAnchor] = useState({ x: -100, y: -100 });

  /**
   * The dot and the ring are moved by writing transforms straight onto these
   * nodes from the animation loop. Routing a pointer position through React
   * state instead would re-render this whole component on every mouse move
   * and again on every frame — a few thousand renders a minute, all of them
   * throwing away identical markup.
   */
  const dotElRef = useRef<HTMLDivElement | null>(null);
  const ringElRef = useRef<HTMLDivElement | null>(null);

  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const activeRef = useRef(false);
  const hoveringRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const queueRef = useRef<number[]>([]);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);
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

    setBubbleAnchor({ ...mouseRef.current });
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

    setBubbleAnchor({ ...mouseRef.current });
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

    /**
     * Moves both pieces once a frame: the dot pinned to the pointer, the ring
     * easing after it. Transforms are written straight to the nodes, so a
     * mouse crossing the screen costs no React work at all.
     */
    const paint = () => {
      if (activeRef.current) {
        const factor = hoveringRef.current ? 1.0 : 0.12;
        ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * factor;
        ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * factor;

        const dot = dotElRef.current;
        if (dot) {
          dot.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
        }

        const ring = ringElRef.current;
        if (ring) {
          ring.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
      animFrameRef.current = requestAnimationFrame(paint);
    };

    animFrameRef.current = requestAnimationFrame(paint);

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

    /** Same shuffled-deck rotation, for the short scroll-reaction lists. */
    const makePicker = (list: string[]) => {
      let deck: number[] = [];
      let last = -1;
      return () => {
        if (deck.length === 0) {
          deck = Array.from({ length: list.length }, (_, i) => i);
          for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
          }
          if (deck[deck.length - 1] === last && deck.length > 1) {
            [deck[deck.length - 1], deck[0]] = [deck[0], deck[deck.length - 1]];
          }
        }
        const index = deck.pop()!;
        last = index;
        return list[index];
      };
    };

    const pickScrollDown = makePicker(isEnglish ? SCROLL_DOWN_EN : SCROLL_DOWN_TR);
    const pickScrollUp = makePicker(isEnglish ? SCROLL_UP_EN : SCROLL_UP_TR);

    let lastScrollY = window.scrollY;
    let lastScrollAt = performance.now();
    let lastReactionAt = 0;

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastScrollAt;

      // Ignore the first sample and anything too small to measure against.
      if (dt >= 16) {
        const velocity = ((y - lastScrollY) / dt) * 1000;

        if (
          Math.abs(velocity) > FAST_SCROLL_PX_PER_SEC &&
          now - lastReactionAt > SCROLL_REACTION_COOLDOWN &&
          !isMutedRef.current
        ) {
          lastReactionAt = now;
          setBubbleAnchor({ ...mouseRef.current });
          setReactionMessage(velocity > 0 ? pickScrollDown() : pickScrollUp());
          if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
          reactionTimerRef.current = setTimeout(
            () => setReactionMessage(null),
            SCROLL_REACTION_MS
          );
        }

        lastScrollY = y;
        lastScrollAt = now;
      }
    };

    const resetIdleTimer = () => {
      setIdleMessage(null);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        const nextIndex = getNextIndex();
        setBubbleAnchor({ ...mouseRef.current });
        setIdleMessage(messages[nextIndex]);
      }, 2500); // 2.5 seconds idle trigger
    };

    const onMove = (e: PointerEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseRef.current = { x: clientX, y: clientY };

      if (!activeRef.current) {
        ringRef.current = { x: clientX, y: clientY };
        activeRef.current = true;
        setActive(true);
      }

      if (hoveringRef.current) {
        ringRef.current = { x: clientX, y: clientY };
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
      const onChick = !!target?.closest?.('[data-cursor="chick"]');
      setOverChick(onChick);

      const isHover =
        !onChick && !!target?.closest?.("a, button, [role='button']");

      if (isHover && !hoveringRef.current) {
        ringRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      }

      hoveringRef.current = isHover;
      setHovering(isHover);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.documentElement.classList.add("custom-cursor");

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [isEnglish]);

  // Smart Viewport Edge Detection for Speech Bubble
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const isNearLeft = bubbleAnchor.x < 220;
  const isNearRight = bubbleAnchor.x > vw - 220;
  const isNearTop = bubbleAnchor.y < 120;
  const isNearBottom = bubbleAnchor.y > vh - 120;

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

  if (!active || overChick) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999999] hidden md:block"
    >
      {/* 1. Instant Center Accent Dot — positioned by the frame loop */}
      <div
        ref={dotElRef}
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent transition-opacity duration-200"
      />

      {/* 2. Silky Smooth Trailing Ring — likewise */}
      <div
        ref={ringElRef}
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
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
        {(sulkyMessage || ((reactionMessage || idleMessage) && !isMuted)) && (
          <motion.div
            style={{
              left: `${bubbleAnchor.x}px`,
              top: `${bubbleAnchor.y}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={animateProps}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={bubbleClass}
          >
            <div className="relative flex items-center gap-2">
              <span>{sulkyMessage || reactionMessage || idleMessage}</span>
            </div>
            {/* Speech bubble tail pointer */}
            <div className={tailClass} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
