"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Puts the new page at the top after a client-side navigation.
 *
 * Lenis does not read the window's scroll position, it owns it: every frame
 * it writes its own internal offset back onto the document. Nothing resets
 * that offset when the route changes, so opening a case study from halfway
 * down the project list left Lenis still holding the homepage's offset and
 * it painted the new page at that same distance down — the further down the
 * card you clicked, the further into the case study you landed. The router's
 * own scroll-to-top runs and is then overwritten on the next frame.
 *
 * Anchors are left alone. A hash means somewhere specific was asked for —
 * the "back to projects" link on a case study is `/#work` — so the target is
 * scrolled to instead, through Lenis, since a native jump would be undone
 * the same way. `immediate` because this is arrival, not a journey: pages
 * should open where they open, without animating there.
 */
function ScrollToTopOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        lenis.scrollTo(target as HTMLElement, { immediate: true, force: true });
        return;
      }
    }

    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }}>
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  );
}
