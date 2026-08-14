"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

/**
 * Legs swing ±30° on a ~5.5px shank, so a foot covers ~11px per gait cycle.
 * At a 0.18s cycle that works out to ~61px/s of ground; travelling slightly
 * under that keeps the feet from visibly sliding.
 */
const SPEED = 58;
const RUN_SPEED = 105;
const MOBILE_GAIT_FACTOR = 0.7;
const MOBILE_QUERY = "(max-width: 39.99rem)";
const GREET_MS = 1800;
const TURN_PAUSE = [420, 950] as const;
const PECK_EVERY = [5000, 8000] as const;
const PECK_MS = 1400;
const DROP_PAUSE_MS = 300;
const LIMIT_GAP = 10;

const INK = "#2a2118";

const SHAKE_WINDOW_MS = 900;
const SHAKE_REVERSALS = 4;
const QUEASY_MS = 3600;
const WHISPER_INTERVAL_MS = 16000;
const WHISPER_DURATION_MS = 4000;

const QUEASY_TR = [
  "Öğğ... sallamayı bırak 🤢",
  "Midem bulandı, biraz dur 🥴",
  "Salıncak değilim ben! 😵‍💫",
  "Bir daha yaparsan üstüne kusarım 🤮",
];

const QUEASY_EN = [
  "Ugh... stop shaking me 🤢",
  "I feel sick, hold still 🥴",
  "I am not a swing! 😵‍💫",
  "Do that again and I'll be sick on you 🤮",
];

const WHISPERS_TR = [
  "Mert dün gece yine YOLO modeli eğitiyordu... 🤖",
  "İSKİ stajında çaylar şirketten ☕",
  "TEKNOFEST 2026'ya az kaldı, 5Genç roket gibi 🚀",
  "Beni beslediğin için teşekkürler cik cik! 🐣",
  "Sanal Kampüs'te kayboldum, 360° döndürüp duruyorlar 😵‍💫",
  "Rosso Lounge'un pizzasından bana da ayırsalar keşke 🍕",
  "22 sertifika topladı ama beni hâlâ devriyede tutuyor 🏃",
  "Gece C# ve Python yazarken klavye sesinden uyuyamıyorum 😴",
  "Sağ tıkla bakayım, orada komik şeyler var 😉",
];

const WHISPERS_EN = [
  "Mert was up all night training YOLO models again... 🤖",
  "Tea is free at the İSKİ internship ☕",
  "TEKNOFEST 2026 is around the corner, 5Genç is ready 🚀",
  "Thanks for the grain treats, cheep cheep! 🐣",
  "I got lost in the 360° Virtual Campus tour 😵‍💫",
  "Wish they saved me some pizza from Rosso Lounge 🍕",
  "He collected 22 certs yet keeps me on patrol 🏃",
  "Can't sleep with all his Python & C# typing at night 😴",
  "Right click anywhere for dev easter eggs 😉",
];

const EAT_REACTIONS_TR = [
  "Ham ham! Çok lezzetli 🌾",
  "Cik cik! Teşekkürler 😋",
  "En sevdiğim buğday tanesi ✨",
  "Enerji depolandı! 🚀",
];

const EAT_REACTIONS_EN = [
  "Yum yum! Delicious 🌾",
  "Cheep cheep! Thank you 😋",
  "My favorite golden grain ✨",
  "Energy refueled! 🚀",
];

const between = ([min, max]: readonly [number, number]) =>
  min + Math.random() * (max - min);

type Grain = {
  id: number;
  x: number;
  eaten: boolean;
};

