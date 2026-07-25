"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

type Position = {
  x: number;
  y: number;
};

// Kept parallel: index N is the same joke in both languages, so switching
// locale mid-rotation never replays the joke you just saw.
const COPY_MESSAGES_TR = [
  "Hop hemşerim nereye kopyalıyorsun? 🤨 Kaynak göster bari!",
  "Ctrl+C yaptın ama Ctrl+V yaparken vicdanın sızlayacak... 🤫",
  "Kopyala kopyala... Sonra 'Senior Developer'ım dersin 😅",
];

const COPY_MESSAGES_EN = [
  "Hey buddy where are you copying that? 🤨 At least give credit!",
  "Ctrl+C done, but your conscience will hurt on Ctrl+V... 🤫",
  "Copy away... and then call yourself a Senior Dev 😅",
];

export function ContextMenu() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const copyQueueRef = useRef<number[]>([]);
  const lastCopyIndexRef = useRef<number>(-1);
  // Clicking a menu button clears the page selection, so remember what was
  // highlighted at the moment the menu opened.
  const selectionRef = useRef("");

  // 1. Right Click Context Menu Listener with Capture Phase Priority
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Allow native browser menu if Shift key is held down
      if (e.shiftKey) return;

      e.preventDefault();
      e.stopPropagation();
      if ("stopImmediatePropagation" in e) {
        (e as MouseEvent).stopImmediatePropagation();
      }

      selectionRef.current = window.getSelection()?.toString().trim() ?? "";

      const x = Math.min(e.clientX, window.innerWidth - 270);
      const y = Math.min(e.clientY, window.innerHeight - 300);

      setPos({ x, y });
      setIsOpen(true);
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Ignore right click so menu opens smoothly without instant auto-close
      if (e.button === 2) return;

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 2. Copy Event Listener (Hilarious Copy Toast - v2.6.2 Fresh Bundle)
  useEffect(() => {
    const messages = isEnglish ? COPY_MESSAGES_EN : COPY_MESSAGES_TR;

    // Shuffled deck instead of a plain random pick: every message plays once
    // before any of them repeats, and a fresh shuffle never leads with the
    // message that just played — so you never see the same one twice in a row.
    const nextMessage = () => {
      if (copyQueueRef.current.length === 0) {
        const deck = Array.from({ length: messages.length }, (_, i) => i);
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        // Cards are drawn off the end, so guard the last slot, not the first.
        if (deck[deck.length - 1] === lastCopyIndexRef.current && deck.length > 1) {
          [deck[deck.length - 1], deck[0]] = [deck[0], deck[deck.length - 1]];
        }
        copyQueueRef.current = deck;
      }
      const index = copyQueueRef.current.pop()!;
      lastCopyIndexRef.current = index;
      return messages[index];
    };

    const handleCopy = () => {
      const msg = nextMessage();

      setToastMessage(msg);
      setTimeout(() => {
        setToastMessage((prev) => (prev === msg ? null : prev));
      }, 3200);
    };

    window.addEventListener("copy", handleCopy);
    return () => window.removeEventListener("copy", handleCopy);
  }, [isEnglish]);

  // Action handlers
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const handleToggleMute = () => {
    window.dispatchEvent(new CustomEvent("mert-toggle-cursor-mute"));
    setIsOpen(false);
  };

  // The menu replaces the native one, so this item has to do the copying
  // itself — the browser no longer does it for us.
  const handleCopySelection = async () => {
    const text = selectionRef.current;

    if (!text) {
      triggerToast(
        isEnglish
          ? "📋 Select the text you want first, then right-click!"
          : "📋 Önce kopyalamak istediğin metni seç, sonra sağ tıkla!"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      triggerToast(
        isEnglish
          ? "🤫 Copying? At least give credit: @MertC07!"
          : "🤫 Hop hemşerim nereye kopyalıyorsun? Kaynak göster bari: @MertC07!"
      );
    } catch {
      // Clipboard unavailable (permissions / insecure context)
      triggerToast(
        isEnglish
          ? "😬 The browser blocked the clipboard — try Ctrl+C!"
          : "😬 Tarayıcı panoya izin vermedi — Ctrl+C dene!"
      );
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsOpen(false);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  return (
    <>
      {/* HILARIOUS COPY / ACTION TOAST BANNER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100000] flex items-center gap-3 rounded-full border-2 border-accent bg-surface-elevated/95 px-6 py-3 font-mono text-xs sm:text-sm font-extrabold text-foreground shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-4 ring-accent/20 max-w-[90vw] text-center"
          >
            <span className="inline-block size-2 shrink-0 rounded-full bg-accent animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM RIGHT-CLICK CONTEXT MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -5 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            className="fixed z-[99998] w-64 rounded-2xl border hairline bg-surface-elevated/95 p-2 font-mono text-xs shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl border-accent/30 text-foreground pointer-events-auto"
          >
            {/* Header branding */}
            <div className="px-3 py-2 border-b hairline flex items-center justify-between text-[0.6875rem] text-muted">
              <span className="font-bold text-accent">MERT CEREN OS v2.6</span>
              <span className="text-[0.625rem] text-muted/60">Shift+RightClick: Orijinal</span>
            </div>

            {/* Menu Items */}
            <div className="mt-1 space-y-0.5">
              <button
                type="button"
                onClick={() =>
                  triggerToast(
                    isEnglish
                      ? "🕵️‍♂️ Press F12 or Ctrl+Shift+I! Browser JS blocks opening DevTools via script (Code is 100% clean though!)"
                      : "🕵️‍♂️ F12 veya Ctrl+Shift+I yap kanka! Tarayıcı güvenlikten JS ile F12 açtırmıyor (Ama kodlar tertemiz, bakabilirsin!)"
                  )
                }
                className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🔍</span>
                  <span>{isEnglish ? "Inspect Code (F12)" : "Sayfayı İncele (F12)"}</span>
                </div>
                <span className="text-[0.625rem] text-muted group-hover:text-accent">F12</span>
              </button>

              <button
                type="button"
                onClick={handleCopySelection}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">📋</span>
                  <span>{isEnglish ? "Copy Something" : "Kod / Metin Aşır"}</span>
                </div>
                <span className="text-[0.625rem] text-muted group-hover:text-accent">Ctrl+C</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-accent/15 hover:text-accent transition-all text-left cursor-pointer"
              >
                <span className="text-sm">🤐</span>
                <span>{isEnglish ? "Toggle Cursor Speech" : "İmleç Balonunu Sustur/Aç"}</span>
              </button>

              <div className="my-1 border-t hairline" />

              <button
                type="button"
                onClick={handleScrollTop}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">📜</span>
                  <span>{isEnglish ? "Back to Top" : "En Başa Zıpla"}</span>
                </div>
                <span className="text-[0.625rem] text-muted group-hover:text-accent">Top</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
