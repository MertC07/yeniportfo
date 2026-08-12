"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/providers/locale-provider";

/** Hold plus slide — mirrors the .intro-overlay animation in globals.css. */
const INTRO_MS = 1650;

/**
 * Cinematic opening, shown once per session. The markup is server-rendered so
 * the overlay is on screen at first paint, and it leaves on a CSS animation —
 * neither half depends on hydration. React only clears up afterwards: it drops
 * the finished overlay and records that the intro has played.
 *
 * A repeat visit is settled earlier still, by the inline script in the
 * document head that stamps html[data-intro-seen] before the body paints.
 */
export function Preloader() {
  const { profile, ui } = useContent();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(window.sessionStorage.getItem("intro-seen"));
    } catch {
      // Storage can throw in locked-down privacy modes; play the intro.
    }
    // A repeat visit is already hidden by the stylesheet, off the attribute the
    // head script stamps, so there is nothing here left to time or unlock.
    if (seen) return;

    // The overlay started its timeline at first paint rather than at mount, so
    // what is left of it is measured from page load. Hydration arriving after
    // the intro has already finished leaves nothing to wait for, and nothing
    // to lock — the visitor is reading the page by then.
    const remaining = Math.max(0, INTRO_MS - performance.now());
    const holdsScroll = remaining > 0;
    if (holdsScroll) document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      try {
        window.sessionStorage.setItem("intro-seen", "1");
      } catch {
        // Same as above — worst case the intro plays again next navigation.
      }
      setDone(true);
    }, remaining);

    return () => {
      clearTimeout(timer);
      if (holdsScroll) document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="intro-overlay fixed inset-0 z-90 flex flex-col items-center justify-center gap-8 bg-background"
    >
      <p className="font-display text-4xl font-extrabold lowercase tracking-tight sm:text-6xl">
        {profile.wordmark}
        <span className="text-accent">.</span>
      </p>
      <div className="h-px w-44 overflow-hidden">
        <div className="h-full w-full origin-left animate-[loadbar_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-accent" />
      </div>
      <p className="microlabel">
        {profile.name} — {ui.preloader}
      </p>
    </div>
  );
}
