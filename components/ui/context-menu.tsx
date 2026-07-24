"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

type Position = {
  x: number;
  y: number;
};

export function ContextMenu() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 1. Right Click Context Menu Listener with Capture Phase Priority
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Allow native browser menu if Shift key is held down
      if (e.shiftKey) return;

      e.preventDefault();
      e.stopPropagation();

      const x = Math.min(e.clientX, window.innerWidth - 270);
      const y = Math.min(e.clientY, window.innerHeight - 340);

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

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 2. Copy Event Listener (Hilarious Copy Toast)
  useEffect(() => {
    const handleCopy = () => {
      const msgsTR = [
        "Kaynak göster bari! 🤫 Kodları mı aşırıyorsun? 😄",
        "Kopyaladın ama bir yıldız at bari GitHub'dan! ⭐",
        "Aha kodlar kopyalandı! TEKNOFEST lisansı devrede 🚀",
        "Çalma la kodları! Mert'e bir kahve ısmarlarsın artık ☕",
      ];

      const msgsEN = [
        "At least cite the source! 🤫 Stealing code? 😄",
        "Copied! Don't forget to star on GitHub! ⭐",
        "Aha! Code copied under TEKNOFEST license 🚀",
        "Treat Mert to a coffee for that code! ☕",
      ];

      const list = isEnglish ? msgsEN : msgsTR;
      const msg = list[Math.floor(Math.random() * list.length)];

      setToastMessage(msg);
      setTimeout(() => {
        setToastMessage((prev) => (prev === msg ? null : prev));
      }, 3000);
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

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsOpen(false);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100000] flex items-center gap-3 rounded-full border-2 border-accent bg-surface-elevated/95 px-6 py-3 font-mono text-xs sm:text-sm font-extrabold text-foreground shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-4 ring-accent/20"
          >
            <span className="inline-block size-2 rounded-full bg-accent animate-pulse" />
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
            className="fixed z-[100001] w-64 rounded-2xl border hairline bg-surface-elevated/95 p-2 font-mono text-xs shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl border-accent/30 text-foreground"
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
                      ? "🐛 Inspecting code? Looking for bugs or stealing styles? 😄"
                      : "🐛 Kodlarda bug mu arıyorsun yoksa stilleri mi aşırıyorsun? 😄"
                  )
                }
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🐛</span>
                  <span>{isEnglish ? "Inspect Code (F12)" : "Sayfayı İncele (F12)"}</span>
                </div>
                <span className="text-[0.625rem] text-muted group-hover:text-accent">F12</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerToast(
                    isEnglish
                      ? "🤫 Copying? At least give credit: @MertC07!"
                      : "🤫 Kopyaladın bak! Kaynak göster bari: @MertC07!"
                  )
                }
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">📋</span>
                  <span>{isEnglish ? "Copy Something" : "Kod / Metin Aşır"}</span>
                </div>
                <span className="text-[0.625rem] text-muted group-hover:text-accent">Ctrl+C</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerToast(
                    isEnglish
                      ? "🎯 YOLOv11 Model: 3 Vehicles, 1 Engineer Detected! (Conf: 0.99)"
                      : "🎯 YOLOv11 Modeli: 3 Araç, 1 Mühendis Tespit Edildi! (%99 Güven)"
                  )
                }
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-accent/15 hover:text-accent transition-all text-left cursor-pointer"
              >
                <span className="text-sm">🤖</span>
                <span>{isEnglish ? "Run YOLOv11 AI Scanner" : "YOLOv11 AI Taraması Yap"}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-accent/15 hover:text-accent transition-all text-left cursor-pointer"
              >
                <span className="text-sm">🤐</span>
                <span>{isEnglish ? "Toggle Cursor Speech" : "İmleç Balonunu Sustur/Aç"}</span>
              </button>

              <div className="my-1 border-t hairline" />

              <button
                type="button"
                onClick={handleScrollTop}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 hover:bg-accent/15 hover:text-accent transition-all text-left group cursor-pointer"
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
