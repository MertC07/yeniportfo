"use client";

import { useLenis } from "lenis/react";
import { profile, socials } from "@/lib/data";
import { useLocalTime } from "@/lib/hooks/use-local-time";

export function Footer() {
  const lenis = useLenis();
  const time = useLocalTime(profile.timezone);

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t hairline px-5 pt-10 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <p className="microlabel">
          © {new Date().getFullYear()} {profile.name} — Built from scratch, no template
        </p>
        <p className="microlabel tabular-nums" suppressHydrationWarning>
          {profile.location}
          {time ? ` — ${time}` : ""}
        </p>
        <ul className="flex items-center gap-5">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="microlabel transition-colors duration-300 hover:text-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={backToTop}
          className="microlabel transition-colors duration-300 hover:text-accent"
        >
          Back to top ↑
        </button>
      </div>

      {/* Cropped wordmark */}
      <div aria-hidden className="mt-8 overflow-hidden">
        <p className="translate-y-[14%] select-none whitespace-nowrap text-center font-display text-[15.5vw] font-extrabold uppercase leading-[0.8] tracking-tight text-foreground/[0.06]">
          {profile.name}
        </p>
      </div>
    </footer>
  );
}