/** Walking pose, drawn facing right; the walk loop flips it to go left. */
function ChickSide() {
  return (
    <svg viewBox="0 0 26 26" width="26" height="26" fill="none">
      <g className="chick-part chick-leg-a" style={{ transformOrigin: "top center" }}>
        <path d="M9 17.5v4.6" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
        <path d="M7.6 22.4h2.8" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
      </g>
      <g className="chick-part chick-leg-b" style={{ transformOrigin: "top center" }}>
        <path d="M13 17.5v4.6" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11.6 22.4h2.8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <g className="chick-part chick-body" style={{ transformOrigin: "center" }}>
        <g className="chick-part chick-tail" style={{ transformOrigin: "right center" }}>
          <path d="M6.4 10.4 2.6 7.6l1.5 4.2-2.2 1.9 4.8 1.1z" fill="var(--chick-shade)" />
        </g>

        <ellipse cx="11.5" cy="13.2" rx="7" ry="6" fill="var(--chick-body)" />
        <ellipse cx="10.6" cy="13.8" rx="3.3" ry="2.5" fill="var(--chick-shade)" transform="rotate(-14 10.6 13.8)" />

        <g className="chick-part chick-head" style={{ transformOrigin: "center" }}>
          <circle cx="17.8" cy="7.2" r="4.6" fill="var(--chick-body)" />
          <path d="M21.9 6.7 25.3 8.2 21.9 9.7z" fill="var(--accent)" />
          <ellipse
            className="chick-part chick-eye"
            style={{ transformOrigin: "center" }}
            cx="19.1"
            cy="6.2"
            rx="0.95"
            ry="0.95"
            fill={INK}
          />
        </g>
      </g>
    </svg>
  );
}

/** Turned towards you — the pose it strikes when greeted. */
function ChickFront() {
  return (
    <svg viewBox="0 0 26 26" width="26" height="26" fill="none">
      <path d="M10.4 18v4.2" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9 22.5h2.8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M15.6 18v4.2" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14.2 22.5H17" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />

      <g className="chick-part chick-body" style={{ transformOrigin: "center" }}>
        <ellipse cx="13" cy="14.4" rx="7.4" ry="6" fill="var(--chick-body)" />
        <ellipse cx="6.6" cy="14.6" rx="2.1" ry="3.2" fill="var(--chick-shade)" />
        <ellipse cx="19.4" cy="14.6" rx="2.1" ry="3.2" fill="var(--chick-shade)" />

        <circle cx="13" cy="7.6" r="5" fill="var(--chick-body)" />
        <path d="M13 9.1 14.6 10.4 13 11.7 11.4 10.4z" fill="var(--accent)" />
        <ellipse
          className="chick-part chick-eye"
          style={{ transformOrigin: "center" }}
          cx="11.1"
          cy="6.9"
          rx="0.95"
          ry="0.95"
          fill={INK}
        />
        <ellipse
          className="chick-part chick-eye"
          style={{ transformOrigin: "center" }}
          cx="14.9"
          cy="6.9"
          rx="0.95"
          ry="0.95"
          fill={INK}
        />
      </g>
    </svg>
  );
}

