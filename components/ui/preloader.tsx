"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

/**
 * Cinematic opening: shown once per session, skipped during SSR
 * (via useSyncExternalStore, so hydration markup always matches).
 * Pure CSS animations — no completion callbacks to get stuck on.
 */
export function Preloader() {
  const shouldShow = useSyncExternalStore(
    subscribe,
    () => !window.sessionStorage.getItem("intro-seen"),
    () => false
  );
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    if (!shouldShow) return;
    document.body.style.overflow = "hidden";
    const exitTimer = setTimeout(() => setPhase("exit"), 950);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      window.sessionStorage.setItem("intro-seen", "1");
      setPhase("done");
    }, 1650);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  if (!shouldShow || phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-90 flex flex-col items-center justify-center gap-8 bg-background transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)]",
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <p className="font-display text-6xl font-extrabold tracking-tight">
        {profile.monogram}
        <span className="text-accent">.</span>
      </p>
      <div className="h-px w-44 overflow-hidden">
        <div className="h-full w-full origin-left animate-[loadbar_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-accent" />
      </div>
      <p className="microlabel">
        {profile.name} — Portfolio
      </p>
    </div>
  );
}
