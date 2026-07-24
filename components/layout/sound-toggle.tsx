"use client";

import { useSound } from "@/components/providers/sound-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function SoundToggle() {
  const { soundEnabled, toggleSound, playClick } = useSound();
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <button
      type="button"
      onClick={() => {
        toggleSound();
        playClick();
      }}
      className={cn(
        "microlabel relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-300 cursor-pointer",
        soundEnabled
          ? "border-accent/60 bg-accent/15 text-accent shadow-sm shadow-accent/20"
          : "hairline bg-surface/40 text-muted hover:border-foreground/40 hover:text-foreground"
      )}
      title={soundEnabled ? (isTr ? "Ses Efektleri: Açık" : "Sound FX: On") : (isTr ? "Ses Efektleri: Kapalı" : "Sound FX: Off")}
      aria-label="Ses Efektlerini Değiştir"
    >
      <span className="text-xs">
        {soundEnabled ? "🔊" : "🔇"}
      </span>
      <span className="hidden sm:inline font-mono text-[0.6875rem] uppercase tracking-wider">
        {soundEnabled ? (isTr ? "SES: AÇIK" : "SOUND: ON") : (isTr ? "SES: KAPALI" : "SOUND: OFF")}
      </span>
    </button>
  );
}