export function HeaderChick() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const trackRef = useRef<HTMLDivElement>(null);
  const chickRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const dirRef = useRef(1); // 1 → right, -1 → left
  const pausedUntilRef = useRef(0);
  const peckUntilRef = useRef(0);
  const nextPeckAtRef = useRef(0);
  const lastFrameRef = useRef(0);
  const draggingRef = useRef(false);
  const greetingRef = useRef(false);
  const grabOffsetRef = useRef(0);

  const lastDragEndRef = useRef(0);
  const isDragActiveRef = useRef(false);

  const greetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const queasyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const queasyDeckRef = useRef<number[]>([]);
  const shakeDirRef = useRef(0);
  const reversalsRef = useRef<number[]>([]);
  const queasyRef = useRef(false);

  const whispersDeckRef = useRef<number[]>([]);
  const whisperTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextWhisperAtRef = useRef(0);

  const grainsRef = useRef<Grain[]>([]);
  const nextGrainIdRef = useRef(1);
  const speedRef = useRef(SPEED);

  const [greeting, setGreeting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isQueasyMessage, setIsQueasyMessage] = useState(false);
  const [grains, setGrains] = useState<Grain[]>([]);

  // Sound and speech mute state integration
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMutedRef = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    try {
      const savedMute = localStorage.getItem("mert_cursor_muted") === "true";
      setIsMuted(savedMute);
      isMutedRef.current = savedMute;
    } catch {
      // ignore
    }

    const handleMuteChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ muted?: boolean }>;
      if (typeof customEvt.detail?.muted === "boolean") {
        setIsMuted(customEvt.detail.muted);
        isMutedRef.current = customEvt.detail.muted;
        if (customEvt.detail.muted) {
          setActiveMessage(null);
        }
      }
    };

    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
      if (mobile) {
        setActiveMessage(null);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("mert-cursor-mute-changed", handleMuteChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mert-cursor-mute-changed", handleMuteChange);
    };
  }, []);

  const maxX = useCallback(() => {
    const track = trackRef.current;
    const chick = chickRef.current;
    if (!track || !chick) return 0;

    const full = track.clientWidth - chick.offsetWidth;
    const limit = document.querySelector("[data-chick-limit]");
    if (!limit) return Math.max(0, full);

    const stopBefore =
      limit.getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      chick.offsetWidth -
      LIMIT_GAP;

    return Math.max(0, Math.min(full, stopBefore));
  }, []);

  const paint = useCallback((resting: boolean) => {
    const chick = chickRef.current;
    if (!chick) return;
    const facing = greetingRef.current || queasyRef.current ? 1 : dirRef.current;
    chick.style.transform = `translateX(${xRef.current}px) scaleX(${facing})`;
    chick.classList.toggle("chick-resting", resting);

    if (bubbleRef.current) {
      bubbleRef.current.style.transform = `translateX(${Math.max(0, xRef.current - 20)}px)`;
    }
  }, []);

  const showWhisper = useCallback(
    (customText?: string) => {
      if (queasyRef.current || isMutedRef.current || isMobileRef.current) return;

      let text = customText;
      if (!text) {
        const pool = isEnglish ? WHISPERS_EN : WHISPERS_TR;
        if (whispersDeckRef.current.length === 0) {
          const deck = Array.from({ length: pool.length }, (_, i) => i);
          for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
          }
          whispersDeckRef.current = deck;
        }
        text = pool[whispersDeckRef.current.pop()!];
      }

      setIsQueasyMessage(false);
      setActiveMessage(text);

      if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
      whisperTimerRef.current = setTimeout(() => {
        setActiveMessage(null);
      }, WHISPER_DURATION_MS);
    },
    [isEnglish]
  );

  const dropGrain = useCallback(
    (targetX: number) => {
      const track = trackRef.current;
      if (!track) return;

      const max = maxX();
      const clampedX = Math.min(max + 10, Math.max(10, targetX));

      // Strictly maximum 1 grain on the field at any time
      const singleGrain: Grain = {
        id: nextGrainIdRef.current++,
        x: clampedX,
        eaten: false,
      };

      grainsRef.current = [singleGrain];
      setGrains([singleGrain]);

      // Wake chick up and turn towards the grain
      pausedUntilRef.current = 0;
    },
    [maxX]
  );

  const goQueasy = () => {
    if (isMutedRef.current || isMobileRef.current) {
      queasyRef.current = true;
      reversalsRef.current = [];
      if (queasyTimerRef.current) clearTimeout(queasyTimerRef.current);
      queasyTimerRef.current = setTimeout(() => {
        queasyRef.current = false;
      }, QUEASY_MS);
      return;
    }

    const pool = isEnglish ? QUEASY_EN : QUEASY_TR;
    if (queasyDeckRef.current.length === 0) {
      const deck = Array.from({ length: pool.length }, (_, i) => i);
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      queasyDeckRef.current = deck;
    }

    queasyRef.current = true;
    setIsQueasyMessage(true);
    setActiveMessage(pool[queasyDeckRef.current.pop()!]);
    reversalsRef.current = [];

    if (queasyTimerRef.current) clearTimeout(queasyTimerRef.current);
    queasyTimerRef.current = setTimeout(() => {
      queasyRef.current = false;
      setActiveMessage(null);
      setIsQueasyMessage(false);
    }, QUEASY_MS);
  };

  const noteShake = (from: number, to: number) => {
    const direction = to > from ? 1 : to < from ? -1 : 0;
    if (direction === 0) return;

    const now = performance.now();
    if (shakeDirRef.current !== 0 && direction !== shakeDirRef.current) {
      reversalsRef.current.push(now);
    }
    shakeDirRef.current = direction;

    reversalsRef.current = reversalsRef.current.filter(
      (t) => now - t < SHAKE_WINDOW_MS
    );

    if (reversalsRef.current.length >= SHAKE_REVERSALS && !queasyRef.current) {
      goQueasy();
    }
  };

  // Sync speed with media query
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => {
      speedRef.current = mq.matches ? SPEED * MOBILE_GAIT_FACTOR : SPEED;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Main frame loop
  useEffect(() => {
    let frame = 0;
    nextWhisperAtRef.current = performance.now() + 10000;

    const tick = (now: number) => {
      const track = trackRef.current;
      const chick = chickRef.current;

      if (track && chick) {
        const max = maxX();
        const dt = lastFrameRef.current
          ? Math.min(now - lastFrameRef.current, 60)
          : 0;
        const held =
          draggingRef.current || greetingRef.current || queasyRef.current;
        const pecking = now < peckUntilRef.current;
        const resting = held || pecking || now < pausedUntilRef.current;

        if (!nextPeckAtRef.current) {
          nextPeckAtRef.current = now + between(PECK_EVERY);
        }

        // Periodic random whisper
        if (
          now >= nextWhisperAtRef.current &&
          !held &&
          !activeMessage &&
          !isMutedRef.current &&
          !isMobileRef.current
        ) {
          showWhisper();
          nextWhisperAtRef.current = now + WHISPER_INTERVAL_MS + Math.random() * 8000;
        }

        // Check for active uneaten grains
        const activeGrains = grainsRef.current.filter((g) => !g.eaten);
        const closestGrain = activeGrains.length > 0 ? activeGrains[0] : null;

        if (closestGrain && !held) {
          const dist = closestGrain.x - xRef.current;
          dirRef.current = dist > 0 ? 1 : -1;

          // Close enough to eat!
          if (Math.abs(dist) <= 12) {
            closestGrain.eaten = true;
            grainsRef.current = grainsRef.current.filter((g) => g.id !== closestGrain.id);
            setGrains([...grainsRef.current]);

            // Eating action
            peckUntilRef.current = now + PECK_MS;
            pausedUntilRef.current = now + PECK_MS + 400;

            // Reaction whisper (if not muted and not mobile)
            if (!isMutedRef.current && !isMobileRef.current) {
              const reactions = isEnglish ? EAT_REACTIONS_EN : EAT_REACTIONS_TR;
              const react = reactions[Math.floor(Math.random() * reactions.length)];
              showWhisper(react);
            }
          } else if (!resting && dt) {
            // Run enthusiastically towards food!
            const currentSpeed = RUN_SPEED;
            xRef.current += dirRef.current * currentSpeed * (dt / 1000);
          }
        } else if (!resting && dt) {
          // Standard patrol
          xRef.current += dirRef.current * speedRef.current * (dt / 1000);

          if (xRef.current >= max) {
            xRef.current = max;
            dirRef.current = -1;
            pausedUntilRef.current = now + between(TURN_PAUSE);
          } else if (xRef.current <= 0) {
            xRef.current = 0;
            dirRef.current = 1;
            pausedUntilRef.current = now + between(TURN_PAUSE);
          } else if (now >= nextPeckAtRef.current) {
            peckUntilRef.current = now + PECK_MS;
            nextPeckAtRef.current = now + PECK_MS + between(PECK_EVERY);
          }
        }

        xRef.current = Math.min(max, Math.max(0, xRef.current));
        paint(resting);
        chick.classList.toggle("chick-pecking", pecking);
      }

      lastFrameRef.current = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [maxX, paint, isEnglish, showWhisper, activeMessage]);

  useEffect(
    () => () => {
      if (greetTimerRef.current) clearTimeout(greetTimerRef.current);
      if (queasyTimerRef.current) clearTimeout(queasyTimerRef.current);
      if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
    },
    []
  );

  const startGreeting = () => {
    if (greetTimerRef.current) clearTimeout(greetTimerRef.current);
    greetingRef.current = true;
    setGreeting(true);
  };

  const endGreeting = () => {
    if (greetTimerRef.current) clearTimeout(greetTimerRef.current);
    greetingRef.current = false;
    setGreeting(false);
  };

  const releaseAfterDelay = () => {
    if (greetTimerRef.current) clearTimeout(greetTimerRef.current);
    greetTimerRef.current = setTimeout(endGreeting, GREET_MS);
  };

  const positionFromPointer = (clientX: number) => {
    const track = trackRef.current;
    const chick = chickRef.current;
    if (!track || !chick) return;

    const max = maxX();
    const next =
      clientX - track.getBoundingClientRect().left - grabOffsetRef.current;
    const clamped = Math.min(max, Math.max(0, next));

    if (clamped > xRef.current + 0.5) dirRef.current = 1;
    else if (clamped < xRef.current - 0.5) dirRef.current = -1;

    noteShake(xRef.current, clamped);
    xRef.current = clamped;
    paint(true);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If a drag/shake was active or ended within 350ms, do NOT drop grain!
    if (
      isDragActiveRef.current ||
      performance.now() - lastDragEndRef.current < 350
    ) {
      return;
    }

    const track = trackRef.current;
    if (!track) return;
    const clickX = e.clientX - track.getBoundingClientRect().left;
    dropGrain(clickX);
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 px-5 sm:px-8 lg:px-12"
    >
      {/* Interactive Walking Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        title={
          isEnglish
            ? "Click to drop a treat for the chick! 🌾"
            : "Tıkla, civcive yem bırak! 🌾"
        }
        className="pointer-events-auto relative h-8 overflow-hidden cursor-crosshair group/track"
      >
        {/* Render Active Grains */}
        <AnimatePresence>
          {grains.map((grain) => (
            <motion.div
              key={grain.id}
              initial={{ scale: 0, y: -12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 1.4, y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ left: `${grain.x}px` }}
              className="absolute bottom-1 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10"
            >
              <span className="text-xs select-none filter drop-shadow-[0_2px_4px_rgba(255,190,0,0.5)]">
                🌾
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* The Chick Mascot */}
        <div
          ref={chickRef}
          data-cursor="chick"
          data-dragging={dragging ? "true" : undefined}
          style={
            {
              "--chick-body": isQueasyMessage ? "#a8c46a" : "#f7cf4e",
              "--chick-shade": isQueasyMessage ? "#8fae55" : "#e3b336",
            } as React.CSSProperties
          }
          onPointerEnter={startGreeting}
          onPointerLeave={() => {
            if (!draggingRef.current) endGreeting();
          }}
          onPointerDown={(e) => {
            const track = trackRef.current;
            if (!track) return;
            e.stopPropagation();
            isDragActiveRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            grabOffsetRef.current =
              e.clientX - track.getBoundingClientRect().left - xRef.current;
            draggingRef.current = true;
            setDragging(true);
            peckUntilRef.current = 0;
            nextPeckAtRef.current = performance.now() + between(PECK_EVERY);
            startGreeting();
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) positionFromPointer(e.clientX);
          }}
          onPointerUp={(e) => {
            if (!draggingRef.current) return;
            e.currentTarget.releasePointerCapture(e.pointerId);
            draggingRef.current = false;
            setDragging(false);
            isDragActiveRef.current = false;
            lastDragEndRef.current = performance.now();
            pausedUntilRef.current = performance.now() + DROP_PAUSE_MS;
            releaseAfterDelay();
          }}
          className={`pointer-events-auto absolute bottom-0 left-0 touch-none select-none leading-none cursor-grab active:cursor-grabbing${
            isQueasyMessage ? " chick-queasy" : ""
          }`}
        >
          {greeting || isQueasyMessage ? <ChickFront /> : <ChickSide />}

          {greeting && !isQueasyMessage && (
            <span
              style={{ animation: `chick-heart ${GREET_MS}ms ease-out forwards` }}
              className="absolute left-full top-0.5 text-[0.7rem] leading-none"
            >
              ❤️
            </span>
          )}
        </div>
      </div>

      {/* Speech / Whisper & Queasy Bubble (Hidden when muted or on mobile) */}
      <AnimatePresence>
        {!isMuted && !isMobile && activeMessage && (
          <motion.div
            ref={bubbleRef}
            initial={{ opacity: 0, y: -6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto absolute left-0 top-full mt-1.5 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-medium shadow-xl backdrop-blur-md z-30 ${
              isQueasyMessage
                ? "border-amber-500/40 bg-amber-950/90 text-amber-200"
                : "border-accent/40 bg-surface/95 text-foreground shadow-accent/5"
            }`}
          >
            {activeMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
