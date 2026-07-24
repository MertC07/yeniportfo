"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

/**
 * Cinematic opening preloader: shown once per session.
 * High z-index (z-[99999]) covers the screen instantly to prevent layout flash.
 */
export function Preloader() {
  const { profile, ui } = useContent();
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("intro-seen") === "1") {
        setPhase("done");
        return;
      }
    } catch {
      // ignore
    }

    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exit"), 950);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // ignore
      }
      setPhase("done");
    }, 1650);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 bg-background transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] pointer-events-auto",
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <p className="font-display text-4xl font-extrabold lowercase tracking-tight sm:text-6xl text-foreground">
        {profile.wordmark}
        <span className="text-accent">.</span>
      </p>
      <div className="h-px w-44 overflow-hidden bg-foreground/10">
        <div className="h-full w-full origin-left animate-[loadbar_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-accent" />
      </div>
      <p className="microlabel text-muted">
        {profile.name} — {ui.preloader}
      </p>
    </div>
  );
}
