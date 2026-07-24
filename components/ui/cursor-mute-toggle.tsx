"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function CursorMuteToggle() {
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mert_cursor_muted");
      if (saved === "true") setIsMuted(true);
    } catch {
      // ignore
    }

    const handleStateChange = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (typeof customEvt.detail?.muted === "boolean") {
        setIsMuted(customEvt.detail.muted);
      }
    };

    window.addEventListener("mert-cursor-mute-changed", handleStateChange);
    return () => window.removeEventListener("mert-cursor-mute-changed", handleStateChange);
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("mert-toggle-cursor-mute"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMuted ? (isEnglish ? "Unmute Speech Bubbles" : "Konuşma Balonlarını Aç") : (isEnglish ? "Mute Speech Bubbles" : "Konuşma Balonlarını Sustur")}
      title={isMuted ? (isEnglish ? "Balonları Aç 🗣️" : "Balonları Aç 🗣️") : (isEnglish ? "Balonları Sustur 🤐" : "Balonları Sustur 🤐")}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer text-sm",
        isMuted
          ? "border-amber-500/60 bg-amber-500/15 text-amber-400 hover:border-amber-500"
          : "hairline bg-surface/40 text-foreground hover:border-foreground/40"
      )}
    >
      <span>{isMuted ? "🗣️" : "🤐"}</span>
    </button>
  );
}
