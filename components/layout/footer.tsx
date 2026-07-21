"use client";

import { useLenis } from "lenis/react";
import { socials } from "@/lib/data";
import { useContent } from "@/components/providers/locale-provider";
import { useLocalTime } from "@/lib/hooks/use-local-time";

export function Footer() {
  const lenis = useLenis();
  const { profile, ui } = useContent();
  const time = useLocalTime(profile.timezone);

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t hairline px-5 pt-10 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <p className="microlabel">
          © {new Date().getFullYear()} {profile.name} — {ui.footer.built}
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
          {ui.footer.backToTop}
        </button>
      </div>

      {/* Cropped wordmark */}
      <div aria-hidden className="mt-8 overflow-hidden">
        <p className="translate-y-[14%] select-none whitespace-nowrap bg-foreground/[0.06] bg-clip-text text-center font-display text-[15.5vw] font-extrabold uppercase leading-[0.8] tracking-tight text-transparent">
          {profile.name}
        </p>
      </div>
    </footer>
  );
}
