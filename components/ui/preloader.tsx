"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

/**
 * Ultra-fast cinematic opening preloader (0.75s total duration).
 * Synchronized with page smooth fade-in and slide-up.
 */
export function Preloader() {
  const { profile, ui } = useContent();
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("intro-seen") === "1") {
        document.documentElement.classList.remove("is-loading");
        setPhase("done");
        return;
      }
    } catch {
      // ignore
    }

    document.body.style.overflow = "hidden";

    // At 350ms, curtain begins sliding up AND page starts smooth fade-in
    const exitTimer = setTimeout(() => {
      document.documentElement.classList.remove("is-loading");
      setPhase("exit");
    }, 350);

    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // ignore
      }
      setPhase("done");
    }, 750);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6 bg-background transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] pointer-events-auto",
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <p className="font-display text-4xl font-extrabold lowercase tracking-tight sm:text-6xl text-foreground">
        {profile.wordmark}
        <span className="text-accent">.</span>
      </p>
      <div className="h-px w-44 overflow-hidden bg-foreground/10">
        <div className="h-full w-full origin-left animate-[loadbar_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-accent" />
      </div>
      <p className="microlabel text-muted">
        {profile.name} — {ui.preloader}
      </p>
    </div>
  );
}
