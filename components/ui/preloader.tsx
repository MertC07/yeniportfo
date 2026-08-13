"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/providers/locale-provider";

/** Hold plus slide — mirrors the .intro-overlay animation in globals.css. */
const INTRO_MS = 1650;

/**
 * Whether the intro has already run in this page session. Module scope, so it
 * survives the component remounting while the page stays put, and resets on a
 * real page load — which is exactly what "once per visit" means here.
 *
 * The overlay cannot be left to the stylesheet on a remount: switching
 * language re-renders the [lang] layout, and React rewrites <html> from its
 * JSX, dropping the data-intro-seen attribute that the CSS hides the overlay
 * off. Measured, that leaves the overlay on screen at display:flex for the
 * ~64ms until an effect can put the attribute back. Effects run after paint,
 * so no effect can close that gap — the component has to render nothing at
 * all, which this flag lets it decide during render.
 */
let introPlayed = false;

/** Records the intro for the stylesheet, the next page load, and remounts. */
function markIntroSeen() {
  introPlayed = true;
  document.documentElement.dataset.introSeen = "1";
  try {
    window.sessionStorage.setItem("intro-seen", "1");
  } catch {
    // Locked-down privacy modes throw; the flag still covers this page.
  }
}

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
  // Lazy, so a remount after the intro renders nothing rather than flashing it.
  // The first render of a page load always has this false, matching the server.
  const [done, setDone] = useState(() => introPlayed);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(window.sessionStorage.getItem("intro-seen"));
    } catch {
      // Storage can throw in locked-down privacy modes; play the intro.
    }
    // Already played: the stylesheet hides the overlay off the attribute, so
    // there is nothing here left to time or unlock.
    if (seen) {
      markIntroSeen();
      return;
    }

    // The overlay started its timeline at first paint rather than at mount, so
    // what is left of it is measured from page load. Hydration arriving after
    // the intro has already finished leaves nothing to wait for, and nothing
    // to lock — the visitor is reading the page by then.
    const remaining = Math.max(0, INTRO_MS - performance.now());
    const holdsScroll = remaining > 0;
    if (holdsScroll) document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      markIntroSeen();
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
