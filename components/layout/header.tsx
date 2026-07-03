"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { navItems, profile } from "@/lib/data";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ScrambleText } from "@/components/ui/scramble-text";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock page scroll while the overlay menu is open
  useEffect(() => {
    if (lenis) {
      if (menuOpen) lenis.stop();
      else lenis.start();
    }
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    // On subpages the anchor target doesn't exist — go home with the hash
    if (!document.querySelector(href)) {
      window.location.assign(`/${href}`);
      return;
    }
    if (lenis) lenis.scrollTo(href, { duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      window.location.assign("/");
      return;
    }
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-100 bg-accent text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:px-5 focus:py-3 focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          scrolled && !menuOpen
            ? "hairline bg-background/75 backdrop-blur-md"
            : "border-transparent"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a
            href="#main"
            onClick={goTop}
            aria-label={`${profile.monogram}. ${profile.name} — back to top`}
            className="font-display text-lg font-extrabold tracking-tight"
          >
            {profile.monogram}
            <span className="text-accent">.</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="microlabel relative text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  <ScrambleText text={item.label} />
                </a>
              ))}
            </nav>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex size-10 items-center justify-center md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-300",
                  menuOpen ? "rotate-45" : "-translate-y-[3.5px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-300",
                  menuOpen ? "-rotate-45" : "translate-y-[3.5px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu — always mounted, gated by opacity + inert.
          Plain CSS transitions so open/close always settles, even in
          throttled/background tabs. */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-28 transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <span key={item.href} className="block overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => goTo(e, item.href)}
                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
                className={cn(
                  "flex items-baseline gap-4 py-2 font-display text-5xl font-extrabold uppercase tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "translate-y-0" : "translate-y-[110%]"
                )}
              >
                <span className="microlabel text-accent">0{i + 1}</span>
                {item.label}
              </a>
            </span>
          ))}
        </nav>
        <div
          style={{ transitionDelay: menuOpen ? "300ms" : "0ms" }}
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6 transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <a href={`mailto:${profile.email}`} className="microlabel">
            {profile.email}
          </a>
          <p className="microlabel">{profile.location}</p>
        </div>
      </div>
    </>
  );
}
