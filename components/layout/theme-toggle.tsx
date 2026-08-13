"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useContent } from "@/components/providers/locale-provider";

/**
 * Dark / light switch. The label is what made this the widest control in the
 * header, and a phone has no room for it: the bar overflowed its own padding
 * and the wordmark ended up touching the language toggle. Below sm it shrinks
 * to the dot alone, in the same 40px circle the neighbouring controls use —
 * the dot carries the state and aria-label carries the rest, so dropping the
 * word costs nothing.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const { ui } = useContent();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? ui.theme.switchToLight
            : ui.theme.switchToDark
          : ui.theme.toggle
      }
      // The label is what makes this the widest control in the bar, and there
      // is no room for it on a phone: the header overflowed its own padding
      // and the wordmark ended up touching the language toggle. Below sm it
      // shrinks to the dot alone, in the same 40px circle the other controls
      // use. The dot already carries the state, and aria-label carries the
      // rest, so nothing is lost by dropping the word.
      className="tap-target group flex size-10 items-center justify-center rounded-full border hairline transition-colors duration-300 hover:border-foreground/40 sm:h-auto sm:w-auto sm:gap-2 sm:px-3.5 sm:py-2"
    >
      <span
        aria-hidden
        className="size-3.5 rounded-full border border-current bg-current transition-all duration-300 dark:bg-transparent sm:size-2.5"
      />
      <span className="microlabel hidden text-foreground sm:inline">
        {mounted ? (isDark ? ui.theme.light : ui.theme.dark) : ui.theme.fallback}
      </span>
    </button>
  );
}
